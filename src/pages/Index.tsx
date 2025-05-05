
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import MonteCarloSimulation from '@/components/MonteCarloSimulation';
import SlotMachineSimulator from '@/components/SlotMachineSimulator';
import EducationSection from '@/components/EducationSection';
import QuizSection from '@/components/QuizSection';
import ThesisSection from '@/components/ThesisSection';
import LandingPage from '@/components/LandingPage';
import SiteFooter from '@/components/SiteFooter';


const Index: React.FC = () => {
  // Change default section to slot-simulator to have it open by default
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'simulation':
        return <MonteCarloSimulation />;
      case 'slot-simulator':
        return <SlotMachineSimulator />;
      case 'education':
        return <EducationSection />;
      case 'quiz':
        return <QuizSection />;
      case 'thesis':
        return <ThesisSection />;
      case 'home':
        return <LandingPage/>
      default:
        return <LandingPage />; // Default to slot machine simulator
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 bg-gray-50">
        {renderActiveSection()}
      </main>
      <SiteFooter/>
    </div>
  );
};

export default Index;
