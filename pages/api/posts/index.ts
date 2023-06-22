import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // {Post comment หน้า profile ตัวเอง}
    // { Post && Get }
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end()
    }


    try {
        // {req.POST => currentUser / req.body => prisma.post.create => update post}
        // {res.json(post)}
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body;

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            });


            return res.status(200).json(post);
        }

        // {req.GET => req.userId => let posts}
        // {userId type === string => prisma.post.findmany => let posts}
        if (req.method === 'GET') {
            const { userId } = req.query;

            console.log({ userId })

            let posts;

            if (userId && typeof userId === 'string') {
                posts = await prisma.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                });
            } else {
                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}