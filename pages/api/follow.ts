import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end()
    }

    // { get req / currentUser => if !userId != string => throw }
    // { prisma.user => prisma.id === req.body.userId => !user throw }
    // { user.followingIds => req.POST => เพิ่มผู้ติดตามpush(userId)};
    try {
        // const { userId } = req.body;
        //#
        const { userId } = req.query;

        const { currentUser } = await serverAuth(req, res);



        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid ID');
        }

        // {let updateFollowingIds => 'POST,DELETE'}
        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);

            try {
                await prisma.notification.create({
                    data: {
                        body: 'Someone followed you!',
                        userId
                    },
                });

                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        hasNotification: true
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        // {DELETE followingIds}
        // {filter กรอง => followingIds !== userId}
        // {updateFollowingIds === userId จะถูกลบและใช้ผลลัพธ์ arrayใหม่}
        if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });



        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}

