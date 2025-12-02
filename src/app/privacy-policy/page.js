// src/app/privacy-policy/page.js
import React from 'react'

import PrivacypolicyHero from '@/components/Privacy-Policy/PrivacypolicyHero'
import PrivacypolicyIntroduction from '@/components/Privacy-Policy/privacypolicyIntroduction'
import PrivacypolicyDataCollection from '@/components/Privacy-Policy/privacypolicyDataCollection'
import PrivacypolicyDataUsage from '@/components/Privacy-Policy/privacypolicyDataUsage'
import PrivacypolicyCookies from '@/components/Privacy-Policy/privacypolicyCookies'
import PrivacypolicyUserRights from '@/components/Privacy-Policy/privacypolicyUserRights'
import PrivacypolicyDataSecurity from '@/components/Privacy-Policy/privacypolicyDataSecurity'
import PrivacypolicyThirdParties from '@/components/Privacy-Policy/privacypolicyThirdParties'
import PrivacypolicyChildrenPrivacy from '@/components/Privacy-Policy/privacypolicyChildrenPrivacy'
import PrivacypolicyPolicyUpdates from '@/components/Privacy-Policy/privacypolicyPolicyUpdates'
import PrivacypolicyContactInfo from '@/components/Privacy-Policy/privacypolicyContactInfo'
import PrivacypolicyConsent from '@/components/Privacy-Policy/privacypolicyConsent'

const page = () => {
  return (
    <div>
      <PrivacypolicyHero />
      <PrivacypolicyIntroduction />
      <PrivacypolicyDataCollection />
      <PrivacypolicyDataUsage />
      <PrivacypolicyCookies />
      <PrivacypolicyUserRights />
      <PrivacypolicyDataSecurity />
      <PrivacypolicyThirdParties />
      <PrivacypolicyChildrenPrivacy />
      <PrivacypolicyPolicyUpdates />
      <PrivacypolicyContactInfo />
      <PrivacypolicyConsent />
    </div>
  )
}

export default page
