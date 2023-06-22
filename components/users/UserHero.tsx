import React from 'react'

import useUser from '@/hooks/useUser';

import Avatar from '../Avatar';

import Image from 'next/image';
import Form from '../Form';


interface UserHeroProp {
    userId: string;
}

// {p#users}
// {หน้า user คนอื่นที่ไม่ใช่เรา}
const UserHero: React.FC<UserHeroProp> = ({ userId }) => {

    const { data: fetchedUser } = useUser(userId);

    return (
        <div>
            {/* // {header bg} */}
            <div className='bg-neutral-700 h-44 relative'>
                {/* {User show Image} */}
                {fetchedUser?.coverImage && (
                    <Image src={fetchedUser.coverImage}
                        fill
                        alt="Cover Image"
                        style={{ objectFit: 'cover' }}
                    />
                )}
                {/* {user.id => avatar(userid) =>profile img} */}
                <div className='absolute -bottom-16 left-4'>
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    )
}

export default UserHero
