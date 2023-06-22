import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';

// { ส่องกล้อง user }
// {ใช้ router.query สามารถเข้าถึงค่าของพารามิเตอร์หรือคิวรีสตริงที่ถูกส่งมาใน URL ได้ }
// เอา useridที่ได้ ไปใช้ hook useUser เพือเอา data มา
const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    // { ClipLoader if !fetchedUser || loading }
    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }
    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string} />
        </>
    );
}

export default UserView;
