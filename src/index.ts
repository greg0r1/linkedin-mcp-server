#!/usr/bin/env node

/**
 * LinkedIn MCP Server
 * Entry point - Bootstraps the MCP server with dependency injection
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Infrastructure
import { FileTokenStorage } from "./infrastructure/storage/file-token-storage.js";
import { LinkedInOAuthService } from "./infrastructure/linkedin/oauth.service.js";
import { LinkedInApiClient } from "./infrastructure/linkedin/api-client.js";

// Application
import {
  GetProfileUseCase,
  CreatePostUseCase,
  GetMyPostsUseCase,
  DeletePostUseCase,
  GetCompanyPageUseCase,
  CreateCompanyPostUseCase,
  GetCompanyPostsUseCase,
} from "./application/use-cases/linkedin.use-cases.js";

// Presentation
import { LinkedInTools } from "./presentation/tools/linkedin.tools.js";

/**
 * Dependency Injection Container
 * Manually wires up all dependencies following SOLID principles
 */
class DependencyContainer {
  // Infrastructure Layer
  public readonly tokenStorage: FileTokenStorage;
  public readonly oauthService: LinkedInOAuthService;
  public readonly apiClient: LinkedInApiClient;

  // Application Layer
  public readonly getProfileUseCase: GetProfileUseCase;
  public readonly createPostUseCase: CreatePostUseCase;
  public readonly getMyPostsUseCase: GetMyPostsUseCase;
  public readonly deletePostUseCase: DeletePostUseCase;
  public readonly getCompanyPageUseCase: GetCompanyPageUseCase;
  public readonly createCompanyPostUseCase: CreateCompanyPostUseCase;
  public readonly getCompanyPostsUseCase: GetCompanyPostsUseCase;

  // Presentation Layer
  public readonly linkedInTools: LinkedInTools;

  constructor() {
    // Infrastructure
    this.tokenStorage = new FileTokenStorage();
    this.oauthService = new LinkedInOAuthService(this.tokenStorage);
    this.apiClient = new LinkedInApiClient(this.oauthService);

    // Application
    this.getProfileUseCase = new GetProfileUseCase(this.apiClient);
    this.createPostUseCase = new CreatePostUseCase(this.apiClient);
    this.getMyPostsUseCase = new GetMyPostsUseCase(this.apiClient);
    this.deletePostUseCase = new DeletePostUseCase(this.apiClient);
    this.getCompanyPageUseCase = new GetCompanyPageUseCase(this.apiClient);
    this.createCompanyPostUseCase = new CreateCompanyPostUseCase(
      this.apiClient
    );
    this.getCompanyPostsUseCase = new GetCompanyPostsUseCase(this.apiClient);

    // Presentation
    this.linkedInTools = new LinkedInTools(
      this.getProfileUseCase,
      this.createPostUseCase,
      this.getMyPostsUseCase,
      this.deletePostUseCase,
      this.getCompanyPageUseCase,
      this.createCompanyPostUseCase,
      this.getCompanyPostsUseCase
    );
  }
}

/**
 * Main MCP Server
 */
async function main() {
  //console.error('🚀 Starting LinkedIn MCP Server...');

  // Initialize dependencies
  const container = new DependencyContainer();

  // Note: Authentication will be handled on-demand when tools are called
  // This prevents the server from trying to start an OAuth server on startup

  // Create MCP server
  const server = new Server(
    {
      name: "linkedin-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register tool list handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: container.linkedInTools.getToolDefinitions(),
    };
  });

  // Register tool execution handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await container.linkedInTools.executeTool(
        request.params.name,
        request.params.arguments
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Start server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  //console.error('✅ LinkedIn MCP Server is running\n');
  console.error("Available tools:");
  container.linkedInTools.getToolDefinitions().forEach(() => {
    //console.error(`  - ${tool.name}: ${tool.description}`);
  });
  //console.error('');
}

// Run the server
main().catch(() => {
  //console.error('❌ Fatal error:', error);
  process.exit(1);
});
