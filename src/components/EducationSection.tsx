
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BookOpen, TrendingDown, Coins } from 'lucide-react';

const EducationSection: React.FC = () => {
  const [coinFlips, setCoinFlips] = useState<number>(100);
  const [probability, setProbability] = useState<number>(0.49); // Slightly below 0.5 to show house edge
  const [expectedValue, setExpectedValue] = useState<number>(1);
  const [betAmount, setBetAmount] = useState<number>(10);
  
  // Generate binomial distribution data
  const generateBinomialData = (n: number, p: number) => {
    const data = [];
    
    // Calculate binomial probabilities and expected payoffs
    for (let k = 0; k <= n; k++) {
      // Binomial probability mass function
      const binomialCoeff = factorial(n) / (factorial(k) * factorial(n - k));
      const probability = binomialCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
      
      data.push({
        successes: k,
        probability: probability,
        expected: k * betAmount - (n - k) * betAmount
      });
    }
    
    return data;
  };
  
  // Factorial function for binomial coefficient calculation
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };
  
  // Calculate expected value
  const calculateExpectedValue = (p: number, win: number, loss: number) => {
    return p * win - (1 - p) * loss;
  };
  
  // Example data for visualization
  const binomialData = generateBinomialData(coinFlips, probability);
  
  // Calculate expected value after n rounds
  const calculateExpectedAfterNRounds = (n: number, ev: number) => {
    return n * ev;
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-slot-darkblue text-white">
        <CardTitle className="flex items-center gap-2 break-words">

            <BookOpen className="h-6 w-6" />
            Teoria matematică din spatele jocurilor de noroc
          </CardTitle>
          <CardDescription className="text-gray-200 text-sm md:text-base break-words">

            Înțelege de ce păcănelele sunt profitabile pentru cazinouri
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="law-large-numbers" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
  <TabsTrigger value="law-large-numbers" className="w-full">
    Legea Numerelor Mari
  </TabsTrigger>
  <TabsTrigger value="expected-value" className="w-full">
    Valoarea Așteptată
  </TabsTrigger>
  <TabsTrigger value="house-edge" className="w-full">
    Avantajul Cazinoului
  </TabsTrigger>
</TabsList>

            
            {/* Law of Large Numbers */}
            <TabsContent value="law-large-numbers" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slot-darkblue">Legea Numerelor Mari</h3>
                <p>
                  Legea numerelor mari este un principiu fundamental în probabilități care explică de ce cazinourile câștigă întotdeauna pe termen lung. 
                  Această lege afirmă că, pe măsură ce numărul de încercări crește, media rezultatelor se va apropia din ce în ce mai mult de valoarea așteptată.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-4">
                  <h4 className="font-bold text-slot-darkblue mb-2">Formulare matematică:</h4>
                  <p className="mb-2">Pentru o secvență de variabile aleatoare independente și identic distribuite X₁, X₂, X₃, ..., cu aceeași valoare așteptată μ:</p>
                  <div className="bg-white p-3 rounded text-center">
                    <span className="font-mono">lim[n→∞] P(|S_n/n - μ| {'>'} ε) = 0</span>
                  </div>
                  <p className="mt-2 text-sm">Unde S_n este suma primelor n variabile aleatoare, iar ε este orice număr pozitiv.</p>
                </div>
                
                <h4 className="font-semibold text-slot-darkblue">Exemplu interactiv: Aruncarea monedei</h4>
                <p className="mb-4">
                  Simulează aruncarea unei monede pentru a vedea cum media rezultatelor se apropie de probabilitatea teoretică pe măsură ce numărul de aruncări crește.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="coin-flips">Numărul de aruncări: {coinFlips}</Label>
                    </div>
                    <Slider
                      id="coin-flips"
                      min={10}
                      max={1000}
                      step={10}
                      value={[coinFlips]}
                      onValueChange={(values) => setCoinFlips(values[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="probability">Probabilitate monedă (p): {probability.toFixed(2)}</Label>
                    </div>
                    <Slider
                      id="probability"
                      min={0.01}
                      max={0.99}
                      step={0.01}
                      value={[probability]}
                      onValueChange={(values) => setProbability(values[0])}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Notă: Valoarea implicită este 0.49 pentru a simula un ușor avantaj al cazinoului.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold text-slot-darkblue mb-2">Interpretare:</h4>
                  <p>
                    La {coinFlips} aruncări de monedă cu probabilitatea de {probability.toFixed(2)} pentru cap:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Numărul așteptat de capuri: <strong>{(coinFlips * probability).toFixed(2)}</strong></li>
                    <li>Deviația standard: <strong>{Math.sqrt(coinFlips * probability * (1 - probability)).toFixed(2)}</strong></li>
                    <li>
                      Pe termen lung, procentul de capuri se va apropia de: <strong>{(probability * 100).toFixed(2)}%</strong>
                    </li>
                    <li className="text-red-600 font-semibold">
                      {probability < 0.5 ? (
                        "Deoarece probabilitatea este sub 0.5, jucătorul va pierde inevitabil pe termen lung."
                      ) : ""}
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-slot-darkblue mb-2">Aplicarea la jocurile de noroc:</h4>
                  <p>
                    În păcănele și alte jocuri de cazinou, probabilitățile sunt întotdeauna înclinat în favoarea cazinoului (RTP {'<'} 100%). 
                    Legea numerelor mari garantează că, după suficiente runde de joc, rezultatul va fi aproape de valoarea așteptată - care este o pierdere pentru jucător.
                  </p>
                  <p className="mt-2">
                    Cu cât jucați mai mult, cu atât este mai probabil să pierdeți conform cu marja casei.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Expected Value */}
            <TabsContent value="expected-value" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slot-darkblue">Valoarea Așteptată (Expected Value)</h3>
                <p>
                  Valoarea așteptată este suma tuturor rezultatele posibile înmulțite cu probabilitățile lor. 
                  În jocurile de noroc, aceasta reprezintă câștigul sau pierderea medie pe care un jucător o poate aștepta pe termen lung.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-4">
                  <h4 className="font-bold text-slot-darkblue mb-2">Formulare matematică:</h4>
                  <p className="mb-2">Pentru o variabilă aleatoare X cu valorile posibile x₁, x₂, ..., xₙ și probabilitățile corespunzătoare p₁, p₂, ..., pₙ:</p>
                  <div className="bg-white p-3 rounded text-center">
                    <span className="font-mono">E(X) = x₁p₁ + x₂p₂ + ... + xₙpₙ</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-slot-darkblue">Exemplu interactiv: Calcul valoare așteptată</h4>
                <p className="mb-4">
                  Ajustați parametrii pentru a vedea cum valoarea așteptată determină câștigul sau pierderea pe termen lung.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="bet-amount">Suma mizată (lei):</Label>
                      <Input
                        id="bet-amount"
                        type="number"
                        min={1}
                        step={1}
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value) || 1)}
                        className="slot-input"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="win-probability">Probabilitate de câștig: {probability.toFixed(2)}</Label>
                      </div>
                      <Slider
                        id="win-probability"
                        min={0.01}
                        max={0.99}
                        step={0.01}
                        value={[probability]}
                        onValueChange={(values) => setProbability(values[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="expected-value">Multiplicator câștig: {expectedValue.toFixed(2)}x</Label>
                      </div>
                      <Slider
                        id="expected-value"
                        min={1}
                        max={10}
                        step={0.1}
                        value={[expectedValue]}
                        onValueChange={(values) => setExpectedValue(values[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold text-slot-darkblue mb-2">Rezultat:</h4>
                    <div className="space-y-2">
                      <p>Miză: <strong>{betAmount} lei</strong></p>
                      <p>Câștig potențial: <strong>{(betAmount * expectedValue).toFixed(2)} lei</strong></p>
                      <p>Pierdere potențială: <strong>{betAmount} lei</strong></p>
                      <p>Probabilitate de câștig: <strong>{(probability * 100).toFixed(2)}%</strong></p>
                      <p>Probabilitate de pierdere: <strong>{((1 - probability) * 100).toFixed(2)}%</strong></p>
                      <div className="border-t border-gray-300 my-2 pt-2">
                        <p className="font-bold">Valoarea așteptată per rundă:</p>
                        <p className={calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount) >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                          {calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount).toFixed(2)} lei
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mt-4">
                  <h4 className="font-semibold text-slot-darkblue mb-2">Pierdere așteptată după multiple runde:</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-white rounded-md shadow">
                      <p className="text-sm">După 10 runde:</p>
                      <p className={calculateExpectedAfterNRounds(10, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)) >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {calculateExpectedAfterNRounds(10, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)).toFixed(2)} lei
                      </p>
                    </div>
                    <div className="p-2 bg-white rounded-md shadow">
                      <p className="text-sm">După 100 runde:</p>
                      <p className={calculateExpectedAfterNRounds(100, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)) >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {calculateExpectedAfterNRounds(100, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)).toFixed(2)} lei
                      </p>
                    </div>
                    <div className="p-2 bg-white rounded-md shadow">
                      <p className="text-sm">După 1,000 runde:</p>
                      <p className={calculateExpectedAfterNRounds(1000, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)) >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {calculateExpectedAfterNRounds(1000, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)).toFixed(2)} lei
                      </p>
                    </div>
                    <div className="p-2 bg-white rounded-md shadow">
                      <p className="text-sm">După 10,000 runde:</p>
                      <p className={calculateExpectedAfterNRounds(10000, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)) >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {calculateExpectedAfterNRounds(10000, calculateExpectedValue(probability, betAmount * (expectedValue - 1), betAmount)).toFixed(2)} lei
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* House Edge */}
            <TabsContent value="house-edge" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slot-darkblue">Avantajul Cazinoului (House Edge)</h3>
                <p>
                  Avantajul cazinoului, sau "house edge", reprezintă avantajul matematic încorporat în fiecare joc de noroc, 
                  asigurând că, pe termen lung, cazinoul va genera profit.
                </p>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-200 my-4">
                  <h4 className="font-bold text-red-700 mb-2 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-1" />
                    RTP (Return to Player) vs. House Edge
                  </h4>
                  <p className="mb-2">
                    <strong>RTP (Return to Player):</strong> Procentul din total mizat care se întoarce teoretic la jucători.
                  </p>
                  <p>
                    <strong>House Edge:</strong> Procentul din mizele jucătorilor pe care cazinoul îl păstrează în medie.
                  </p>
                  <div className="bg-white p-3 rounded text-center mt-2">
                    <span className="font-mono">House Edge = 100% - RTP</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card className="shadow-sm">
                    <CardHeader className="bg-slot-gold text-slot-darkblue">
                      <CardTitle className="text-lg">Exemplu: Păcănele</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-1">
                          <span>RTP tipic:</span>
                          <span className="font-bold">90% - 95%</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span>House Edge:</span>
                          <span className="font-bold text-red-600">5% - 10%</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span>La fiecare 100 lei jucați:</span>
                          <span className="font-bold">Cazinoul câștigă 5-10 lei în medie</span>
                        </div>
                        <div className="flex justify-between">
                          <span>La fiecare 1000 de rotiri:</span>
                          <span className="font-bold">Pierderile sunt aproape garantate</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader className="bg-slot-gold text-slot-darkblue">
                      <CardTitle className="text-lg flex items-center">
                        <Coins className="h-5 w-5 mr-2" />
                        Impactul House Edge
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p>Să presupunem că un jucător joacă la păcănele cu:</p>
                      <ul className="list-disc pl-5 my-3 space-y-2">
                        <li>Miză: 1 leu per rotire</li>
                        <li>Viteză: 10 rotiri pe minut</li>
                        <li>RTP: 90% (house edge 10%)</li>
                      </ul>
                      
                      <div className="mt-4 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                          <span>Pierdere pe oră:</span>
                          <span className="font-bold text-red-600">
                            {(10 * 60 * 1 * 0.1).toFixed(0)} lei
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                          <span>Pierdere după 4 ore:</span>
                          <span className="font-bold text-red-600">
                            {(10 * 60 * 4 * 1 * 0.1).toFixed(0)} lei
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-semibold text-amber-800 mb-2">De ce nimeni nu poate câștiga pe termen lung:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Varianța este doar o iluzie:</strong> Deși pe termen scurt jucătorii pot câștiga datorită varianței, pe termen lung 
                      legea numerelor mari garantează că rezultatele vor converge spre valoarea așteptată negativă.
                    </li>
                    <li>
                      <strong>Eliminarea șansei:</strong> Cu cât joci mai mult, cu atât factorul "noroc" este mai puțin important, iar matematica pură devine dominantă.
                    </li>
                    <li>
                      <strong>Efectul compus:</strong> Pierderea procentuală constantă duce la scăderi exponențiale ale banilor pe termen lung.
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationSection;
