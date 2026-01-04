/**
 * OAuth Token Entity
 * Represents authentication credentials
 */

export interface OAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  scope: string[];
}

export interface TokenStorage {
  save(token: OAuthToken): Promise<void>;
  load(): Promise<OAuthToken | null>;
  delete(): Promise<void>;
  isValid(): Promise<boolean>;
}
