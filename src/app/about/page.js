import React from "react"

// About components import karo
import AboutHero from "@/components/About/AboutHero"
import AboutMission from "@/components/About/AboutMission"
import AboutTeam from "@/components/About/AboutTeam"
import AboutHistory from "@/components/About/AboutHistory"
import AboutServices from "@/components/About/AboutServices"
import AboutTestimonials from "@/components/About/AboutTestimonials"
import AboutPartners from "@/components/About/AboutPartners"
import AboutStats from "@/components/About/AboutStats"
import AboutFAQ from "@/components/About/AboutFAQ"
import AboutContact from "@/components/About/AboutContact"

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutMission />
      <AboutTeam />
      <AboutHistory />
      <AboutServices />
      <AboutTestimonials />
      <AboutPartners />
      <AboutStats />
      <AboutFAQ />
      <AboutContact />
    </div>
  )
}

export default page
