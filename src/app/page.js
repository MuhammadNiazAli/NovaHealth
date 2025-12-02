import React from 'react'

// Components import karo
import HomeHero from '@/components/Home/HomeHero'
import HomeAbout from '@/components/Home/HomeAbout'
import HomeServices from '@/components/Home/HomeServices'
import HomeDoctors from '@/components/Home/HomeDoctors'
import HomeTestimonials from '@/components/Home/HomeTestimonials'
import HomeFeatures from '@/components/Home/HomeFeatures'
import HomeAppointment from '@/components/Home/HomeAppointment'
import HomeBlogPreview from '@/components/Home/HomeBlogPreview'
import HomeContact from '@/components/Home/HomeContact'
import HomeFAQ from '@/components/Home/HomeFAQ'

const page = () => {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeDoctors />
      <HomeTestimonials />
      <HomeFeatures />
      <HomeAppointment />
      <HomeBlogPreview />
      <HomeFAQ />
      <HomeContact />
    </div>
  )
}

export default page
