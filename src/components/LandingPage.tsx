import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl text-center text-slot-darkblue mb-2">SlotSense</CardTitle>
          <CardDescription className="text-center text-lg">
            Joacă informat. Câștigă control, nu iluzii.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-700 text-lg">
            Bine ai venit pe SlotSense — platforma creată pentru a arăta adevărul din spatele sloturilor și altor jocuri de noroc.
          </p>

          <Alert className="bg-yellow-50 border-l-4 border-yellow-400">
            <Info className="h-5 w-5 text-yellow-500" />
            <AlertTitle>Știați că?</AlertTitle>
            <AlertDescription>
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  <span className="font-bold">97%</span> dintre jucători pierd mai mult decât câștigă pe termen lung.
                </li>
                <li>
                  Sloturile au un avantaj al casei între <span className="font-bold">85% și 98%</span>, garantând profit cazinoului.
                </li>
                <li>
                  Șansele de a câștiga un jackpot mare sunt de aproximativ <span className="font-bold">1 la 262.144</span>.
                </li>
                <li>
                  Sunetele, luminile și efectele vizuale sunt concepute pentru a-ți stimula impulsurile și a te face să joci mai mult.
                </li>
                <li>
                  Jocurile de noroc pot duce la dependență, probleme financiare și emoționale grave.
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          <p className="text-center text-gray-600 text-md">
            Informează-te, stabilește limite clare și nu uita: distracția se termină acolo unde încep pierderile serioase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
