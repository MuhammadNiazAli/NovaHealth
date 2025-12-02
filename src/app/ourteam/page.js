import React from "react";

// Components import karo
import OurteamHero from "@/components/Ourteam/OurteamHero";
import OurteamIntro from "@/components/Ourteam/OurteamIntro";
import OurteamMembers from "@/components/Ourteam/OurteamMembers";
import OurteamValues from "@/components/Ourteam/OurteamValues";
import OurteamTestimonials from "@/components/Ourteam/OurteamTestimonials";
import OurteamGallery from "@/components/Ourteam/OurteamGallery";
import OurteamContact from "@/components/Ourteam/OurteamContact";
import OurteamFAQs from "@/components/Ourteam/OurteamFAQs";
import OurteamStats from "@/components/Ourteam/OurteamStats";

const page = () => {
  return (
    <main>
      <OurteamHero />
      <OurteamIntro />
      <OurteamMembers />
      <OurteamValues />
      <OurteamTestimonials />
      <OurteamGallery />
      <OurteamStats />
      <OurteamFAQs />
      <OurteamContact />
    </main>
  );
};

export default page;
