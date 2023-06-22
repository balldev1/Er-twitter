import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// { ใช้ในการเรียกข้อมูลผู้ใช้ทั้งหมดที่อยู่ใน api users }
// {hook useUser =>get (userid : string) => SWR API => fetcher => prima  }
const useUsers = () => {

    const { data, error, isLoading, mutate }
        = useSWR('/api/users', fetcher);

    return {
        data, error, isLoading, mutate
    }
}
    ;
export default useUsers;