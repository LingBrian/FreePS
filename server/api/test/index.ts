import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    console.info(body)
    return body
})