import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import Header from '@/components/Header'
import React from 'react'
import NotificationsFeed from '@/components/NotificationsFeed';

//  {เมื่อหน้าเว็บที่ใช้ getServerSideProps ฟังก์ชันนี้จะทำงานเพื่อตรวจสอบว่าผู้ใช้มีเซสชัน (session) 
// ที่ถูกต้องหรือไม่ โดยใช้ getSessionเพื่อดึงข้อมูลเซสชันของผู้ใช้จากคำขอ (context) 
// ที่ถูกส่งเข้ามา หากไม่มีเซสชันผู้ใช้ (ไม่ได้เข้าสู่ระบบ) 
// ฟังก์ชันจะส่งกลับการเปลี่ยนเส้นทาง (redirect)ไปยังหน้าหลัก ('/') 
// เพื่อให้ผู้ใช้ทำการเข้าสู่ระบบ แต่ถ้ามีเซสชันผู้ใช้ที่ถูกต้อง 
//  ฟังก์ชันจะส่งกลับออบเจกต์ที่ประกอบด้วยเซสชัน (session)
//  เพื่อใช้ในการส่งข้อมูลไปยังหน้าเว็บที่ต้องการใช้ข้อมูลผู้ใช้ในรูปแบบ Props.}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const notifications = () => {
    return (
        <>
            <Header label='Notifications' showBackArrow />
            <NotificationsFeed />
        </>
    )
}

export default notifications
