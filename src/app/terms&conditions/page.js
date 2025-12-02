// src/app/terms&conditions/page.js
import React from 'react'

// Terms & Conditions ke components import karo
import TermsConditionsHero from '@/components/Terms&Conditions/TermsconditionsHero'
import TermsConditionsIntro from '@/components/Terms&Conditions/TermsConditionsIntro'
import UserResponsibilities from '@/components/Terms&Conditions/UserResponsibilities'
import PrivacyPolicyLink from '@/components/Terms&Conditions/PrivacyPolicyLink'
import LimitationOfLiability from '@/components/Terms&Conditions/LimitationOfLiability'
import IntellectualProperty from '@/components/Terms&Conditions/IntellectualProperty'
import TerminationClause from '@/components/Terms&Conditions/TerminationClause'
import GoverningLaw from '@/components/Terms&Conditions/GoverningLaw'
import ContactInfo from '@/components/Terms&Conditions/ContactInfo'

const page = () => {
  return (
    <div>
      <TermsConditionsHero />
      <TermsConditionsIntro />
      <UserResponsibilities />
      <PrivacyPolicyLink />
      <LimitationOfLiability />
      <IntellectualProperty />
      <TerminationClause />
      <GoverningLaw />
      <ContactInfo />
    </div>
  )
}

export default page
