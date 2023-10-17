export type TabsContextValue<V = string> = {
	value: V
	setValue: (value: V) => void
}

export type TabsContainerProps<V = string> = {
	onChange?: (value: V) => void
} & Pick<TabsContextValue<V>, 'value'>

export type TabProps = {
	title: string
} & Pick<TabsContextValue, 'value'>
export type TabPanelProps = Pick<TabsContextValue, 'value'>
