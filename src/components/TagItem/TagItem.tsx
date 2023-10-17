import React, { FC } from 'react'
import { TagItemProps } from './TagItem.types'
import cn from 'clsx'

const TagItem: FC<TagItemProps> = ({ title, className }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center border-[1px] border-gray-300 text-xs text-gray-300 rounded-xl mx-1 p-1',
				className
			)}
		>
			{title}
		</div>
	)
}

export default TagItem
