import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"


export async function uploadToS3(file: File) {
    try {

        const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!
        const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!

        const client = new S3Client({
            region: "us-west-1", credentials: {
                accessKeyId,
                secretAccessKey
            }
        })

        const FILE_KEY = 'uploads/' + Date.now().toString() + file.name.replace(' ', "-")

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: FILE_KEY,
            Body: file
        }

        const command = new PutObjectCommand(params)

        await client.send(command);

        return Promise.resolve({
            file_key: FILE_KEY,
            file_name: file.name
        })

    } catch (error) {

        console.error(error, "--upload error")
    }
}

export function getS3URL(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-west-1.amazonaws.com/${file_key}`
    return url
} 