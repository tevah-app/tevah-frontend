import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export interface AllMediaItem {
  _id: string;
  title: string;
  description?: string;
  contentType: 'videos' | 'music' | 'books' | 'live';
  category?: string;
  topics?: string[];
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  duration?: number;
  viewCount?: number;
  listenCount?: number;
  readCount?: number;
  downloadCount?: number;
  favoriteCount?: number;
  shareCount?: number;
  commentCount?: number;
}

export interface AllMediaResponse {
  success: boolean;
  media: AllMediaItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class AllMediaAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    try {
      let token = await AsyncStorage.getItem('userToken');
      if (!token) {
        token = await AsyncStorage.getItem('token');
      }
      if (!token) {
        try {
          const { default: SecureStore } = await import('expo-secure-store');
          token = await SecureStore.getItemAsync('jwt');
        } catch (secureStoreError) {
          console.log('SecureStore not available or no JWT token');
        }
      }
      
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

     async getAllMedia(params: {
     sort?: 'views' | 'comments' | 'likes' | 'reads' | 'createdAt' | 'updatedAt';
     contentType?: 'videos' | 'music' | 'books' | 'live';
     category?: string;
     page?: number;
     limit?: number;
     search?: string;
   } = {}): Promise<AllMediaResponse> {
    try {
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams();
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.contentType) queryParams.append('contentType', params.contentType);
      if (params.category) queryParams.append('category', params.category);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);

      const url = `${this.baseURL}/api/media?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all media:', error);
      throw error;
    }
  }

  async getTrendingMedia(limit: number = 20): Promise<AllMediaResponse> {
    return this.getAllMedia({
      sort: 'views',
      limit,
    });
  }

  async getMostCommentedMedia(limit: number = 20): Promise<AllMediaResponse> {
    return this.getAllMedia({
      sort: 'comments',
      limit,
    });
  }

  async getMostLikedMedia(limit: number = 20): Promise<AllMediaResponse> {
    return this.getAllMedia({
      sort: 'likes',
      limit,
    });
  }

  async getLatestMedia(limit: number = 20): Promise<AllMediaResponse> {
    return this.getAllMedia({
      sort: 'createdAt',
      limit,
    });
  }

  async searchAllMedia(searchTerm: string, limit: number = 20): Promise<AllMediaResponse> {
    return this.getAllMedia({
      search: searchTerm,
      limit,
    });
  }
}

export default new AllMediaAPI();
