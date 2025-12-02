import React from 'react'

// Appointments ke components import karo
import AppointmentsHero from '@/components/Appointments/AppointmentsHero'
import AppointmentsForm from '@/components/Appointments/AppointmentsForm'
import AppointmentsList from '@/components/Appointments/AppointmentsList'
import AppointmentsFilters from '@/components/Appointments/AppointmentsFilters'
import AppointmentsCalendar from '@/components/Appointments/AppointmentsCalendar'
import AppointmentsDetails from '@/components/Appointments/AppointmentsDetails'
import AppointmentsConfirmation from '@/components/Appointments/AppointmentsConfirmation'
import AppointmentsFAQ from '@/components/Appointments/AppointmentsFAQ'
import AppointmentsLoading from '@/components/Appointments/AppointmentsLoading'
import AppointmentsEmptyState from '@/components/Appointments/AppointmentsEmptyState'

const page = () => {
  return (
    <div>
      <AppointmentsHero />
      <AppointmentsForm />
      <AppointmentsFilters />
      <AppointmentsCalendar />
      <AppointmentsList />
      <AppointmentsDetails />
      <AppointmentsConfirmation />
      <AppointmentsFAQ />
      <AppointmentsLoading />
      <AppointmentsEmptyState />
    </div>
  )
}

export default page
