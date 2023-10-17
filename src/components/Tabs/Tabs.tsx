import React, {
	FC,
	PropsWithChildren,
	ReactElement,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'
import { TabsContext } from './TabsContext'
import { TabPanelProps, TabProps, TabsContainerProps } from './Tabs.types'
import cn from 'clsx'

export const TabsContainer = function TC<Value = string>({
	children,
	value,
	onChange
}: PropsWithChildren<TabsContainerProps<Value>>): ReactElement | null {
	const [stateValue, setStateValue] = useState<Value>(value)

	const setValue = useCallback(
		(v: unknown): void => {
			setStateValue(v as SetStateAction<Value>)
			onChange?.(v as Value)
		},
		[onChange]
	)

	useEffect(() => {
		if (value === stateValue) return

		setStateValue(value)
	}, [value])

	return (
		<TabsContext.Provider value={{ value, setValue }}>
			<div className='w-full'>{children}</div>
		</TabsContext.Provider>
	)
}

export const TabsHeader: FC<PropsWithChildren> = ({ children }) => (
	<div className='flex items-center w-full border-b-[1px] border-gray-200'>
		{children}
	</div>
)

export const Tabs: FC<TabProps> = ({ value, title }) => {
	const { value: valueTabs, setValue } = useContext(TabsContext)
	const isSelected = value === valueTabs
	return (
		<span
			className={cn('text-gray-500 py-2 px-4 text-base cursor-pointer', {
				'border-b border-green !text-green': isSelected
			})}
			onClick={() => setValue(value)}
		>
			{title}
		</span>
	)
}

export const TabsPanel: FC<PropsWithChildren<TabPanelProps>> = ({
	value,
	children
}) => {
	const { value: tabsValue } = useContext(TabsContext)
	return <>{tabsValue === value ? children : null}</>
}
