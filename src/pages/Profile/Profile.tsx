import React, { FC } from 'react'
import { Method } from '../../api/profile/types'
import {
	Articles,
	Layout,
	Tabs,
	TabsContainer,
	TabsHeader,
	TabsPanel
} from '../../components'
import { ProfileTypesTab } from './Profile.types'
import {
	changePageFavoritePosts,
	changePageMyPost
} from '../../store/articleSlice/articleSlice'
import { useDispatch } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import { useProfile } from './useProfile'
import { ROUTES } from '../../navigation/Navigation.type'
import { useArticle, useAuth } from '../../hooks/useState'
import { useNavigate } from 'react-router-dom'

const Profile: FC = () => {
	const dispatch = useDispatch()
	const { token } = useAuth()
	const navigate = useNavigate()
	const { myPosts, favoritePosts } = useArticle()

	const {
		isPaginationMyPostLoading,
		articleMyPosts,
		totalCountMyPosts,
		follow,
		setActiveTabs,
		activeTab,
		user,
		favorite,
		isLoading,
		isPaginationFavoritePostLoading,
		articleFavoritePosts
	} = useProfile()

	return (
		<Layout isHiddenBlock isLoadingAbsolut={isLoading}>
			{!!user && (
				<ProfileHeader
					profile={user.profile}
					onFollow={() =>
						follow({
							username: user.profile.username,
							method: user.profile.following ? Method.DELETE : Method.POST
						})
					}
				/>
			)}
			<div className='flex max-w-content w-full mx-auto'>
				<TabsContainer
					value={activeTab}
					onChange={value => setActiveTabs(value)}
				>
					<TabsHeader>
						<Tabs
							value={ProfileTypesTab.MY_POSTS}
							title={ProfileTypesTab.MY_POSTS}
						/>
						<Tabs
							value={ProfileTypesTab.FAVORITE_POSTS}
							title={ProfileTypesTab.FAVORITE_POSTS}
						/>
					</TabsHeader>
					<TabsPanel value={ProfileTypesTab.MY_POSTS}>
						<Articles
							articles={articleMyPosts?.articles}
							onFavorite={(slug, method) =>
								!!token ? favorite({ slug, method }) : navigate(ROUTES.SIGN_IN)
							}
							forcePage={myPosts / 10}
							totalCount={totalCountMyPosts}
							onClickPage={({ nextSelectedPage, selected }) => {
								if (isPaginationMyPostLoading) {
									dispatch(
										changePageMyPost({
											myPosts:
												(nextSelectedPage !== undefined
													? nextSelectedPage
													: selected) * 10
										})
									)
								}

								return myPosts / 10
							}}
						/>
					</TabsPanel>
					<TabsPanel value={ProfileTypesTab.FAVORITE_POSTS}>
						<Articles
							articles={articleFavoritePosts?.articles}
							onFavorite={(slug, method) => console.log('fav')}
							forcePage={favoritePosts / 10}
							totalCount={totalCountMyPosts}
							onClickPage={({ nextSelectedPage, selected }) => {
								if (isPaginationFavoritePostLoading) {
									dispatch(
										changePageFavoritePosts({
											favoritePosts:
												(nextSelectedPage !== undefined
													? nextSelectedPage
													: selected) * 10
										})
									)
								}

								return favoritePosts / 10
							}}
						/>
					</TabsPanel>
				</TabsContainer>
			</div>

			{/*{!!user && !profileIsLoading ? (*/}
			{/*	<div className='w-full flex-col'>*/}
			{/*		<ProfileHeader*/}
			{/*			profile={user.profile}*/}
			{/*			onFollow={() =>*/}
			{/*				follow({*/}
			{/*					username: user.profile.username,*/}
			{/*					method: user.profile.following ? Method.DELETE : Method.POST*/}
			{/*				})*/}
			{/*			}*/}
			{/*		/>*/}
			{/*		<div className='max-w-content mx-auto'>*/}
			{/*			{!!article?.articles.length ? (*/}
			{/*				<Articles*/}
			{/*					articles={article.articles}*/}
			{/*					onFavorite={(slug, method) =>*/}
			{/*						!!token*/}
			{/*							? favorite({ slug, method })*/}
			{/*							: navigate(ROUTES.SIGN_IN)*/}
			{/*					}*/}
			{/*				/>*/}
			{/*			) : (*/}
			{/*				<NothingToShow title='No articles are here... yet.' />*/}
			{/*			)}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*) : (*/}
			{/*	<Loader />*/}
			{/*)}*/}
		</Layout>
	)
}

export default Profile
