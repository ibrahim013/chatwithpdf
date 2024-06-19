import { db } from "@/lib/db"
import { message } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const runtime = "edge"
export const POST = async (req: Request) => {
    const { chatId } = await req.json()
    const _message = await db.select().from(message).where(eq(message.chatId, chatId))
    return NextResponse.json(_message)
}