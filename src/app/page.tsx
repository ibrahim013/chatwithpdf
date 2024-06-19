import { Avatar, Button, Dropdown } from 'antd';
import Image from 'next/image'
import type { MenuProps } from 'antd';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import FileUploadComponent from '@/components/fileupload';





const items: MenuProps['items'] = [
	{
		key: '1',
		label: (
			<LogoutLink >
				Logout
			</LogoutLink>
		),

	}]

export default async function Home() {

	const { getUser, isAuthenticated } = getKindeServerSession();
	const user = await getUser();

	return (
		<main className='w-screen min-h-screen bg-gradient-to-r from-teal-400 to-yellow-200'>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<div className='flex flex-col'>
					<div className='flex flex-col justify-center'>
						<div className='flex justify-center mb-3'>
							{await isAuthenticated() && <Dropdown menu={{ items }}>
								<Avatar size={70} src={`${user?.picture}`} />
							</Dropdown>}

						</div>
						<div className='flex justify-center mb-3'>
							<h1 className="text-5xl font-semibold">Chat with any PDF</h1>
						</div>

					</div>
					<div className='flex justify-center mb-3'>
						<p className='max-w-xl m-2 text-xl text-slate-600' >Understand documents with the help of Ai</p>
					</div>
					<div className='flex justify-center mb-3'>
						{await isAuthenticated() ? <Button type="primary">Go to Chats</Button> : <LoginLink><Button type="primary">Login to get Started</Button></LoginLink>}
					</div>
					<div className=""> {
						await isAuthenticated() && <FileUploadComponent />
					} </div>
				</div>
			</div>
		</main>

	)

}
