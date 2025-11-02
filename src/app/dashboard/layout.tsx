import DashboardLayout from '@/components/layouts/dashboard-layout/dashboardLayout'
import React, { PropsWithChildren } from 'react'



const HomeLayout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}

export default HomeLayout