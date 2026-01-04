#!/usr/bin/env node

import { LinkedInOAuthService } from "./infrastructure/linkedin/oauth.service.js";
import { FileTokenStorage } from "./infrastructure/storage/file-token-storage.js";

async function main() {
  const tokenStorage = new FileTokenStorage();
  const oauthService = new LinkedInOAuthService(tokenStorage);

  console.log("🔐 Starting OAuth authentication flow...\n");

  try {
    await oauthService.startAuthFlow();
    console.log("\n✅ Authentication successful!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Authentication failed:", error);
    process.exit(1);
  }
}

main();
