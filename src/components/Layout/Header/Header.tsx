import React, { FC } from 'react'
import { ROUTES } from '../../../navigation/Navigation.type'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useState'
import { routes } from '../../../navigation/routes'
import cn from 'clsx'
import { LayoutTypesProps } from '../Layout.types'

const Header: FC<Pick<LayoutTypesProps, 'isHiddenBlock'>> = ({
	isHiddenBlock
}) => {
	const { pathname } = useLocation()
	const { username } = useAuth()

	return (
		<>
			<div className='flex items-center h-max w-full max-w-content mx-auto justify-between px-10 py-2'>
				<Link to={ROUTES.HOME} className='text-green text-2xl '>
					conduit
				</Link>
				<div className='flex items-center justify-between'>
					{routes.map(route => (
						<Link
							to={
								route.path === ROUTES.PROFILE
									? generatePath(ROUTES.PROFILE, {
											username
									  })
									: route.path
							}
							key={route.path}
							className={cn(
								'flex items-center text-base text-gray-400 cursor-pointer hover:text-gray-600 mx-2',
								{
									'!hidden':
										(route.withoutUser && username) ||
										(route.isUser && !username) ||
										route.isHidden,
									'text-gray-600':
										route.path === pathname ||
										(route.path === ROUTES.PROFILE &&
											pathname.includes(username))
								}
							)}
						>
							{route.icon && <div className='mr-1'>{route.icon}</div>}
							{route.name === 'Profile' ? username : route.name}
						</Link>
					))}
				</div>
			</div>
			<div
				className={cn(
					'flex flex-col justify-center mb-6 h-max items-center p-8 w-full bg-green',
					{ '!hidden': isHiddenBlock }
				)}
			>
				<h2 className='text-white text-5xl pb-0.5'>conduit</h2>
				<p className='text-white text-2xl'>
					A place to share your Angular knowledge.
				</p>
			</div>
		</>
	)
}

export default Header
