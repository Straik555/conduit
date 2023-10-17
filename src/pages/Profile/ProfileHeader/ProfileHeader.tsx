import React, { FC } from 'react'
import { ProfileTypeResponse } from '../../../api/profile/types'
import { Button } from '../../../components'
import { ButtonIcon } from '../../../components/Button/Button.types'
import { useAuth } from '../../../hooks/useState'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../navigation/Navigation.type'

const ProfileHeader: FC<{ onFollow: () => void } & ProfileTypeResponse> = ({
	profile: { image, username, following },
	onFollow
}) => {
	const { token, username: user } = useAuth()
	const navigate = useNavigate()
	return (
		<div className='flex w-full p-6 mb-6 bg-gray-100'>
			<div className='flex flex-col justify-center items-center max-w-content w-full mx-auto'>
				<img src={image} className='w-[100px] h-[100px] rounded-full mb-4' />
				<h2 className='text-gray-700 font-semibold mb-2 text-lg'>{username}</h2>
				<div className='flex w-full justify-end items-end'>
					<Button
						title={
							!!token && username === user
								? 'Edit Profile Settings'
								: following
								? 'Follow Anah Benešová'
								: 'Unfollow Anah Benešová'
						}
						icon={
							!!token && !!token && username === user
								? ButtonIcon.EDIT
								: ButtonIcon.ADD
						}
						classNameTitle='!text-xs'
						className='!text-gray-700 bg-gray-100 stroke-gray-500 !border-gray-300 hover:!bg-gray-300'
						onClick={() => {
							if (!!token && !!token && username === user) {
								navigate(ROUTES.SETTINGS)
							} else if (!token) {
								navigate(ROUTES.SIGN_IN)
							} else {
								onFollow()
							}
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProfileHeader
