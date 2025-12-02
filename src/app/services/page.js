"use client"

import React from "react"

// Services components import
import ServicesHero from "@/components/Services/ServicesHero"
import ServicesIntro from "@/components/Services/ServicesIntro"
import ServiceList from "@/components/Services/ServiceList"
import ServiceDetailsTabs from "@/components/Services/ServiceDetailsTabs"
import SpecializationsCarousel from "@/components/Services/SpecializationsCarousel"
import ServiceHighlights from "@/components/Services/ServiceHighlights"
import PatientCareProcess from "@/components/Services/PatientCareProcess"
import WhyChooseUs from "@/components/Services/WhyChooseUs"
import ServiceTestimonials from "@/components/Services/ServiceTestimonials"
import InsuranceAccepted from "@/components/Services/InsuranceAccepted"
import BookNowCta from "@/components/Services/BookNowCta"
import FaqServices from "@/components/Services/FaqServices"
import DoctorsByService from "@/components/Services/DoctorsByService"
import ServicesStats from "@/components/Services/ServicesStats"

// Optional advanced components
import VirtualConsultationPromo from "@/components/Services/VirtualConsultationPromo"
import EmergencyNotice from "@/components/Services/EmergencyNotice"
import ServiceLocationMap from "@/components/Services/ServiceLocationMap"
import RequestCallbackForm from "@/components/Services/RequestCallbackForm"

const page = () => {
  return (
    <div>
      <ServicesHero />
      <ServicesIntro />
      <ServiceList />
      <ServiceDetailsTabs />
      <SpecializationsCarousel />
      <ServiceHighlights />
      <PatientCareProcess />
      <WhyChooseUs />
      <ServiceTestimonials />
      <InsuranceAccepted />
      <BookNowCta />
      <FaqServices />
      <DoctorsByService />
      <ServicesStats />
      <VirtualConsultationPromo />
      <EmergencyNotice />
      <ServiceLocationMap />
      <RequestCallbackForm />
    </div>
  )
}

export default page
