// Content Interaction API Service
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

// Types for content interactions
export interface ContentInteraction {
  contentId: string;
  contentType: 'video' | 'audio' | 'ebook' | 'sermon' | 'live';
  userId: string;
  interactionType: 'like' | 'save' | 'share' | 'view' | 'comment';
  timestamp: string;
}

export interface ContentStats {
  contentId: string;
  likes: number;
  saves: number;
  shares: number;
  views: number;
  comments: number;
  userInteractions: {
    liked: boolean;
    saved: boolean;
    shared: boolean;
    viewed: boolean;
  };
}

export interface CommentData {
  id: string;
  contentId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  comment: string;
  timestamp: string;
  likes: number;
  replies?: CommentData[];
}

class ContentInteractionService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL || 'http://localhost:3000'; // Fallback for development
  }

  // Get authorization header with user token
  private async getAuthHeaders(): Promise<HeadersInit> {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('userToken');
      
      if (token) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
      }
      
      return {
        'Content-Type': 'application/json',
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      return {
        'Content-Type': 'application/json',
      };
    }
  }

  // Get current user ID
  private async getCurrentUserId(): Promise<string> {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user._id || user.id || user.email || 'anonymous';
      }
      return 'anonymous';
    } catch (error) {
      console.error('Error getting current user ID:', error);
      return 'anonymous';
    }
  }

  // ============= LIKE INTERACTIONS =============
  async toggleLike(contentId: string, contentType: string): Promise<{ liked: boolean; totalLikes: number }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/like`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        liked: data.liked,
        totalLikes: data.totalLikes,
      };
    } catch (error) {
      console.error('Error toggling like:', error);
      // Fallback to local storage if API fails
      return this.fallbackToggleLike(contentId);
    }
  }

  // ============= SAVE INTERACTIONS =============
  async toggleSave(contentId: string, contentType: string): Promise<{ saved: boolean; totalSaves: number }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/save`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        saved: data.saved,
        totalSaves: data.totalSaves,
      };
    } catch (error) {
      console.error('Error toggling save:', error);
      return this.fallbackToggleSave(contentId);
    }
  }

  // ============= SHARE INTERACTIONS =============
  async recordShare(contentId: string, contentType: string, shareMethod: string = 'generic'): Promise<{ totalShares: number }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/share`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentType, shareMethod }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        totalShares: data.totalShares,
      };
    } catch (error) {
      console.error('Error recording share:', error);
      return { totalShares: 0 };
    }
  }

  // ============= VIEW INTERACTIONS =============
  async recordView(contentId: string, contentType: string, duration?: number): Promise<{ totalViews: number }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/view`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentType, duration }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        totalViews: data.totalViews,
      };
    } catch (error) {
      console.error('Error recording view:', error);
      return { totalViews: 0 };
    }
  }

  // ============= COMMENT INTERACTIONS =============
  async addComment(contentId: string, comment: string, parentCommentId?: string): Promise<CommentData> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/comment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ comment, parentCommentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async getComments(contentId: string, page: number = 1, limit: number = 20): Promise<{ comments: CommentData[]; totalComments: number; hasMore: boolean }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(
        `${this.baseURL}/api/content/${contentId}/comments?page=${page}&limit=${limit}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting comments:', error);
      return { comments: [], totalComments: 0, hasMore: false };
    }
  }

  async toggleCommentLike(commentId: string): Promise<{ liked: boolean; totalLikes: number }> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/comments/${commentId}/like`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error toggling comment like:', error);
      return { liked: false, totalLikes: 0 };
    }
  }

  // ============= GET CONTENT STATS =============
  async getContentStats(contentId: string): Promise<ContentStats> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/${contentId}/stats`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting content stats:', error);
      return this.fallbackGetStats(contentId);
    }
  }

  // ============= BATCH OPERATIONS =============
  async getBatchContentStats(contentIds: string[]): Promise<Record<string, ContentStats>> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/content/batch-stats`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting batch content stats:', error);
      return {};
    }
  }

  // ============= USER'S SAVED CONTENT =============
  async getUserSavedContent(contentType?: string, page: number = 1, limit: number = 20): Promise<{
    content: any[];
    totalCount: number;
    hasMore: boolean;
  }> {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(contentType && { contentType }),
      });

      const response = await fetch(`${this.baseURL}/api/user/saved-content?${queryParams}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting user saved content:', error);
      return { content: [], totalCount: 0, hasMore: false };
    }
  }

  // ============= ANALYTICS =============
  async getUserInteractionHistory(
    page: number = 1,
    limit: number = 50,
    interactionType?: string
  ): Promise<{
    interactions: ContentInteraction[];
    totalCount: number;
    hasMore: boolean;
  }> {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(interactionType && { interactionType }),
      });

      const response = await fetch(`${this.baseURL}/api/user/interaction-history?${queryParams}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting interaction history:', error);
      return { interactions: [], totalCount: 0, hasMore: false };
    }
  }

  // ============= FALLBACK METHODS (LOCAL STORAGE) =============
  private async fallbackToggleLike(contentId: string): Promise<{ liked: boolean; totalLikes: number }> {
    try {
      const userId = await this.getCurrentUserId();
      const key = `userLikes_${userId}`;
      const likesStr = await AsyncStorage.getItem(key);
      const likes = likesStr ? JSON.parse(likesStr) : {};
      
      const isLiked = likes[contentId] || false;
      likes[contentId] = !isLiked;
      
      await AsyncStorage.setItem(key, JSON.stringify(likes));
      
      return {
        liked: !isLiked,
        totalLikes: Object.values(likes).filter(Boolean).length,
      };
    } catch (error) {
      console.error('Fallback like toggle failed:', error);
      return { liked: false, totalLikes: 0 };
    }
  }

  private async fallbackToggleSave(contentId: string): Promise<{ saved: boolean; totalSaves: number }> {
    try {
      const userId = await this.getCurrentUserId();
      const key = `userSaves_${userId}`;
      const savesStr = await AsyncStorage.getItem(key);
      const saves = savesStr ? JSON.parse(savesStr) : {};
      
      const isSaved = saves[contentId] || false;
      saves[contentId] = !isSaved;
      
      await AsyncStorage.setItem(key, JSON.stringify(saves));
      
      return {
        saved: !isSaved,
        totalSaves: Object.values(saves).filter(Boolean).length,
      };
    } catch (error) {
      console.error('Fallback save toggle failed:', error);
      return { saved: false, totalSaves: 0 };
    }
  }

  private async fallbackGetStats(contentId: string): Promise<ContentStats> {
    try {
      const userId = await this.getCurrentUserId();
      const likesStr = await AsyncStorage.getItem(`userLikes_${userId}`);
      const savesStr = await AsyncStorage.getItem(`userSaves_${userId}`);
      
      const likes = likesStr ? JSON.parse(likesStr) : {};
      const saves = savesStr ? JSON.parse(savesStr) : {};
      
      return {
        contentId,
        likes: 0,
        saves: 0,
        shares: 0,
        views: 0,
        comments: 0,
        userInteractions: {
          liked: likes[contentId] || false,
          saved: saves[contentId] || false,
          shared: false,
          viewed: false,
        },
      };
    } catch (error) {
      console.error('Fallback get stats failed:', error);
      return {
        contentId,
        likes: 0,
        saves: 0,
        shares: 0,
        views: 0,
        comments: 0,
        userInteractions: {
          liked: false,
          saved: false,
          shared: false,
          viewed: false,
        },
      };
    }
  }
}

// Export singleton instance
export const contentInteractionAPI = new ContentInteractionService();
export default contentInteractionAPI;