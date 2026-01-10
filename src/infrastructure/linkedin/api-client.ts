/**
 * LinkedIn API Client Implementation
 * Implements repository interfaces with actual LinkedIn REST API calls
 */

import axios, { AxiosInstance } from 'axios';
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
} from '../../domain/entities/linkedin.entity.js';
import { ILinkedInRepository } from '../../domain/interfaces/linkedin.repository.js';
import { IOAuthService } from '../../domain/interfaces/oauth.service.js';

export class LinkedInApiClient implements ILinkedInRepository {
  private readonly apiClient: AxiosInstance;
  private readonly oauthService: IOAuthService;

  private static readonly BASE_URL = 'https://api.linkedin.com/v2';

  constructor(oauthService: IOAuthService) {
    this.oauthService = oauthService;
    this.apiClient = axios.create({
      baseURL: LinkedInApiClient.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });

    // Add interceptor to inject access token
    this.apiClient.interceptors.request.use(async (config) => {
      const token = await this.oauthService.getValidAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  // ==================== Profile ====================

  async getProfile(): Promise<LinkedInProfile> {
    try {
      const response = await this.apiClient.get('/userinfo');
      
      return {
        id: response.data.sub,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        email: response.data.email,
        profilePictureUrl: response.data.picture,
      };
    } catch (error: any) {
      console.error('❌ Failed to get profile:', error.response?.data || error.message);
      throw new Error('Failed to retrieve LinkedIn profile');
    }
  }

  // ==================== Posts ====================

  async createPost(data: CreatePostDTO): Promise<LinkedInPost> {
    try {
      const profile = await this.getProfile();
      const authorUrn = `urn:li:person:${profile.id}`;

      const postData = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: data.text,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': data.visibility || 'PUBLIC',
        },
      };

      const response = await this.apiClient.post('/ugcPosts', postData);

      return {
        id: response.data.id,
        author: authorUrn,
        text: data.text,
        createdAt: new Date(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        visibility: data.visibility || 'PUBLIC',
      };
    } catch (error: any) {
      console.error('❌ Failed to create post:', error.response?.data || error.message);
      throw new Error('Failed to create LinkedIn post');
    }
  }

  async getMyPosts(limit: number = 10): Promise<LinkedInPost[]> {
    try {
      const profile = await this.getProfile();
      const authorUrn = `urn:li:person:${profile.id}`;

      const response = await this.apiClient.get('/ugcPosts', {
        params: {
          q: 'authors',
          authors: `List(${authorUrn})`,
          count: limit,
        },
      });

      return response.data.elements?.map((post: any) => this.mapToLinkedInPost(post)) || [];
    } catch (error: any) {
      console.error('❌ Failed to get posts:', error.response?.data || error.message);
      console.error('⚠️ Note: LinkedIn API has rate limits and may restrict access to posts. Consider using a lower limit or checking your API permissions.');
      throw new Error('Failed to retrieve LinkedIn posts');
    }
  }

  async getPostById(postId: string): Promise<LinkedInPost> {
    try {
      const response = await this.apiClient.get(`/ugcPosts/${encodeURIComponent(postId)}`);
      return this.mapToLinkedInPost(response.data);
    } catch (error: any) {
      console.error('❌ Failed to get post:', error.response?.data || error.message);
      throw new Error('Failed to retrieve LinkedIn post');
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await this.apiClient.delete(`/ugcPosts/${encodeURIComponent(postId)}`);
    } catch (error: any) {
      console.error('❌ Failed to delete post:', error.response?.data || error.message);
      throw new Error('Failed to delete LinkedIn post');
    }
  }

  // ==================== Company ====================

  async getCompanyPage(companyId: string): Promise<CompanyPage> {
    try {
      const response = await this.apiClient.get(`/organizations/${companyId}`);

      return {
        id: response.data.id,
        name: response.data.localizedName,
        description: response.data.localizedDescription,
        websiteUrl: response.data.websiteUrl,
        industry: response.data.industries?.[0],
        logoUrl: response.data.logoV2?.original,
      };
    } catch (error: any) {
      console.error('❌ Failed to get company page:', error.response?.data || error.message);
      throw new Error('Failed to retrieve company page');
    }
  }

  async createCompanyPost(data: CreateCompanyPostDTO): Promise<CompanyPost> {
    try {
      const authorUrn = `urn:li:organization:${data.companyId}`;

      const postData = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: data.text,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': data.visibility || 'PUBLIC',
        },
      };

      const response = await this.apiClient.post('/ugcPosts', postData);

      return {
        id: response.data.id,
        author: authorUrn,
        companyId: data.companyId,
        text: data.text,
        createdAt: new Date(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        visibility: data.visibility || 'PUBLIC',
      };
    } catch (error: any) {
      console.error('❌ Failed to create company post:', error.response?.data || error.message);
      throw new Error('Failed to create company post');
    }
  }

  async getCompanyPosts(companyId: string, limit: number = 10): Promise<CompanyPost[]> {
    try {
      const authorUrn = `urn:li:organization:${companyId}`;

      const response = await this.apiClient.get('/ugcPosts', {
        params: {
          q: 'authors',
          authors: `List(${authorUrn})`,
          count: limit,
        },
      });

      return (
        response.data.elements?.map((post: any) => ({
          ...this.mapToLinkedInPost(post),
          companyId,
        })) || []
      );
    } catch (error: any) {
      console.error('❌ Failed to get company posts:', error.response?.data || error.message);
      console.error('⚠️ Note: LinkedIn API has rate limits and may restrict access to company posts. You may need additional permissions or Marketing Developer Platform access.');
      throw new Error('Failed to retrieve company posts');
    }
  }

  async getCompanyAnalytics(_companyId: string): Promise<PostAnalytics[]> {
    // Note: Analytics API requires special permissions
    // This is a placeholder implementation
    console.error('⚠️ Analytics API requires Marketing Developer Platform access');
    return [];
  }

  // ==================== Jobs ====================

  async searchJobs(_criteria: SearchJobsDTO): Promise<JobPosting[]> {
    // Note: Job search requires special API access
    // This is a placeholder - LinkedIn deprecated public job search API
    console.error('⚠️ Job search API requires special partner access');
    return [];
  }

  async getJobById(_jobId: string): Promise<JobPosting> {
    throw new Error('Job API requires special partner access');
  }

  // ==================== Messages ====================

  async getConversations(_limit: number = 10): Promise<LinkedInMessage[]> {
    // Note: Messaging API requires additional permissions
    console.error('⚠️ Messaging API requires additional permissions');
    return [];
  }

  async sendMessage(_data: SendMessageDTO): Promise<LinkedInMessage> {
    throw new Error('Messaging API requires additional permissions');
  }

  async getConversationMessages(_conversationId: string): Promise<LinkedInMessage[]> {
    console.error('⚠️ Messaging API requires additional permissions');
    return [];
  }

  // ==================== Helpers ====================

  private mapToLinkedInPost(apiPost: any): LinkedInPost {
    const text =
      apiPost.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '';
    const visibility = apiPost.visibility?.['com.linkedin.ugc.MemberNetworkVisibility'] || 'PUBLIC';

    return {
      id: apiPost.id,
      author: apiPost.author,
      text,
      createdAt: new Date(apiPost.created?.time || Date.now()),
      likeCount: apiPost.statistics?.numLikes || 0,
      commentCount: apiPost.statistics?.numComments || 0,
      shareCount: apiPost.statistics?.numShares || 0,
      visibility,
    };
  }
}
