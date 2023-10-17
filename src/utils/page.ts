export const getPageCount = (totalPage: number, limit: number) => {
	return Math.ceil(totalPage / limit)
}
