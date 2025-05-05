import React from 'react';
import { Info } from 'lucide-react';

const WarningBanner: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-b-2 border-yellow-400 text-yellow-800 px-4 py-2 flex items-center justify-center">
      <Info className="h-5 w-5 mr-2" />
      <span className="text-sm font-medium">
        Atenție: Jocurile de noroc pot crea dependență și pot duce la pierderi financiare. Joacă responsabil!
      </span>
    </div>
  );
};

export default WarningBanner;
