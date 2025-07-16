import { Box } from "@mantine/core";

import { ChatboxSection } from "./Section/Chatbox-section";
import { CourseCategoriesSection } from "./Section/Course-categories-section";
import { EduMarketOfferSection } from "./Section/EduMarket-offer-section";
import { FeaturedCoursesSection } from "./Section/Featured-courses-section";
import { FeaturesSection } from "./Section/Features-section";
import { HeroSection } from "./Section/Hero-section";
import { QeASection } from "./Section/QeA-section";
import { TestimonialSection } from "./Section/Testimonials-section";

export default function HomePage() {
  return (
    <>
      <Box mx={{ base: 12, sm: 40, md: 60, xl: 120 }} mt={"md"}>
        <HeroSection />
        <FeaturesSection />
        <CourseCategoriesSection />
        <FeaturedCoursesSection />
      </Box>
      <TestimonialSection />
      <Box mx={{ base: 12, sm: 40, md: 60, xl: 120 }}>
        <EduMarketOfferSection />
        <QeASection />
      </Box>
      <ChatboxSection />
    </>
  );
}
