import React, { FC } from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

import { nextArrow, previousArrow } from './PaginationArrows'

export type TypePagination = {
	onClickPage: (n: {
		selected: number
		nextSelectedPage: number | undefined
	}) => number
} & Pick<ReactPaginateProps, 'pageCount' | 'forcePage'>

const classNameButton = 'bg-gray-400 h-8 w-8 m-0.5 rounded overflow-hidden'
const classNameButtonHref =
	'flex items-center justify-center h-full w-full bg-transparent text-white'

const Pagination: FC<TypePagination> = ({
	pageCount,
	forcePage,
	onClickPage
}) => {
	return (
		<div className='flex w-full justify-center pt-4'>
			<ReactPaginate
				pageCount={pageCount}
				pageRangeDisplayed={2}
				marginPagesDisplayed={2}
				containerClassName='flex items-center'
				nextLabel={nextArrow}
				previousLabel={previousArrow}
				activeClassName='bg-green'
				forcePage={forcePage}
				onClick={e => onClickPage(e)}
				previousClassName={classNameButton}
				nextClassName={classNameButton}
				breakLinkClassName='flex items-center justify-center h-8 w-8 m-0.5 bg-gray-300 rounded text-white cursor-pointer'
				pageLinkClassName={classNameButtonHref}
				previousLinkClassName={classNameButtonHref}
				nextLinkClassName={classNameButtonHref}
				pageClassName={classNameButton}
			/>
		</div>
	)
}

export default Pagination
