import { PrismaClient } from '@prisma/client';

// {prismadbเข้าถึงฐานข้อมููล และสร้าง ฐานข้อมูลใหม่}
declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client