import React, { FC } from 'react'
import { Articles, Layout, Loader, TagItem } from '../../components'
import { ROUTES } from '../../navigation/Navigation.type'
import { useArticle, useAuth } from '../../hooks/useState'
import { useNavigate } from 'react-router-dom'
import { useHome } from './useHome'
import {
	Tabs,
	TabsContainer,
	TabsHeader,
	TabsPanel
} from '../../components/Tabs'
import { HomeTabs } from './Home.types'
import {
	changePageGlobal,
	changePageYour
} from '../../store/articleSlice/articleSlice'
import { useDispatch } from 'react-redux'

const Home: FC = () => {
	const { token } = useAuth()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { globalPage, yourPage } = useArticle()

	const {
		isLoading,
		tags,
		isLoadingTags,
		activeTab,
		setActiveTab,
		articles,
		isPaginationEmpty,
		totalCount,
		articlesYour,
		isPaginationYourEmpty,
		totalCountYour,
		isLoadingYour,
		favorite
	} = useHome()

	return (
		<Layout isLoadingAbsolut={isLoading || isLoadingYour}>
			<div className='flex max-w-content mx-auto'>
				<TabsContainer
					value={activeTab}
					onChange={value =>
						value === HomeTabs.Your && !token
							? navigate(ROUTES.SIGN_IN)
							: setActiveTab(value)
					}
				>
					<TabsHeader>
						<Tabs value={HomeTabs.Your} title={HomeTabs.Your} />
						<Tabs value={HomeTabs.Global} title={HomeTabs.Global} />
					</TabsHeader>
					<TabsPanel value={HomeTabs.Your}>
						<Articles
							articles={articlesYour?.articles}
							onFavorite={(slug, method) => console.log('you', slug, method)}
							forcePage={yourPage / 10}
							totalCount={totalCountYour}
							onClickPage={({ nextSelectedPage, selected }) => {
								if (isPaginationYourEmpty) {
									dispatch(
										changePageYour({
											yourPage:
												(nextSelectedPage !== undefined
													? nextSelectedPage
													: selected) * 10
										})
									)
								}

								return yourPage / 10
							}}
						/>
					</TabsPanel>
					<TabsPanel value={HomeTabs.Global}>
						<Articles
							articles={articles?.articles}
							onFavorite={(slug, method) =>
								!!token ? favorite({ slug, method }) : navigate(ROUTES.SIGN_IN)
							}
							forcePage={globalPage / 10}
							totalCount={totalCount}
							onClickPage={({ nextSelectedPage, selected }) => {
								if (isPaginationEmpty) {
									dispatch(
										changePageGlobal({
											globalPage:
												(nextSelectedPage !== undefined
													? nextSelectedPage
													: selected) * 10
										})
									)
								}

								return globalPage / 10
							}}
						/>
					</TabsPanel>
				</TabsContainer>
				{!!tags && (
					<div className='flex flex-col overflow-hidden w-1/3 p-2 ml-4'>
						<div className='flex flex-col w-full bg-gray-100 rounded p-2'>
							<h2>Popular Tags</h2>
							{!isLoadingTags ? (
								<div className='flex flex-wrap'>
									{tags.tags?.map((tag, index) => (
										<TagItem
											key={index}
											title={tag}
											className='flex items-center justify-center text-white text-xs font-medium p-2 rounded-xl bg-gray-400 m-0.5'
										/>
									))}
								</div>
							) : (
								<Loader />
							)}
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Home
