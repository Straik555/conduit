import React, { FC, useEffect } from 'react'
import { Button, Fields, Layout } from '../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TypeErrorAuth, UserTypeProps } from '../../api/auth/types'
import { validEmail } from '../../validation'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../navigation/Navigation.type'
import { useSignInMutation, useSignUpMutation } from '../../api/auth'
import { getError } from '../../utils/error'

const Auth: FC<{ isReg: boolean }> = ({ isReg }) => {
	const { control, handleSubmit } = useForm<UserTypeProps>({
		mode: 'onChange'
	})
	const navigate = useNavigate()
	const [
		register,
		{
			data: registerData,
			isError: registerIsError,
			error: registerError,
			isLoading: registerIsLoading
		}
	] = useSignUpMutation()
	const [
		login,
		{
			data: loginData,
			isError: loginIsError,
			error: loginError,
			isLoading: loginIsLoading
		}
	] = useSignInMutation()
	const err = (registerError || loginError) as TypeErrorAuth

	useEffect(() => {
		if (registerError || loginError) {
			getError(err)
		}
	}, [registerIsError, loginIsError])

	useEffect(() => {
		if (!!registerData || !!loginData) {
			navigate(ROUTES.HOME)
		}
	}, [registerData, loginData])

	const onSubmit: SubmitHandler<UserTypeProps> = data => {
		if (isReg) register(data)
		else login(data)
	}

	return (
		<Layout
			isHiddenBlock
			isLoadingAbsolut={registerIsLoading || loginIsLoading}
		>
			<div className='flex flex-col mx-auto mt-4 w-80'>
				<h2 className='text-4xl mb-2 text-center font-medium text-gray-600'>
					{isReg ? 'Sing up' : 'Sing in'}
				</h2>
				<Link
					to={isReg ? ROUTES.SIGN_IN : ROUTES.SIGN_UP}
					className='text-green text-base text-center font-medium mb-6'
				>
					{isReg ? 'Have an account?' : 'Need an account?'}
				</Link>
				{isReg && (
					<Fields<UserTypeProps>
						control={control}
						name='username'
						placeholder='Username'
						rules={{
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Username should be at least 3 characters'
							},
							maxLength: {
								value: 10,
								message: 'Username should be contain no more than 10 characters'
							}
						}}
						defaultValue=''
						autoCapitalize='none'
						autoComplete='off'
					/>
				)}
				<Fields<UserTypeProps>
					control={control}
					name='email'
					rules={{
						required: 'Email is required',
						pattern: {
							value: validEmail,
							message: 'Your Email is invalid!'
						}
					}}
					defaultValue=''
					autoCapitalize='none'
					autoComplete='off'
				/>
				<Fields<UserTypeProps>
					control={control}
					name='password'
					rules={{
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password should be at least 6 characters'
						}
					}}
					defaultValue=''
					autoComplete='off'
					autoCapitalize='none'
					type='password'
				/>
				<Button
					title={isReg ? 'Sign up' : 'Sign in'}
					onClick={handleSubmit(onSubmit)}
					className='ml-auto bg-green w-max py-2 px-4'
					classNameTitle='text-white text-xl'
				/>
			</div>
		</Layout>
	)
}

export default Auth
