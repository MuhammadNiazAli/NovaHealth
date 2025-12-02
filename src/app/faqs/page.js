// src/app/faqs/page.js

import React from "react";

// Faqs ke components import karo
import FaqsHero from "@/components/Faqs/FaqsHero";
import FaqsSearch from "@/components/Faqs/FaqsSearch";
import FaqsTopQuestions from "@/components/Faqs/FaqsTopQuestions";
import FaqsCategories from "@/components/Faqs/FaqsCategories";
import FaqsAccordion from "@/components/Faqs/FaqsAccordion";
import FaqsVideos from "@/components/Faqs/FaqsVideos";
import FaqsContactSupport from "@/components/Faqs/FaqsContactSupport";
import FaqsStats from "@/components/Faqs/FaqsStats";
import FaqsAskQuestion from "@/components/Faqs/FaqsAskQuestion";
import FaqsHelpfulLinks from "@/components/Faqs/FaqsHelpfulLinks";
import FaqsGuides from "@/components/Faqs/FaqsGuides";

const page = () => {
  return (
    <div>
      <FaqsHero />
      <FaqsSearch />
      <FaqsTopQuestions />
      <FaqsCategories />
      <FaqsAccordion />
      <FaqsVideos />
      <FaqsContactSupport />
      <FaqsStats />
      <FaqsAskQuestion />
      <FaqsHelpfulLinks />
      <FaqsGuides />
    </div>
  );
};

export default page;
