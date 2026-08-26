import * as React from "react";
import { HomeHeader } from "@/components/home/home-header";
import { HeroSection } from "@/components/home/hero-section";
import { CourseGrid } from "@/components/home/course-grid";
import { WeeklyBanner } from "@/components/home/weekly-banner";
import { DecorativeFooter } from "@/components/home/decorative-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] bg-diagonal-hatch flex flex-col items-center">
      {/* Central content canvas */}
      <div className="w-full max-w-[1440px] bg-[#FAFAFC] min-h-screen flex flex-col justify-between shadow-2xs border-x border-[#F1F5F9]/80">
        
        {/* Top Header */}
        <HomeHeader activeTab="courses" />

        {/* Main Content Sections */}
        <main className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Hero & Search */}
            <HeroSection />

            {/* Courses Catalog Grid */}
            <CourseGrid />
          </div>

          {/* Bottom Elements */}
          <div className="space-y-2 pt-6">
            {/* Weekly updates divider */}
            <WeeklyBanner />

            {/* Decorative equalizer graphic */}
            <DecorativeFooter />
          </div>
        </main>

      </div>
    </div>
  );
}
