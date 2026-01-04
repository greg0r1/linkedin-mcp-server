/**
 * Token Storage Implementation
 * Persists OAuth tokens to filesystem
 * Following Single Responsibility Principle
 */

import { promises as fs } from 'fs';
import { OAuthToken, TokenStorage } from '../../domain/entities/oauth-token.entity.js';
import { environment } from '../../config/environment.js';

export class FileTokenStorage implements TokenStorage {
  private readonly filePath: string;

  constructor(filePath: string = environment.storage.tokenPath) {
    this.filePath = filePath;
  }

  async save(token: OAuthToken): Promise<void> {
    try {
      const data = JSON.stringify(token, null, 2);
      await fs.writeFile(this.filePath, data, 'utf-8');
      console.log('✅ Token saved successfully');
    } catch (error) {
      console.error('❌ Failed to save token:', error);
      throw new Error('Token storage error');
    }
  }

  async load(): Promise<OAuthToken | null> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const token = JSON.parse(data) as OAuthToken;
      return token;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null; // File doesn't exist yet
      }
      console.error('❌ Failed to load token:', error);
      throw new Error('Token loading error');
    }
  }

  async delete(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
      console.log('✅ Token deleted successfully');
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return; // File doesn't exist, nothing to delete
      }
      console.error('❌ Failed to delete token:', error);
      throw new Error('Token deletion error');
    }
  }

  async isValid(): Promise<boolean> {
    const token = await this.load();
    if (!token) return false;

    const now = Date.now();
    const isExpired = now >= token.expiresAt;
    return !isExpired;
  }
}
