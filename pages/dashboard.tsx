import * as React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/auth/useAuth'
import LayoutBusiness from 'src/components/LayoutBusiness'
import { businessMenu } from 'src/data/menu'

const Dashboard = () => {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (!user) {
      // router.push('/')
    }
  }, [user, router])

  return (
    <LayoutBusiness
      user={{ name: user?.displayName || '', image: user?.photoURL || '' }}
      tabs={businessMenu}
    >
      <p>Client dashboard coming soon...</p>
    </LayoutBusiness>
  )
}

export default Dashboard
