import React from "react";

// Emergency components import karo
import EmergencyHero from "@/components/Emergency/EmergencyHero";
import EmergencyInfo from "@/components/Emergency/EmergencyInfo";
import EmergencyContact from "@/components/Emergency/EmergencyContact";
import EmergencyServices from "@/components/Emergency/EmergencyServices";
import EmergencyFAQ from "@/components/Emergency/EmergencyFAQ";
import EmergencyStats from "@/components/Emergency/EmergencyStats";
import EmergencySteps from "@/components/Emergency/EmergencySteps";
import EmergencyFooter from "@/components/Emergency/EmergencyFooter";

const page = () => {
  return (
    <main>
      <EmergencyHero />
      <EmergencyInfo />
      <EmergencyServices />
      <EmergencySteps />
      <EmergencyStats />
      <EmergencyContact />
      <EmergencyFAQ />
      <EmergencyFooter />
    </main>
  );
};

export default page;
