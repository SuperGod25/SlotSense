import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartBar, Info, Repeat, Square } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SYMBOLS = ['🍒', '🍋', '🍇', '7️⃣', '⭐', '🔔', '🍀', '💰', '🎰'];
const WINNING_COMBINATIONS = [
  { symbols: ['🍒', '🍒', '🍒'], payout: 2 },
  { symbols: ['🍋', '🍋', '🍋'], payout: 3 },
  { symbols: ['🍇', '🍇', '🍇'], payout: 4 },
  { symbols: ['7️⃣', '7️⃣', '7️⃣'], payout: 10 },
  { symbols: ['⭐', '⭐', '⭐'], payout: 5 },
  { symbols: ['🔔', '🔔', '🔔'], payout: 6 },
  { symbols: ['🍀', '🍀', '🍀'], payout: 7 },
  { symbols: ['💰', '💰', '💰'], payout: 8 },
  { symbols: ['🎰', '🎰', '🎰'], payout: 15 },
];
const RTP = 0.95;

interface SpinResult {
  reels: string[][];
  win: number;
  isWin: boolean;
}
interface ChartDataPoint {
  spin: number;
  balance: number;
}

const SlotMachineSimulator: React.FC = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(100);
  const [stake, setStake] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(0);
  const [autoSpinTotal, setAutoSpinTotal] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isInfiniteAutoSpin, setIsInfiniteAutoSpin] = useState(false);
  const [totalSpins, setTotalSpins] = useState(0);
  const [netWinLoss, setNetWinLoss] = useState(0);
  const [startingBalance, setStartingBalance] = useState(100);
  const [reels, setReels] = useState<string[][]>([
    [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]],
    [SYMBOLS[3], SYMBOLS[4], SYMBOLS[5]],
    [SYMBOLS[6], SYMBOLS[7], SYMBOLS[8]]
  ]);
  const [lastWin, setLastWin] = useState(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([{ spin: 0, balance: 100 }]);
  const [showAwarenessMessage, setShowAwarenessMessage] = useState(false);
  const [awarenessMessage, setAwarenessMessage] = useState('');
  const [displaySummary, setDisplaySummary] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalSpins: 0,
    netResult: 0,
    biggestWin: 0,
    winCount: 0,
    lossCount: 0,
  });

  const autoSpinRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  const checkWin = (currentReels: string[][]) => {
    const combinations = [];
    for (let row = 0; row < 3; row++) {
      combinations.push([currentReels[0][row], currentReels[1][row], currentReels[2][row]]);
    }
    for (const combo of combinations) {
      for (const win of WINNING_COMBINATIONS) {
        if (combo.every((symbol, index) => symbol === win.symbols[index])) {
          return { win: win.payout * stake, isWin: true };
        }
      }
    }
    return { win: 0, isWin: false };
  };

  const simulateSpin = (): SpinResult => {
    const newReels: string[][] = [[], [], []];
    for (let reel = 0; reel < 3; reel++) {
      for (let pos = 0; pos < 3; pos++) {
        newReels[reel][pos] = getRandomSymbol();
      }
    }
    const { win, isWin } = checkWin(newReels);
    return { reels: newReels, win, isWin };
  };

  const handleSpin = () => {
    if (balance < stake || isSpinning) return;

    setIsSpinning(true);
    setLastWin(0);
    setBalance(prev => prev - stake);

    const animationFrames = 20;
    let frame = 0;

    const animateSpin = () => {
      const intermediateReels: string[][] = [[], [], []];
      for (let reel = 0; reel < 3; reel++) {
        for (let pos = 0; pos < 3; pos++) {
          intermediateReels[reel][pos] = getRandomSymbol();
        }
      }
      setReels(intermediateReels);
      frame++;
      if (frame < animationFrames) {
        setTimeout(animateSpin, 50);
      } else {
        const result = simulateSpin();
        setReels(result.reels);
        setLastWin(result.win);
        setBalance(prev => prev + result.win);
        setNetWinLoss(prev => prev + result.win - stake);
        setTotalSpins(prev => {
          const updatedSpins = prev + 1;
          setChartData(prevChart => [...prevChart, { spin: updatedSpins, balance: balance - stake + result.win }]);
          return updatedSpins;
        });
        setIsSpinning(false);
      }
    };
    animateSpin();
  };

  const startAutoSpin = (count: number) => {
    if (balance < stake || isSpinning || isAutoSpinning) return;
    setAutoSpinTotal(count);
    setAutoSpinCount(count);
    setIsAutoSpinning(true);
    setIsInfiniteAutoSpin(count === Infinity);
    autoSpinRef.current = setInterval(() => {
      if (balance < stake) {
        stopAutoSpin();
        return;
      }
      setAutoSpinCount(prev => {
        if (!isInfiniteAutoSpin && prev <= 1) {
          stopAutoSpin();
          return 0;
        }
        return isInfiniteAutoSpin ? prev : prev - 1;
      });
      handleSpin();
    }, 1800);
  };

  const stopAutoSpin = () => {
    if (autoSpinRef.current) {
      clearInterval(autoSpinRef.current);
      autoSpinRef.current = null;
    }
    setIsAutoSpinning(false);
    setIsInfiniteAutoSpin(false);
  };

  const closeSummary = () => {
    setDisplaySummary(false);
  };
  

  useEffect(() => {
    return () => {
      if (autoSpinRef.current) {
        clearInterval(autoSpinRef.current);
      }
    };
  }, []);

  // Keep the rest of your file exactly as it is (UI, JSX, rendering, etc.)


  const resetSimulation = () => {
    setBalance(100);
    setStartingBalance(100);
    setTotalSpins(0);
    setNetWinLoss(0);
    setChartData([{ spin: 0, balance: 100 }]);
    setLastWin(0);
    stopAutoSpin();
    setDisplaySummary(false);
    toast({ title: "Simulare resetată", description: "Toate valorile au fost readuse la starea inițială." });
  };

  const lossPercentage = ((startingBalance - balance) / startingBalance * 100).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slot Machine Display */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-slot-darkblue flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              Simulator Slot Machine
            </CardTitle>
            <CardDescription>
              Simulează jocul la păcănele pentru a înțelege matematica din spatele lor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Slot Machine Grid */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-1 mb-4">
                {[0, 1, 2].map(row => (
                  <div key={`slot-row-${row}`} className="flex flex-col">
                    {[0, 1, 2].map(col => (
                      <div 
                        key={`slot-${row}-${col}`}
                        className="flex items-center justify-center bg-white h-16 text-4xl rounded-sm border-2 border-yellow-500"
                      >
                        {reels[row][col]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Result Display */}
              <div className={`text-center py-2 font-bold text-xl ${lastWin > 0 ? 'text-green-400' : 'text-white'}`}>
                {lastWin > 0 ? `Câștig: ${lastWin.toFixed(2)} lei` : 'Niciun câștig'}
              </div>
            </div>
            
            {/* Balance and Controls */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500">Sold:</div>
                  <div className="text-2xl font-bold">{balance.toFixed(2)} lei</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Miză:</div>
                  <div className="text-2xl font-bold">{stake.toFixed(2)} lei
                  <div className="flex space-x-2 mt-2">
  <Button onClick={() => setStake(prev => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-700 text-white">-</Button>
  <Button onClick={() => setStake(prev => prev + 1)} className="px-3 py-1 bg-gray-700 text-white">+</Button>
</div>

                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-slot-darkblue hover:bg-blue-900 text-white mb-2"
                onClick={handleSpin}
                disabled={isSpinning || isAutoSpinning || balance < stake}
              >
                Joacă
              </Button>
              {isAutoSpinning && !isInfiniteAutoSpin && (
              <div className="text-center text-red-600 font-bold mt-2">
                Runde rămase: {autoSpinCount}
              </div>
              )}
              
              <div className="grid grid-cols-4 gap-2 mt-2">
                <Button 
                  className="bg-gray-700 hover:bg-gray-800 text-white text-sm"
                  onClick={() => startAutoSpin(10)}
                  disabled={isSpinning || isAutoSpinning || balance < stake}
                >
                  Auto 10
                </Button>
                <Button 
                  className="bg-gray-700 hover:bg-gray-800 text-white text-sm"
                  onClick={() => startAutoSpin(15)}
                  disabled={isSpinning || isAutoSpinning || balance < stake}
                >
                  Auto 15
                </Button>
                <Button 
                  className="bg-gray-700 hover:bg-gray-800 text-white text-sm"
                  onClick={() => startAutoSpin(20)}
                  disabled={isSpinning || isAutoSpinning || balance < stake}
                >
                  Auto 20
                </Button>
                <Button 
                  className="bg-gray-700 hover:bg-gray-800 text-white text-sm"
                  onClick={() => startAutoSpin(Infinity)}
                  disabled={isSpinning || isAutoSpinning || balance < stake}
                >
                  <Repeat className="h-4 w-4 mr-1" />
                  ∞
                </Button>
              </div>
              
              {isAutoSpinning && (
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                  onClick={stopAutoSpin}
                >
                  <Square className="h-4 w-4 mr-1" />
                  Stop Auto
                </Button>
              )}
            </div>
            
            {/* Statistics */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Statistici:</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div>RTP:</div>
                <div className="font-bold">{(RTP * 100).toFixed(0)}%</div>
                
                <div>Runde jucate:</div>
                <div className="font-bold">{totalSpins}</div>
                
                <div>Pierdere totală:</div>
                <div className={`font-bold ${netWinLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netWinLoss.toFixed(2)} lei ({lossPercentage}%)
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full border-2 border-slot-darkblue text-slot-darkblue hover:bg-gray-100"
              onClick={resetSimulation}
            >
              Resetează simularea
            </Button>
          </CardFooter>
        </Card>
        
        {/* Results visualization */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-slot-darkblue">Analiza Rezultatelor</CardTitle>
            <CardDescription>
              Vizualizare grafică a evoluției soldului în timp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="spin" 
                    label={{ value: 'Număr de runde', position: 'insideBottomRight', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Sold (lei)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} lei`, 'Sold']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    name="Sold" 
                    stroke={balance >= startingBalance ? "#1a237e" : "#d32f2f"} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Educational Information */}
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle>Matematica din spatele slot machines:</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Chiar dacă poți avea câștiguri ocazionale, pe termen lung, vei pierde întotdeauna din cauza RTP (Return to Player) care este sub 100%.
                </p>
                <p>
                  Cu un RTP de {(RTP * 100).toFixed(0)}%, pentru fiecare 100 lei jucați, vei primi înapoi, în medie, doar {(RTP * 100).toFixed(0)} lei. Diferența de {(100 - RTP * 100).toFixed(0)}% reprezintă profitul cazinoului.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
      
      {/* Awareness Message Overlay */}
      {showAwarenessMessage && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Știați că?</h3>
              <div className="mt-2 text-sm text-yellow-700">
                {awarenessMessage}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Session Summary Overlay */}
      {displaySummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-slot-darkblue mb-4">Rezumatul Sesiunii</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Runde jucate:</p>
                <p className="text-xl font-bold">{summaryData.totalSpins}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Rezultat final:</p>
                <p className={`text-xl font-bold ${summaryData.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summaryData.netResult.toFixed(2)} lei
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Runde câștigate:</p>
                  <p className="text-lg font-bold text-green-600">{summaryData.winCount}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Runde pierdute:</p>
                  <p className="text-lg font-bold text-red-600">{summaryData.lossCount}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm font-medium text-blue-800">Concluzie:</p>
                <p className="mt-1 text-blue-700">
                  Pe termen lung, indiferent de câștigurile ocazionale, slot machines sunt construite să returneze doar {(RTP * 100).toFixed(0)}% din banii jucați. Aceasta înseamnă că, statistic, vei pierde {(100 - RTP * 100).toFixed(0)}% din ce joci.
                </p>
              </div>
              
              <Button 
                className="w-full bg-slot-darkblue hover:bg-blue-900 text-white"
                onClick={closeSummary}
              >
                Înțeleg
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotMachineSimulator;
