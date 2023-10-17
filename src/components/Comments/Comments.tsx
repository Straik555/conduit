import React, { FC } from 'react'
import { CommentsType } from '~components/Comments/Comments.type'
import { Delete } from '~assets'
import dayjs from 'dayjs'
import { dateFormats } from '~/constants/global'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '~navigation/Navigation.type'

const Comments: FC<CommentsType> = ({
	username,
	createdAt,
	body,
	image,
	onDelete
}) => {
	const navigate = useNavigate()
	const handleUser = () =>
		navigate(
			generatePath(ROUTES.PROFILE, {
				username
			})
		)
	return (
		<div className='border border-solid border-gray-300 rounded mt-3'>
			<div className='px-3 py-4'>
				<p className='text-base text-black'>{body}</p>
			</div>
			<div className='flex justify-between items-center bg-gray-300 py-2 px-3'>
				<div className='flex items-center justify-start'>
					<img
						src={image}
						className='w-4 h-4 rounded-full cursor-pointer'
						onClick={handleUser}
					/>
					<p
						className='text-xs text-green-black mx-2 font-medium leading-none cursor-pointer hover:text-green-black hover:underline'
						onClick={handleUser}
					>
						{username}
					</p>
					<p className='text-xs text-gray-400'>
						{dayjs(createdAt).format(dateFormats.display0)}
					</p>
				</div>
				<Delete className='cursor-pointer' onClick={onDelete} />
			</div>
		</div>
	)
}

export default Comments
