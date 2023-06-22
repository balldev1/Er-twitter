import React from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarItemTweetButton from './SidebarItemTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

// { ด้านข้าง }
const Sidebar = () => {

    // {data user => hook => useCurrentUser}
    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true,
            alert: currentUser?.hasNotification,
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        }
    ]

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                            alert={item.alert}
                        />
                    ))}

                    {/* {show เมือ === currentUser} */}
                    {currentUser && (
                        <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout' />
                    )}
                    <SidebarItemTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
