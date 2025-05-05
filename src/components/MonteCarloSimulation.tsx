
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartBar, TrendingDown, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SimulationParams {
  rtp: number;
  stake: number;
  rounds: number;
}

interface SimulationResult {
  balance: number[];
  finalBalance: number;
  maxWin: number;
  maxLoss: number;
  roundsWon: number;
  roundsLost: number;
}

const MonteCarloSimulation: React.FC = () => {
  const { toast } = useToast();
  const [params, setParams] = useState<SimulationParams>({
    rtp: 90, // RTP as percentage (90%)
    stake: 1, // Default stake
    rounds: 100, // Default number of rounds
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<{ round: number; balance: number }[]>([]);
  const [savedSessions, setSavedSessions] = useState<{ id: number; params: SimulationParams; result: SimulationResult }[]>([]);

  useEffect(() => {
    if (result) {
      // Format data for recharts
      const data = result.balance.map((balance, index) => ({
        round: index,
        balance
      }));
      setChartData(data);
    }
  }, [result]);

  const runSimulation = () => {
    setIsLoading(true);
    
    // Simulate asynchronous calculation
    setTimeout(() => {
      const { rtp, stake, rounds } = params;
      const rtpDecimal = rtp / 100;
      
      let balance = 0;
      const balanceHistory = [0]; // Start at 0
      let maxWin = 0;
      let maxLoss = 0;
      let roundsWon = 0;
      let roundsLost = 0;
      
      // Run Monte Carlo simulation
      for (let i = 0; i < rounds; i++) {
        // Each round: player places a stake and gets a return based on RTP
        const cost = stake;
        
        // Calculate win/loss with randomness around the RTP
        // Sometimes win, sometimes lose, but long-term tends toward RTP
        const randomFactor = Math.random() * 2; // Random between 0 and 2
        const roundOutcome = cost * rtpDecimal * randomFactor;
        
        const netOutcome = roundOutcome - cost;
        
        if (netOutcome > 0) {
          roundsWon++;
          maxWin = Math.max(maxWin, netOutcome);
        } else {
          roundsLost++;
          maxLoss = Math.min(maxLoss, netOutcome);
        }
        
        balance += netOutcome;
        balanceHistory.push(balance);
      }
      
      const newResult: SimulationResult = {
        balance: balanceHistory,
        finalBalance: balance,
        maxWin,
        maxLoss,
        roundsWon,
        roundsLost,
      };
      
      setResult(newResult);
      setIsLoading(false);
      
      // Show toast notification
      toast({
        title: "Simulare completată",
        description: `Balanță finală: ${balance.toFixed(2)} lei`,
      });
    }, 1000); // Simulate 1 second calculation time
  };

  const saveSession = () => {
    if (result) {
      const newSession = {
        id: Date.now(),
        params: { ...params },
        result: { ...result }
      };
      
      setSavedSessions([...savedSessions, newSession]);
      
      toast({
        title: "Sesiune salvată",
        description: "Sesiunea de simulare a fost salvată cu succes.",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return `${value.toFixed(2)} lei`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation controls */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-slot-darkblue flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              Parametri Simulare
            </CardTitle>
            <CardDescription>
              Ajustați parametrii pentru simularea Monte Carlo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rtp">RTP (Return to Player): {params.rtp}%</Label>
              </div>
              <Slider
                id="rtp"
                min={80}
                max={99}
                step={1}
                value={[params.rtp]}
                onValueChange={(values) => setParams({ ...params, rtp: values[0] })}
                className="mb-4"
              />
              <div className="text-sm text-muted-foreground">
                RTP reprezintă procentul din mizele totale care sunt returnate jucătorilor în timp
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stake">Miză per rundă (lei)</Label>
              <Input
                id="stake"
                type="number"
                min={0.1}
                step={0.1}
                value={params.stake}
                onChange={(e) => setParams({ ...params, stake: parseFloat(e.target.value) || 0 })}
                className="slot-input"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rounds">Număr de runde: {params.rounds}</Label>
              </div>
              <Slider
                id="rounds"
                min={10}
                max={1000}
                step={10}
                value={[params.rounds]}
                onValueChange={(values) => setParams({ ...params, rounds: values[0] })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-slot-darkblue hover:bg-blue-900 text-white"
              onClick={runSimulation}
              disabled={isLoading}
            >
              {isLoading ? 'Se rulează...' : 'Rulează simularea'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Results visualization */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-slot-darkblue">Rezultatele Simulării</CardTitle>
            <CardDescription>
              Vizualizare grafică a rezultatelor simulării Monte Carlo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="round" 
                        label={{ value: 'Runde', position: 'insideBottomRight', offset: -5 }} 
                      />
                      <YAxis 
                        label={{ value: 'Balanță (lei)', angle: -90, position: 'insideLeft' }} 
                      />
                      <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} lei`, 'Balanță']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        name="Balanță" 
                        stroke={result.finalBalance >= 0 ? "#1a237e" : "#d32f2f"} 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className={`flex items-center p-3 rounded-md ${result.finalBalance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    {result.finalBalance >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <div>
                      <div className="font-medium">Balanță finală:</div>
                      <div className={`text-xl font-bold ${result.finalBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {formatCurrency(result.finalBalance)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="font-medium">Statistici:</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>Runde câștigate:</div>
                      <div className="font-bold text-green-600">{result.roundsWon}</div>
                      
                      <div>Runde pierdute:</div>
                      <div className="font-bold text-red-600">{result.roundsLost}</div>
                      
                      <div>Câștig maxim:</div>
                      <div className="font-bold text-green-600">{formatCurrency(result.maxWin)}</div>
                      
                      <div>Pierdere maximă:</div>
                      <div className="font-bold text-red-600">{formatCurrency(result.maxLoss)}</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-64 md:h-80 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                <ChartBar className="h-16 w-16 mb-2" />
                <p className="text-lg text-center">Rulați simularea pentru a vedea rezultatele</p>
                <p className="text-sm text-center mt-2">Simularea Monte Carlo vă arată ce se întâmplă când jucați la păcănele pe termen lung</p>
              </div>
            )}
          </CardContent>
          {result && (
            <CardFooter>
              <Button
                className="w-full bg-slot-gold text-slot-darkblue font-bold hover:bg-yellow-500"
                onClick={saveSession}
              >
                Salvează această sesiune
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Saved sessions */}
      {savedSessions.length > 0 && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-slot-darkblue">Sesiuni salvate</CardTitle>
            <CardDescription>
              Comparați rezultatele diferitelor simulări
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slot-darkblue text-white">
                    <th className="p-2 text-left">ID Sesiune</th>
                    <th className="p-2 text-left">RTP</th>
                    <th className="p-2 text-left">Miză</th>
                    <th className="p-2 text-left">Runde</th>
                    <th className="p-2 text-left">Balanță Finală</th>
                    <th className="p-2 text-left">Runde Câștigate</th>
                    <th className="p-2 text-left">Runde Pierdute</th>
                  </tr>
                </thead>
                <tbody>
                  {savedSessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{session.id.toString().slice(-4)}</td>
                      <td className="p-2">{session.params.rtp}%</td>
                      <td className="p-2">{session.params.stake} lei</td>
                      <td className="p-2">{session.params.rounds}</td>
                      <td className={`p-2 font-bold ${session.result.finalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(session.result.finalBalance)}
                      </td>
                      <td className="p-2 text-green-600">{session.result.roundsWon}</td>
                      <td className="p-2 text-red-600">{session.result.roundsLost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MonteCarloSimulation;
