import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";

const url =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const axiosInstance = axios.create({
  baseURL:url
})

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axiosInstance.post('/auth/signup', data);
    if (res.status === 201) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axiosInstance.post('/auth/login', data);
    if (res.status === 200) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  createPost: async (data: PostData) => {
    const res = await axiosInstance.post('/post', data);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axiosInstance.get(`/post/${query}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPosts: async (query: string) => {
    const res = await axiosInstance.get(`/post/${query}`);
    if (res.status === 200) {
      return res.data.posts;
    }
  },

  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axiosInstance.get('/user', {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await axiosInstance.get('/user/me');
    if (res.status === 200) {
      return res.data;
    }
  },
  
  getPostById: async (id: string) => {
    const res = await axiosInstance.get(`/post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await axiosInstance.post(
      `/reaction/${postId}`,
      { type: reaction }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (reactionId: string) => {
    const res = await axiosInstance.delete(`/reaction/${reactionId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await axiosInstance.post(
      `/follow/${userId}`,
      {}
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axiosInstance.delete(`/follow/${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axiosInstance.get('/user/search',{
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },
  getProfile: async (id: string) => {
    const res = await axiosInstance.get(`/user/profile/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axiosInstance.get(`/post/by_user/${id}`, {
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await axiosInstance.get(`/post/by_user/${id}`);
    
    if (res.status === 200) {
      return res.data;
    }
  },
  isLogged: async () => {
    const res = await axiosInstance.get('/user/me', {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axiosInstance.get(`/user/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axiosInstance.delete('/user/me');

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await axiosInstance.get('/chat');

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await axiosInstance.get('/follow/mutual');

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await axiosInstance.post(
      '/chat',
      {
        users: [id],
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await axiosInstance.get(`/chat/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await axiosInstance.delete(`/post/${id}`);
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axiosInstance.get(`/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string) => {
    const res = await axiosInstance.get(`/comment/by_post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
};

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  localStorage.removeItem('token')
  window.location.href = "/sign-in"; 
});

const useHttpRequestService = () => httpRequestService;


export { useHttpRequestService };
