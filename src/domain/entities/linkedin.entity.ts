/**
 * Domain Entities - LinkedIn Data Models
 * Following Domain-Driven Design principles
 */

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  profilePictureUrl?: string;
  email?: string;
}

export interface LinkedInPost {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  visibility: 'PUBLIC' | 'CONNECTIONS' | 'LOGGED_IN';
}

export interface CompanyPage {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  websiteUrl?: string;
  logoUrl?: string;
  followerCount?: number;
}

export interface CompanyPost extends LinkedInPost {
  companyId: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: Date;
  expirationDate?: Date;
  applicationUrl: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP';
  experienceLevel?: 'ENTRY_LEVEL' | 'ASSOCIATE' | 'MID_SENIOR' | 'DIRECTOR' | 'EXECUTIVE';
}

export interface LinkedInMessage {
  id: string;
  conversationId: string;
  from: string;
  to: string;
  text: string;
  sentAt: Date;
  read: boolean;
}

export interface PostAnalytics {
  postId: string;
  impressions: number;
  clicks: number;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
}

export interface CreatePostDTO {
  text: string;
  visibility?: 'PUBLIC' | 'CONNECTIONS' | 'LOGGED_IN';
  mediaUrls?: string[];
}

export interface CreateCompanyPostDTO extends CreatePostDTO {
  companyId: string;
}

export interface SearchJobsDTO {
  keywords?: string;
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  limit?: number;
}

export interface SendMessageDTO {
  recipientId: string;
  text: string;
}
