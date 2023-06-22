import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// { ใช้ในการเรียกดู Posts userId ที่ระบุ }
// {hook useUser =>get (userid : string) => SWR API => fetcher => prima  }
// {get UserId ? true api.post.userId / false '/api/posts}
const usePost = (postId: string) => {
    const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePost;