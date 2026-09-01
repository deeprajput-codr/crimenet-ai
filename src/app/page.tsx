// ============================================================
// CrimeNet AI — Landing Page
// ============================================================
'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
  HeroSection,
  FeaturesSection,
  AICapabilities,
  StatsSection,
  ArchitectureDiagram,
  TeamSection,
  ContactSection,
  Footer,
} from '@/components/landing';


export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AICapabilities />
      <StatsSection />
      <ArchitectureDiagram />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
