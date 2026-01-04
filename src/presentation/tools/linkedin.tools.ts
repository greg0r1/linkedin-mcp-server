/**
 * MCP Tools - Presentation Layer
 * Exposes LinkedIn functionality as MCP tools for Claude
 */

import { z } from 'zod';
import {
  GetProfileUseCase,
  CreatePostUseCase,
  GetMyPostsUseCase,
  DeletePostUseCase,
  GetCompanyPageUseCase,
  CreateCompanyPostUseCase,
  GetCompanyPostsUseCase,
} from '../../application/use-cases/linkedin.use-cases.js';

/**
 * Tool Schemas - Input validation using Zod
 */
export const createPostSchema = z.object({
  text: z.string().min(1).max(3000),
  visibility: z.enum(['PUBLIC', 'CONNECTIONS', 'LOGGED_IN']).optional(),
});

export const getMyPostsSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(10),
});

export const deletePostSchema = z.object({
  postId: z.string().min(1),
});

export const getCompanyPageSchema = z.object({
  companyId: z.string().min(1),
});

export const createCompanyPostSchema = z.object({
  companyId: z.string().min(1),
  text: z.string().min(1).max(3000),
  visibility: z.enum(['PUBLIC', 'CONNECTIONS', 'LOGGED_IN']).optional(),
});

export const getCompanyPostsSchema = z.object({
  companyId: z.string().min(1),
  limit: z.number().min(1).max(100).optional().default(10),
});

/**
 * MCP Tool Definitions
 */
export class LinkedInTools {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getMyPostsUseCase: GetMyPostsUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getCompanyPageUseCase: GetCompanyPageUseCase,
    private readonly createCompanyPostUseCase: CreateCompanyPostUseCase,
    private readonly getCompanyPostsUseCase: GetCompanyPostsUseCase
  ) {}

  /**
   * Get all tool definitions for MCP server
   */
  getToolDefinitions() {
    return [
      {
        name: 'linkedin_get_profile',
        description: 'Get your LinkedIn profile information (name, email, etc.)',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'linkedin_create_post',
        description: 'Create and publish a post on your LinkedIn profile',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The text content of the post (max 3000 characters)',
            },
            visibility: {
              type: 'string',
              enum: ['PUBLIC', 'CONNECTIONS', 'LOGGED_IN'],
              description: 'Post visibility setting (default: PUBLIC)',
            },
          },
          required: ['text'],
        },
      },
      {
        name: 'linkedin_get_my_posts',
        description: 'Get your recent LinkedIn posts',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Number of posts to retrieve (1-100, default: 10)',
            },
          },
        },
      },
      {
        name: 'linkedin_delete_post',
        description: 'Delete one of your LinkedIn posts',
        inputSchema: {
          type: 'object',
          properties: {
            postId: {
              type: 'string',
              description: 'The ID of the post to delete',
            },
          },
          required: ['postId'],
        },
      },
      {
        name: 'linkedin_get_company_page',
        description: 'Get information about a LinkedIn company page (e.g., GD Dev Solutions)',
        inputSchema: {
          type: 'object',
          properties: {
            companyId: {
              type: 'string',
              description: 'The LinkedIn company ID',
            },
          },
          required: ['companyId'],
        },
      },
      {
        name: 'linkedin_create_company_post',
        description: 'Create and publish a post on behalf of a company page',
        inputSchema: {
          type: 'object',
          properties: {
            companyId: {
              type: 'string',
              description: 'The LinkedIn company ID',
            },
            text: {
              type: 'string',
              description: 'The text content of the post (max 3000 characters)',
            },
            visibility: {
              type: 'string',
              enum: ['PUBLIC', 'CONNECTIONS', 'LOGGED_IN'],
              description: 'Post visibility setting (default: PUBLIC)',
            },
          },
          required: ['companyId', 'text'],
        },
      },
      {
        name: 'linkedin_get_company_posts',
        description: 'Get recent posts from a company page',
        inputSchema: {
          type: 'object',
          properties: {
            companyId: {
              type: 'string',
              description: 'The LinkedIn company ID',
            },
            limit: {
              type: 'number',
              description: 'Number of posts to retrieve (1-100, default: 10)',
            },
          },
          required: ['companyId'],
        },
      },
    ];
  }

  /**
   * Execute a tool based on name and arguments
   */
  async executeTool(name: string, args: any): Promise<any> {
    switch (name) {
      case 'linkedin_get_profile':
        return await this.getProfileUseCase.execute();

      case 'linkedin_create_post': {
        const validated = createPostSchema.parse(args);
        return await this.createPostUseCase.execute(validated);
      }

      case 'linkedin_get_my_posts': {
        const validated = getMyPostsSchema.parse(args);
        return await this.getMyPostsUseCase.execute(validated.limit);
      }

      case 'linkedin_delete_post': {
        const validated = deletePostSchema.parse(args);
        await this.deletePostUseCase.execute(validated.postId);
        return { success: true, message: 'Post deleted successfully' };
      }

      case 'linkedin_get_company_page': {
        const validated = getCompanyPageSchema.parse(args);
        return await this.getCompanyPageUseCase.execute(validated.companyId);
      }

      case 'linkedin_create_company_post': {
        const validated = createCompanyPostSchema.parse(args);
        return await this.createCompanyPostUseCase.execute(validated);
      }

      case 'linkedin_get_company_posts': {
        const validated = getCompanyPostsSchema.parse(args);
        return await this.getCompanyPostsUseCase.execute(validated.companyId, validated.limit);
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}
