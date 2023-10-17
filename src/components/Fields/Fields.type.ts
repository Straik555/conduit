import { FieldPath, FieldValues } from 'react-hook-form'
import { Control, RegisterOptions } from 'react-hook-form/dist/types'
import { InputHTMLAttributes } from 'react'

export type FieldsProps<T extends FieldValues> = {
	name: FieldPath<T>
	control: Control<T>
	rules?: RegisterOptions
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onchange'>
