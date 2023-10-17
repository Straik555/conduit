import { createContext } from 'react'
import { TabsContextValue } from './Tabs.types'

export const TabsContext = createContext<TabsContextValue<unknown>>({
	setValue: () => {},
	value: ''
})
