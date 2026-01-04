/**
 * LinkedIn OAuth Service Implementation
 * Handles OAuth 2.0 authentication flow with LinkedIn
 */

import axios from 'axios';
import express from 'express';
import { IOAuthService } from '../../domain/interfaces/oauth.service.js';
import { OAuthToken } from '../../domain/entities/oauth-token.entity.js';
import { FileTokenStorage } from '../storage/file-token-storage.js';
import { environment } from '../../config/environment.js';

export class LinkedInOAuthService implements IOAuthService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly tokenStorage: FileTokenStorage;

  private static readonly AUTHORIZATION_URL = 'https://www.linkedin.com/oauth/v2/authorization';
  private static readonly TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
  private static readonly SCOPES = [
    'openid',
    'profile',
    'email',
    'w_member_social',
  ];

  constructor(tokenStorage: FileTokenStorage) {
    this.clientId = environment.linkedIn.clientId;
    this.clientSecret = environment.linkedIn.clientSecret;
    this.redirectUri = environment.linkedIn.redirectUri;
    this.tokenStorage = tokenStorage;
  }

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: LinkedInOAuthService.SCOPES.join(' '),
      state: this.generateState(),
    });

    return `${LinkedInOAuthService.AUTHORIZATION_URL}?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      const response = await axios.post(LinkedInOAuthService.TOKEN_URL, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token: OAuthToken = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: Date.now() + response.data.expires_in * 1000,
        scope: response.data.scope?.split(' ') || LinkedInOAuthService.SCOPES,
      };

      await this.tokenStorage.save(token);
      return token;
    } catch (error: any) {
      console.error('❌ Token exchange failed:', error.response?.data || error.message);
      throw new Error('Failed to exchange authorization code for token');
    }
  }

  async refreshToken(refreshToken: string): Promise<OAuthToken> {
    try {
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      const response = await axios.post(LinkedInOAuthService.TOKEN_URL, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token: OAuthToken = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token || refreshToken,
        expiresAt: Date.now() + response.data.expires_in * 1000,
        scope: response.data.scope?.split(' ') || LinkedInOAuthService.SCOPES,
      };

      await this.tokenStorage.save(token);
      return token;
    } catch (error: any) {
      console.error('❌ Token refresh failed:', error.response?.data || error.message);
      throw new Error('Failed to refresh access token');
    }
  }

  async getValidAccessToken(): Promise<string> {
    const token = await this.tokenStorage.load();

    if (!token) {
      throw new Error('No authentication token found. Please authenticate first.');
    }

    const isValid = await this.tokenStorage.isValid();

    if (!isValid && token.refreshToken) {
      console.log('🔄 Token expired, refreshing...');
      const newToken = await this.refreshToken(token.refreshToken);
      return newToken.accessToken;
    }

    if (!isValid && !token.refreshToken) {
      throw new Error('Token expired and no refresh token available. Please re-authenticate.');
    }

    return token.accessToken;
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.tokenStorage.isValid();
  }

  /**
   * Start OAuth flow with a local server
   * Opens browser for user to authenticate
   */
  async startAuthFlow(): Promise<OAuthToken> {
    return new Promise((resolve, reject) => {
      const app = express();
      const port = environment.server.port;

      app.get('/auth/callback', async (req, res) => {
        const { code, error } = req.query;

        if (error) {
          res.send(`<h1>Authentication failed: ${error}</h1>`);
          server.close();
          reject(new Error(`OAuth error: ${error}`));
          return;
        }

        if (!code || typeof code !== 'string') {
          res.send('<h1>No authorization code received</h1>');
          server.close();
          reject(new Error('No authorization code'));
          return;
        }

        try {
          const token = await this.exchangeCodeForToken(code);
          res.send('<h1>✅ Authentication successful! You can close this window.</h1>');
          server.close();
          resolve(token);
        } catch (err) {
          res.send(`<h1>❌ Authentication failed: ${err}</h1>`);
          server.close();
          reject(err);
        }
      });

      const server = app.listen(port, () => {
        const authUrl = this.getAuthorizationUrl();
        console.log(`\n🔐 OAuth Server started on port ${port}`);
        console.log(`\n📱 Please open this URL in your browser to authenticate:\n`);
        console.log(`${authUrl}\n`);
        console.log('Waiting for authentication...\n');
      });

      // Timeout after 5 minutes
      setTimeout(() => {
        server.close();
        reject(new Error('Authentication timeout'));
      }, 5 * 60 * 1000);
    });
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
