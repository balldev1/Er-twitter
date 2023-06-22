import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// { ใช้ในการเรียกดู Posts userId ที่ระบุ }
// {hook useUser =>get (userid : string) => SWR API => fetcher => prima  }
// {get UserId ? true api.post.userId / false '/api/posts}
const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePosts;