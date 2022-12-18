import React, { useState } from 'react'
import { useAuth } from 'src/auth/useAuth'
import LayoutBusiness from 'src/components/LayoutBusiness'
import { businessMenu } from 'src/data/menu'
import { useTabsContext } from 'src/context/useTabs'
import Clients from 'src/components/Clients'
const Calendar = React.lazy(() => import('src/components/Calendar'))

const Dashboard = () => {
  const { tab } = useTabsContext()
  const { user } = useAuth()

  return (
    <LayoutBusiness
      user={{ name: user?.displayName || '', image: user?.photoURL || '' }}
      tabs={businessMenu}
    >
      {tab === 'Calendar' && <Calendar />}
      {tab === 'Clients' && <Clients />}
    </LayoutBusiness>
  )
}

export default Dashboard
