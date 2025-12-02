import React from 'react'

// Patient Info Components Import
import PatientInfoHero from '@/components/Patient-Info/PatientInfoHero'
import PatientInfoOverview from '@/components/Patient-Info/PatientInfoOverview'
import PatientPersonalDetails from '@/components/Patient-Info/PatientPersonalDetails'
import PatientMedicalHistory from '@/components/Patient-Info/PatientMedicalHistory'
import PatientAppointments from '@/components/Patient-Info/PatientAppointments'
import PatientMedications from '@/components/Patient-Info/PatientMedications'
import PatientAllergies from '@/components/Patient-Info/PatientAllergies'
import PatientLabResults from '@/components/Patient-Info/PatientLabResults'
import PatientVitals from '@/components/Patient-Info/PatientVitals'
import PatientInsuranceInfo from '@/components/Patient-Info/PatientInsuranceInfo'
import PatientEmergencyContacts from '@/components/Patient-Info/PatientEmergencyContacts'
import PatientDocumentsUpload from '@/components/Patient-Info/PatientDocumentsUpload'
import PatientNotes from '@/components/Patient-Info/PatientNotes'
import PatientContactPreferences from '@/components/Patient-Info/PatientContactPreferences'
import PatientInfoFooter from '@/components/Patient-Info/PatientInfoFooter'

const page = () => {
  return (
    <div>
      <PatientInfoHero />
      <PatientInfoOverview />
      <PatientPersonalDetails />
      <PatientMedicalHistory />
      <PatientAppointments />
      <PatientMedications />
      <PatientAllergies />
      <PatientLabResults />
      <PatientVitals />
      <PatientInsuranceInfo />
      <PatientEmergencyContacts />
      <PatientDocumentsUpload />
      <PatientNotes />
      <PatientContactPreferences />
      <PatientInfoFooter />
    </div>
  )
}

export default page
