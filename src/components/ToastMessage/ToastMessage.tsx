import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import s from './ToastMessage.module.css'

const ToastMessage: FC = () => {
	return (
		<ToastContainer
			className={s.toastWrapper}
			toastClassName='!p-[14px]'
			position='top-center'
			autoClose={2000}
			newestOnTop
			hideProgressBar
			icon={false}
			closeButton={false}
		/>
	)
}

export default ToastMessage
