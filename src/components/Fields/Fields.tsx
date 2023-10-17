import React from 'react'
import { Controller } from 'react-hook-form'
import { FieldsProps } from './Fields.type'
import cn from 'clsx'

const Fields = <T extends Record<string, any>>({
	name,
	rules,
	control,
	placeholder,
	className,
	...rest
}: FieldsProps<T>): JSX.Element => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<div className='relative w-full bg-transparent'>
					<input
						placeholder={placeholder || `Enter ${name}`}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						autoCapitalize='none'
						className={cn(
							'border-[1px] border-green !shadow-[inset_0_0_0_30px_white] rounded-xl text-gray-700 pb-4 pt-3 px-4 text-base w-full !fill-transparent bg-transparent outline-none mb-4',
							className
						)}
						{...rest}
					/>
					{!!error && (
						<p className='absolute text-xs -bottom-0 text-red-600 pl-2'>
							{error.message}
						</p>
					)}
				</div>
			)}
		/>
	)
}

export default Fields
