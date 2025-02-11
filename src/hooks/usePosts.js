import { useQuery } from '@tanstack/react-query';
import { PostService } from '../services/api';

export const usePosts = () => {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await PostService.getAllPosts();
      return response.data;
    }
  });

  return {
    posts,
    loading: isLoading,
    error: error?.message,
    refetch
  };
};