import React, { useState, Suspense } from 'react'
import { useAuth } from 'src/auth/useAuth'
import LayoutBusiness from 'src/components/LayoutBusiness'
import { businessMenu } from 'src/data/menu'
import { useTabsContext } from 'src/context/useTabs'
const Calendar = React.lazy(() => import('src/components/Calendar'))
const Clients = React.lazy(() => import('src/components/Clients'))
const Profile = React.lazy(() => import('src/components/BusinessProfile'))

const Dashboard = () => {
  const { tab } = useTabsContext()
  const { user } = useAuth()

  return (
    <LayoutBusiness
      user={{ name: user?.displayName || '', image: user?.photoURL || '' }}
      tabs={businessMenu}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {tab === 'Calendar' && <Calendar />}
        {tab === 'Clients' && <Clients />}
        {tab === 'Profile' && <Profile />}
      </Suspense>
    </LayoutBusiness>
  )
}

export default Dashboard
