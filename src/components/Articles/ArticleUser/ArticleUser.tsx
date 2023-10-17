import React, { FC } from 'react'
import dayjs from 'dayjs'
import { dateFormats } from '../../../constants/global'
import { ArticleUserTypeProps } from './ArticleUser.types'
import cn from 'clsx'

const ArticleUser: FC<ArticleUserTypeProps> = ({
	createdAt,
	onClick,
	author: { image, username },
	classNameTitle,
	classNameDate
}) => {
	return (
		<div className='flex items-center'>
			<img src={image} className='w-8 h-8 rounded-full cursor-pointer' />
			<div className='flex flex-col ml-1'>
				<p
					className={cn(
						'text-green text-base font-medium leading-none cursor-pointer hover:text-green-black hover:underline',
						classNameTitle
					)}
					onClick={onClick}
				>
					{username}
				</p>
				<p className={cn('text-xs text-gray-300', classNameDate)}>
					{dayjs(createdAt).format(dateFormats.display0)}
				</p>
			</div>
		</div>
	)
}

export default ArticleUser
