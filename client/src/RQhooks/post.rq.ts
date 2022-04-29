import { postApi } from 'api/postApi';
import { AxiosError } from 'axios';
import { useAppContext } from 'context/useAppContext';
import { Post, PostsResponse } from 'interface';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { DataUpdateFunction, Updater } from 'react-query/types/core/utils';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
  cacheTime?: number;
  search?: string;
};

export const usePosts = (
  { search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const searchQuery = search ? `&search=${search}` : '';

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}${searchQuery}`;

  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    ...options,
    onError: handlerError,
  });
};

export const useMyPosts = ({ page = 1, limit = 1, sort = '-createdAt' }, options?: options) => {
  const queryClient = useQueryClient();
  const queryKey = `posts/me?page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    ...options,
    onError: handlerError,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(postApi.createPost, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('posts');
        },
      }),
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const {
    state: { user },
  } = useAppContext();
  const postsKey = queryClient.getQueryData<string>('postsKey');

  return useMutation(postApi.likePost, {
    onMutate: (postId) => {
      if (!postsKey || !user?.id) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, user.id);
      });
    },

    onSuccess: () => {},
    onError: (err: Error | AxiosError<any, any>, postId) => {
      if (!postsKey || !user?.id) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, user.id);
      });
      handlerError(err);
    },
  });
};

const updatePostLikes = (oldData: any, postId: string, userId: string) => {
  const newPosts = oldData?.posts.map((post: Post) => {
    if (post.id === postId) {
      if (post.likes?.includes(userId)) {
        const likes = post.likes.filter((id) => id !== userId);
        return { ...post, likes: likes };
      }
      return { ...post, likes: post.likes?.concat(userId) };
    }
    return post;
  });

  return { ...oldData, posts: newPosts };
};
