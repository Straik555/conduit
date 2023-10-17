import { RefObject, useRef } from 'react'

type ScrollTopTypeResponse<Ref = HTMLDivElement> = {
	ref: RefObject<Ref>
	scrollCallback: () => void
}

export const useScrollTop = (): ScrollTopTypeResponse => {
	const ref = useRef<HTMLDivElement>(null)

	const scrollCallback = () => {
		ref?.current?.scrollTo(0, 0)
	}

	return {
		ref,
		scrollCallback
	}
}
