import React, { useContext, useMemo, useState } from 'react'
import { businessMenu } from 'src/data/menu'

interface IProps {
  children: React.ReactNode
}

interface ITabContext {
  tab?: string
  setTab?: (tab: string) => void
}

const TabsStateContext = React.createContext<ITabContext>({
  tab: businessMenu[0],
})

export const TabsStateProvider = ({ children }: IProps) => {
  const [currentTab, setCurrentTab] = useState({ tab: businessMenu[0] })

  const value = useMemo(
    () => ({
      tab: currentTab.tab,
      setTab: (tab: string) => {
        setCurrentTab({ tab })
      },
    }),
    [currentTab.tab],
  )

  return (
    <TabsStateContext.Provider value={value}>
      {children}
    </TabsStateContext.Provider>
  )
}

export const useTabsContext = () => {
  return useContext(TabsStateContext)
}
