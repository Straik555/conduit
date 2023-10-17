import React, { FC } from 'react'
import { Button, Layout } from '../../components'
import { useAppDispatch } from '../../hooks/useState'
import { logout } from '../../store/authSlice/authSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../navigation/Navigation.type'

const Settings: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate(ROUTES.HOME)
	}

	return (
		<Layout isHiddenBlock>
			<div className='flex flex-col mx-auto mt-4 w-80'>
				<h2 className='text-3xl text-gray-600 text-center mb-2'>
					Your Settings
				</h2>
				<Button
					title='Or click here to logout'
					className='w-max border-red-900 text-red-900 hover:bg-red-900'
					onClick={handleLogout}
				/>
			</div>
		</Layout>
	)
}

export default Settings
