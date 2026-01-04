/**
 * OAuth Service Interface
 * Manages authentication flow and token lifecycle
 */

import { OAuthToken } from '../entities/oauth-token.entity.js';

export interface IOAuthService {
  /**
   * Get the authorization URL to redirect user for OAuth consent
   */
  getAuthorizationUrl(): string;

  /**
   * Exchange authorization code for access token
   */
  exchangeCodeForToken(code: string): Promise<OAuthToken>;

  /**
   * Refresh an expired access token
   */
  refreshToken(refreshToken: string): Promise<OAuthToken>;

  /**
   * Get current valid access token (refreshes if expired)
   */
  getValidAccessToken(): Promise<string>;

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Promise<boolean>;
}
