import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { loadS3IntoPineconeDB } from '@/lib/pinecone'
import { getS3URL } from '@/lib/s3'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'


export async function POST(req: Request, res: Response) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id!
    if (!userId) {
        return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { file_name, file_key } = body
        const pages = await loadS3IntoPineconeDB(file_key)
        // insert into chat db
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3URL(file_key),
            userId
        }).returning({
            insertedId: chats.id
        })
        return NextResponse.json({
            success: "Successful", chat_id: chat_id[0].insertedId
        }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}
