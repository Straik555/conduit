import React, { FC } from 'react'
import cn from 'clsx'

const Loader: FC<{ isAbsolute?: boolean }> = ({ isAbsolute }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center w-screen h-screen bg-white opacity-70',
				{
					'z-[1] absolute': isAbsolute
				}
			)}
		>
			<div className='loader'>
				<div className='loadingio-spinner-ripple-psursag005'>
					<div className='ldio-n9iy4pom8mc'>
						<div />
						<div />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loader
