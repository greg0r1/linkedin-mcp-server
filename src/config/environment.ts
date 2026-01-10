import { config } from "dotenv";
import { z } from "zod";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { resolve } from "path";
import { homedir } from "os";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the project root
const envPath = resolve(__dirname, "../../.env");
config({ path: envPath });

/**
 * Environment variables schema validation using Zod
 * Ensures all required configuration is present and valid
 */
const envSchema = z.object({
  LINKEDIN_CLIENT_ID: z.string().min(1, "LinkedIn Client ID is required"),
  LINKEDIN_CLIENT_SECRET: z
    .string()
    .min(1, "LinkedIn Client Secret is required"),
  LINKEDIN_REDIRECT_URI: z
    .string()
    .url("LinkedIn Redirect URI must be a valid URL"),
  LINKEDIN_COMPANY_ID: z.string().optional(),
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  TOKEN_STORAGE_PATH: z.string().default(join(homedir(), ".linkedin-mcp-tokens.json")),
});

type Environment = z.infer<typeof envSchema>;

/**
 * Validates and exports environment configuration
 * Follows Single Responsibility Principle - only handles configuration
 */
class EnvironmentConfig {
  private readonly config: Environment;

  constructor() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      console.error("❌ Invalid environment variables:");
      console.error(result.error.format());
      throw new Error("Environment validation failed");
    }

    this.config = result.data;
  }

  get linkedIn() {
    return {
      clientId: this.config.LINKEDIN_CLIENT_ID,
      clientSecret: this.config.LINKEDIN_CLIENT_SECRET,
      redirectUri: this.config.LINKEDIN_REDIRECT_URI,
      companyId: this.config.LINKEDIN_COMPANY_ID,
    };
  }

  get server() {
    return {
      port: parseInt(this.config.PORT, 10),
      environment: this.config.NODE_ENV,
    };
  }

  get storage() {
    return {
      tokenPath: this.config.TOKEN_STORAGE_PATH,
    };
  }
}

export const environment = new EnvironmentConfig();
