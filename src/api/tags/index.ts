import { TagsApiTypes, TagsTypesResponse } from './types'
import { baseApiSlice } from '../index'

const TagsApiTagTypes = [TagsApiTypes.Tags]

const enhancedBaseApiSlice = baseApiSlice.enhanceEndpoints({
	addTagTypes: TagsApiTagTypes
})

const tagsApi = enhancedBaseApiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: build => ({
		getAllTag: build.query<TagsTypesResponse, null>({
			query: () => ({
				url: '/tags',
				method: 'GET'
			}),
			providesTags: [TagsApiTypes.Tags]
		})
	})
})

export const { useGetAllTagQuery } = tagsApi
