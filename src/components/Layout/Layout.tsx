import React, { FC, useEffect } from 'react'
import cn from 'clsx'
import Header from './Header'
import { LayoutTypesProps } from './Layout.types'
import Loader from '../Loader'
import { useScrollTop } from '../../hooks/useScrollTop'

const Layout: FC<LayoutTypesProps> = ({
	children,
	pagination,
	isLoadingAbsolut,
	isHiddenBlock
}) => {
	const { ref, scrollCallback } = useScrollTop()

	useEffect(() => {
		scrollCallback()
	}, [children])

	return (
		<div className='flex flex-col w-screen h-screen overflow-hidden'>
			<Header isHiddenBlock={isHiddenBlock} />
			<div className='flex w-full h-max overflow-hidden mx-auto'>
				<div
					className={cn('flex flex-col mx-auto w-full h-full pb-2', {
						'justify-between': pagination
					})}
				>
					<div
						ref={ref}
						className={cn(
							'flex flex-col w-full overflow-x-hidden overflow-y-auto h-full',
							{
								'mb-2': !!pagination
							}
						)}
					>
						{children}
					</div>
					{pagination}
				</div>
			</div>
			{isLoadingAbsolut && <Loader isAbsolute />}
		</div>
	)
}

export default Layout
