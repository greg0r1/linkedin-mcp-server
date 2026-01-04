/**
 * Repository Interfaces - Dependency Inversion Principle
 * Define contracts that infrastructure layer must implement
 */

import {
  LinkedInProfile,
  LinkedInPost,
  CompanyPage,
  CompanyPost,
  JobPosting,
  LinkedInMessage,
  PostAnalytics,
  CreatePostDTO,
  CreateCompanyPostDTO,
  SearchJobsDTO,
  SendMessageDTO,
} from '../entities/linkedin.entity.js';

/**
 * LinkedIn API Repository Interface
 * Following Interface Segregation Principle - split by domain concern
 */
export interface ILinkedInProfileRepository {
  getProfile(): Promise<LinkedInProfile>;
}

export interface ILinkedInPostRepository {
  createPost(data: CreatePostDTO): Promise<LinkedInPost>;
  getMyPosts(limit?: number): Promise<LinkedInPost[]>;
  getPostById(postId: string): Promise<LinkedInPost>;
  deletePost(postId: string): Promise<void>;
}

export interface ILinkedInCompanyRepository {
  getCompanyPage(companyId: string): Promise<CompanyPage>;
  createCompanyPost(data: CreateCompanyPostDTO): Promise<CompanyPost>;
  getCompanyPosts(companyId: string, limit?: number): Promise<CompanyPost[]>;
  getCompanyAnalytics(companyId: string): Promise<PostAnalytics[]>;
}

export interface ILinkedInJobRepository {
  searchJobs(criteria: SearchJobsDTO): Promise<JobPosting[]>;
  getJobById(jobId: string): Promise<JobPosting>;
}

export interface ILinkedInMessageRepository {
  getConversations(limit?: number): Promise<LinkedInMessage[]>;
  sendMessage(data: SendMessageDTO): Promise<LinkedInMessage>;
  getConversationMessages(conversationId: string): Promise<LinkedInMessage[]>;
}

/**
 * Aggregate repository - combines all LinkedIn operations
 * Clients can depend only on what they need (ISP)
 */
export interface ILinkedInRepository
  extends ILinkedInProfileRepository,
    ILinkedInPostRepository,
    ILinkedInCompanyRepository,
    ILinkedInJobRepository,
    ILinkedInMessageRepository {}
