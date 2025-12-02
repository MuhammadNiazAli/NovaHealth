import React from 'react'

// Components import karo
import TestimonialsHero from '@/components/Testimonials/TestimonialsHero'
import TestimonialsList from '@/components/Testimonials/TestimonialsList'
import TestimonialsStats from '@/components/Testimonials/TestimonialsStats'
import TestimonialsVideo from '@/components/Testimonials/TestimonialsVideo'
import TestimonialsCallToAction from '@/components/Testimonials/TestimonialsCallToAction'
import TestimonialsCarousel from '@/components/Testimonials/TestimonialsCarousel'
import TestimonialsDoctors from '@/components/Testimonials/TestimonialsDoctors'
import TestimonialsFAQ from '@/components/Testimonials/TestimonialsFAQ'

const page = () => {
  return (
    <div>
      <TestimonialsHero />
      <TestimonialsList />
      <TestimonialsStats />
      <TestimonialsVideo />
      <TestimonialsCarousel />
      <TestimonialsDoctors />
      <TestimonialsFAQ />
      <TestimonialsCallToAction />
    </div>
  )
}

export default page
