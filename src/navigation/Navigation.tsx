import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '~navigation/routes'

const Navigation: FC = () => {
	return (
		<Routes>
			{routes.map(({ component, path, name }) => (
				<Route key={name} path={path} element={component} />
			))}
			<Route path='*' element={<div>NotFound</div>} />
		</Routes>
	)
}

export default Navigation
