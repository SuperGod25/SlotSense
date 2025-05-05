import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-6">
      <div className="container mx-auto text-center text-sm text-gray-600 space-y-2">
        <p>
          © 2025 SlotSense | O aplicație educațională despre riscurile jocurilor de noroc
        </p>
        <p>
          Toate informațiile sunt bazate pe modele matematice și nu reprezintă sfaturi financiare.
        </p>
        <p>
          Ai nevoie de ajutor? Sună la linia gratuită de consiliere: 
          <span className="font-bold"> 0800 800 099</span>
        </p>
        <p>
          Vizitează: 
          <a
            href="https://www.jocresponsabil.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slot-darkblue underline ml-1"
          >
            www.jocresponsabil.ro
          </a>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
