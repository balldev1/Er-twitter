import React, { useCallback } from 'react'

import { useRouter } from 'next/router'

import { FaFeather } from 'react-icons/fa'
import useLoginModal from '@/hooks/useLoginModal';


const SidebarItemTweetButton = () => {

    const router = useRouter();
    const loginModal = useLoginModal();

    // {loginModal}
    const onClick = useCallback(() => {
        loginModal.onOpen();
    }, [])

    return (
        <div onClick={onClick}>
            {/* {md} */}
            <div className='mt-6 lg:hidden rounded-full h-14
            w-14 p-4 flex items-center justify-center
            bg-sky-500 hover-opacity-80 transition cursor-pointer'>
                <FaFeather size={24} color='white' />
            </div>

            {/* {lg} */}
            <div className='mt-6 hidden lg:block px-4 py-2 rounded-full
            bg-sky-500 hover:bg-opacity-90 cursor-pointer transition '>
                <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
                    Tweet
                </p>
            </div>
        </div>
    )
}

export default SidebarItemTweetButton
