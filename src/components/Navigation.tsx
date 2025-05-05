
import React from 'react';
import { cn } from "@/lib/utils";


interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Acasă'},
    { id: 'simulation', label: 'Simulare Monte Carlo' },
    { id: 'slot-simulator', label: 'Testează Demo', highlight: true },
    { id: 'education', label: 'Educație' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'thesis', label: 'Teză' },
    
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-2xl font-bold text-slot-darkblue">SlotSense</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-slot-darkblue text-white"
                    : item.highlight
                      ? "text-slot-darkblue border border-slot-darkblue hover:bg-gray-50"
                      : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
