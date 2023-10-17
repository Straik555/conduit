import cn from 'clsx'
import React, { FC } from 'react'
import { NothingToSHowType } from './NothingToSHow.type'

const NothingToShow: FC<NothingToSHowType> = ({ title, className }) => {
	return (
		<div className={cn('flex justify-center items-center w-full')}>
			<p className='text-base text-gray-700'>{title}</p>
		</div>
	)
}

export default NothingToShow
