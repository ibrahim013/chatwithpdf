import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import fs from 'fs'

export async function downloadFromS3(file_key: string) {
    try {
        const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!
        const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!

        const client = new S3Client({
            region: "us-west-1", credentials: {
                accessKeyId,
                secretAccessKey
            }
        }) 
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
        }
        const command = new GetObjectCommand(params)
        const object = await client.send(command)
        const file_name = `/tmp/pdf-${Date.now()}.pdf`

        const doc = await object.Body?.transformToByteArray()

        fs.writeFileSync(file_name, doc as Buffer)

        return file_name

    }catch(error) {
        console.log(error)
        return null
    }
}