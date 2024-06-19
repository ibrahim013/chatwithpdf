'use client'
import React, { useState } from 'react';
import { uploadToS3 } from '@/lib/s3';

import { InboxOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import type { UploadProps } from 'antd';
import { Spin, Upload, notification } from 'antd';

import axios from 'axios';
import { useRouter } from 'next/navigation';



const { Dragger } = Upload;



export default function FileUploadComponent() {
    const router = useRouter()
    const [uploading, setIsUploading] = useState(false);


    const { mutate, isPending } = useMutation({
        mutationFn: async ({ file_key, file_name }: { file_key: string, file_name: string }) => {
            const response = await axios.post('/api/create-chat', { file_key, file_name })
            return response.data
        }
    })

    const props: UploadProps = {
        name: 'file',
        accept: "application/pdf",
        maxCount: 1,

        async beforeUpload(file) {
            if (file.size > 10 * 1024 * 1024) {
                console.log("file is too large")
                return
            }
            try {
                setIsUploading(true);
                const data = await uploadToS3(file)

                if (!data?.file_key || !data.file_name) {
                    notification.error({
                        message: "Something went wrong"
                    })
                }
                mutate(data!, {
                    onSuccess: ( { chat_id } ) => {
                        notification.success({ message: "Sucessfull", placement: "topRight" })
                        router.push(`/chat/${chat_id}`)
                    },
                    onError: (err) => {
                        notification.error({
                            message: "Something went wrong",
                            placement: "topRight"
                        })
                        console.log(err, "mutation error")
                    }
                })
            } catch (error) {
                notification.error({
                    message: "Something went wrong",
                    placement: "topRight"
                })
            } finally {
                setIsUploading(false)
            }
            return false
        }
    }

    return (
        <Dragger  {...props}>
            {uploading || isPending ? <Spin tip="Spiling the coffee on AI..." size="large" /> : <><p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p> </>}
        </Dragger>
    )
}