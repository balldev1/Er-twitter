import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // { req.userId => prisma.notification(userId)}
    // { prisma.update => data.hasNotification}
    // { hasNotification เป็น false เพื่อระบุว่าผู้ใช้ไม่มีการแจ้งเตือนใหม่ }
    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        })

        return res.status(200).json(notifications);

    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}