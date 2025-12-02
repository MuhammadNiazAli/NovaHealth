import React from 'react'

// Dashboard components import karo
import DashboardHero from '@/components/Dashboard/DashboardHero'
import DashboardStats from '@/components/Dashboard/DashboardStats'
import DashboardAppointments from '@/components/Dashboard/DashboardAppointments'
import DashboardPatients from '@/components/Dashboard/DashboardPatients'
import DashboardNotifications from '@/components/Dashboard/DashboardNotifications'
import DashboardReports from '@/components/Dashboard/DashboardReports'
import DashboardMessages from '@/components/Dashboard/DashboardMessages'
import DashboardSettings from '@/components/Dashboard/DashboardSettings'
import DashboardTasks from '@/components/Dashboard/DashboardTasks'
import DashboardActivityFeed from '@/components/Dashboard/DashboardActivityFeed'
import DashboardBilling from '@/components/Dashboard/DashboardBilling'
import DashboardSupport from '@/components/Dashboard/DashboardSupport'

const page = () => {
  return (
    <div>
      <DashboardHero />
      <DashboardStats />
      <DashboardAppointments />
      <DashboardPatients />
      <DashboardNotifications />
      <DashboardReports />
      <DashboardMessages />
      <DashboardSettings />
      <DashboardTasks />
      <DashboardActivityFeed />
      <DashboardBilling />
      <DashboardSupport />
    </div>
  )
}

export default page
