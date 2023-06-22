import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// {hook useCurrentUser => use swrเก็บข้อมูลจาก api/current ส่งไป lib fetcher}
const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;