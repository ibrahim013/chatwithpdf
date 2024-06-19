import { DrizzleChat } from '@/lib/db/schema'
import { cn } from '@/lib/utils';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'

type Props = {
    chats: DrizzleChat[];
    chatId: number
}

const ChatSideBar = ({ chats, chatId }: Props) => {
    return (
        <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
            <Link href='/'>
                <Button type="dashed" ghost className='w-full mt-4 flex items-center'>
                    <PlusOutlined className='mr-2 w-4 h-4' />
                    New Chat
                </Button>
            </Link>
            <div className="flex flex-col gap-2 mt-4">
                {chats.map(chat => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div className={cn('rounded-lg flex p-3 text-slate-300 items-center', { "bg-blue-600 text-white": chat.id === chatId, "hover:text-white": chat.id !== chatId })}>
                            <MessageOutlined style={{ marginRight: ".5rem" }} />
                            <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='absolute bottom-4 left-4'>
                <div className='flex items-center gap-2 text-sm text-slate-500 flext-wrap'>
                    <Link href="/">Home</Link>
                    <Link href="/">Source</Link>
                    {/* Payment Button  */}
                </div>
            </div>
        </div>
    )
}

export default ChatSideBar