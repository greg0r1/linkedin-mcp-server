/**
 * Use Cases - Application Business Logic
 * Following Single Responsibility and Dependency Inversion principles
 */

import { ILinkedInRepository } from '../../domain/interfaces/linkedin.repository.js';
import {
  LinkedInProfile,
  LinkedInPost,
  CreatePostDTO,
  CompanyPage,
  CreateCompanyPostDTO,
  CompanyPost,
} from '../../domain/entities/linkedin.entity.js';

/**
 * Get User Profile Use Case
 */
export class GetProfileUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(): Promise<LinkedInProfile> {
    return await this.repository.getProfile();
  }
}

/**
 * Create Personal Post Use Case
 */
export class CreatePostUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(data: CreatePostDTO): Promise<LinkedInPost> {
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('Post text cannot be empty');
    }

    if (data.text.length > 3000) {
      throw new Error('Post text exceeds maximum length of 3000 characters');
    }

    return await this.repository.createPost(data);
  }
}

/**
 * Get My Posts Use Case
 */
export class GetMyPostsUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(limit: number = 10): Promise<LinkedInPost[]> {
    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    return await this.repository.getMyPosts(limit);
  }
}

/**
 * Delete Post Use Case
 */
export class DeletePostUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(postId: string): Promise<void> {
    if (!postId || postId.trim().length === 0) {
      throw new Error('Post ID is required');
    }

    return await this.repository.deletePost(postId);
  }
}

/**
 * Get Company Page Use Case
 */
export class GetCompanyPageUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(companyId: string): Promise<CompanyPage> {
    if (!companyId || companyId.trim().length === 0) {
      throw new Error('Company ID is required');
    }

    return await this.repository.getCompanyPage(companyId);
  }
}

/**
 * Create Company Post Use Case
 */
export class CreateCompanyPostUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(data: CreateCompanyPostDTO): Promise<CompanyPost> {
    if (!data.companyId || data.companyId.trim().length === 0) {
      throw new Error('Company ID is required');
    }

    if (!data.text || data.text.trim().length === 0) {
      throw new Error('Post text cannot be empty');
    }

    if (data.text.length > 3000) {
      throw new Error('Post text exceeds maximum length of 3000 characters');
    }

    return await this.repository.createCompanyPost(data);
  }
}

/**
 * Get Company Posts Use Case
 */
export class GetCompanyPostsUseCase {
  constructor(private readonly repository: ILinkedInRepository) {}

  async execute(companyId: string, limit: number = 10): Promise<CompanyPost[]> {
    if (!companyId || companyId.trim().length === 0) {
      throw new Error('Company ID is required');
    }

    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    return await this.repository.getCompanyPosts(companyId, limit);
  }
}
