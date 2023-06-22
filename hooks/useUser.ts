import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// { ใช้ในการเรียกข้อมูลผู้ใช้เดียวตาม userId ที่ระบุ }
// {hook useUser =>get (userid : string) => SWR API => fetcher => prima  }
const useUser = (userId: string) => {
    const { data, error, isLoading, mutate }
        = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return {
        data, error, isLoading, mutate
    }
}
    ;
export default useUser;