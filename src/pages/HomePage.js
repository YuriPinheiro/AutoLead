import React from 'react';
import Grid from "@mui/material/Grid2";
import HeroSection from '../sections/HeroSection';
import StepsSection from '../sections/StepsSection.js';
import AdvantageSection from '../sections/AdvantageSection.js';
import RetailerSection from '../sections/RetailerSection.js';
import AboutSection from '../sections/AboutSection.js';
import CommentsSection from '../sections/CommentsSection.js';
import CallToActionSection from '../sections/CallToActionSection.js';
import Footer from '../components/Footer';
import Header from '../components/Header';




const HomePage = () => {
 

  return (
    <Grid>
      <Header />
      <HeroSection />
      <StepsSection />
      <AdvantageSection />
      <CommentsSection />
      <RetailerSection />
      <AboutSection />
      <CallToActionSection />
      <Footer />

    </Grid>
  );
};

export default HomePage;