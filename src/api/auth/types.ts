export type UserTypeResponse = {
	user: UserType
}

export type UserType = {
	token: string
	image: string
	email: string
	username: string
	bio: null | string
	following: boolean
}

export type UserTypeProps = {
	password: string
} & Pick<UserType, 'email' | 'username'>

export type TypeErrorAuth = {
	data:
		| {
				errors: ErrorsTypeBody
		  }
		| undefined
}

export type ErrorsTypeBody = {
	username: string[]
	email: string[]
	password: string[]
}
