import { toast } from 'react-toastify'
import { TypeErrorAuth } from '../api/auth/types'

export const getError = (err: TypeErrorAuth) => {
	if (err?.data?.errors) {
		// 2  більше ошибок скорочено
		Object.keys(err.data.errors).forEach(key => {
			const message = String(err?.data?.errors[key as keyof object][0])
			toast.error(message[0].toUpperCase() + message.slice(1))
		})
		// }
		// if (
		// 	err?.data?.errors?.username[0].length ||
		// 	err?.data?.errors?.email[0].length ||
		// 	err?.data?.errors?.password[0].length
		// ) {
		// 	const errorData =
		// 		err?.data?.errors?.username[0] ||
		// 		err?.data?.errors?.email[0] ||
		// 		err?.data?.errors?.password[0]
		// 	toast.error(errorData[0].toUpperCase() + errorData.slice(1))
		//	якщо 1 ошибка тоді
		// 	const message = Object.values(err.data.errors)[0][0]
		// 		toast.error(message[0].toUpperCase() + message.slice(1))
	} else {
		toast.error('Something went wrong')
	}
}
