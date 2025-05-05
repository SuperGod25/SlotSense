
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizSection: React.FC = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<number[]>([]);

  // Quiz questions in Romanian
  const questions: QuizQuestion[] = [
    {
      question: "Ce reprezintă RTP (Return to Player) în jocurile de noroc?",
      options: [
        "Procentul din totalul mizat care se întoarce teoretic la jucători",
        "Procentul de jucători care câștigă",
        "Timpul mediu până la câștigul următor",
        "Numărul maxim de runde fără câștig"
      ],
      correctAnswer: 0,
      explanation: "RTP (Return to Player) reprezintă procentul din totalul sumelor mizate care se întoarce teoretic către jucători pe termen lung. De exemplu, un RTP de 95% înseamnă că, în medie, din 100 de lei mizați, jucătorii primesc înapoi 95 de lei."
    },
    {
      question: "De ce nu poate un jucător să câștige pe termen lung la păcănele?",
      options: [
        "Pentru că păcănelele sunt manipulate manual",
        "Deoarece Legea Numerelor Mari face ca rezultatele să se apropie de valoarea așteptată (negativă)",
        "Din cauza ghinonului persistent al jucătorilor",
        "Fiindcă jucătorii nu folosesc strategii potrivite"
      ],
      correctAnswer: 1,
      explanation: "Conform Legii Numerelor Mari, pe măsură ce numărul de rotiri crește, media rezultatelor se va apropia din ce în ce mai mult de valoarea așteptată teoretică. Deoarece RTP este întotdeauna sub 100% (de obicei 90-95%), valoarea așteptată este negativă, ceea ce înseamnă pierdere pentru jucător."
    },
    {
      question: "Ce este 'house edge' (avantajul cazinoului)?",
      options: [
        "Numărul maxim de jucători permiși în cazinou",
        "Procentul din totalul mizat pe care cazinoul îl păstrează în medie",
        "Diferența de înălțime dintre mese și păcănele",
        "Strategia cazinoului de a atrage clienți noi"
      ],
      correctAnswer: 1,
      explanation: "House edge reprezintă avantajul matematic pe care îl are cazinoul. Este calculat ca 100% - RTP. De exemplu, dacă un joc are un RTP de 95%, house edge este de 5%, ceea ce înseamnă că, în medie, din fiecare 100 lei mizați, cazinoul păstrează 5 lei."
    },
    {
      question: "Ce se întâmplă cu probabilitatea de a fi în profit după ce joci un număr foarte mare de runde?",
      options: [
        "Crește datorită experienței acumulate",
        "Rămâne constantă indiferent de numărul de runde",
        "Scade aproape de zero conform legilor probabilistice",
        "Depinde exclusiv de noroc"
      ],
      correctAnswer: 2,
      explanation: "Conform teoriei probabilităților, pe măsură ce numărul de runde jucate crește, șansa de a fi în profit scade dramatic, apropiindu-se de zero. Aceasta este consecința directă a Legii Numerelor Mari și a faptului că valoarea așteptată pentru fiecare rundă este negativă."
    },
    {
      question: "De ce pare că unii jucători câștigă constant la păcănele?",
      options: [
        "Ei folosesc strategii secrete care bat sistemul",
        "Ei observă doar câștigurile și ignoră pierderile (bias cognitiv)",
        "Păcănelele sunt programate să permită câștiguri ocazional",
        "Aceștia joacă doar în anumite momente 'norocoase'"
      ],
      correctAnswer: 1,
      explanation: "Acesta este un exemplu clasic de bias cognitiv. Jucătorii tind să își amintească și să povestească despre câștiguri (care sunt remarcabile), în timp ce minimizează sau uită pierderile frecvente (care sunt considerate normale). Acest fenomen se numește 'bias de confirmare' și 'eroare de disponibilitate' în psihologia cognitivă."
    },
    {
      question: "Ce este simularea Monte Carlo și cum se aplică la jocurile de noroc?",
      options: [
        "Un cazinou faimos din Monaco",
        "O metodă de analiză care folosește simulări repetate pentru a estima probabilități",
        "O strategie de joc pentru ruletă",
        "Un sistem de detectare a trisorilor"
      ],
      correctAnswer: 1,
      explanation: "Simularea Monte Carlo este o tehnică matematică care folosește eșantionare aleatorie repetată pentru a obține rezultate numerice. În contextul jocurilor de noroc, ne permite să simulăm mii sau milioane de runde pentru a vedea care sunt rezultatele probabile pe termen lung, demonstrând matematic că pierderile sunt inevitabile."
    },
    {
      question: "Care dintre următoarele afirmații despre 'șiruri norocoase' (streaks) este adevărată?",
      options: [
        "După o serie de pierderi, crește probabilitatea unui câștig",
        "După o serie de câștiguri, crește probabilitatea unui alt câștig",
        "Fiecare rundă este independentă, iar rezultatele anterioare nu influențează rundele viitoare",
        "Păcănelele sunt programate să ofere șiruri alternative de câștiguri și pierderi"
      ],
      correctAnswer: 2,
      explanation: "Aceasta este o ilustrare a 'erorii jucătorului' (gambler's fallacy). În jocurile de păcănele, fiecare rotire este un eveniment independent. Rezultatele anterioare nu influențează în niciun fel rezultatele viitoare. Un RNG (generator de numere aleatoare) determină fiecare rezultat separat."
    },
    {
      question: "Cum funcționează emotional un jackpot într-un joc de păcănele?",
      options: [
        "Este acordat aleatoriu, indiferent de pariurile anterioare",
        "Este programat să se declanșeze după un anumit număr de rotiri",
        "Servește ca stimulent psihologic pentru a menține interesul jucătorilor, în ciuda pierderilor regulate",
        "Este acordat jucătorilor care pierd cel mai mult, ca mecanism de compensare"
      ],
      correctAnswer: 2,
      explanation: "Jackpot-urile sunt concepute strategic ca stimulente psihologice. Ele creează un sentiment de anticipare și speranță, determinând jucătorii să continue să joace în ciuda pierderilor regulate. Din punct de vedere matematic, valoarea așteptată rămâne negativă chiar și considerând jackpot-urile, care sunt finanțate din pierderile colective ale jucătorilor."
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after showing explanation
    
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Răspuns corect!",
        description: "Felicitări! Ai ales răspunsul corect.",
        variant: "default",
      });
    } else {
      toast({
        title: "Răspuns greșit",
        description: "Ai ales răspunsul incorect. Citește explicația pentru a înțelege de ce.",
        variant: "destructive",
      });
    }
    
    setQuestionsAnswered([...questionsAnswered, currentQuestion]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      
      // Show final score toast
      toast({
        title: "Quiz complet!",
        description: `Scorul tău final: ${score}/${questions.length}`,
        variant: "default",
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuestionsAnswered([]);
  };

  const getProgressPercent = () => {
    return (questionsAnswered.length / questions.length) * 100;
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 90) {
      return "Excelent! Înțelegi foarte bine matematica din spatele jocurilor de noroc.";
    } else if (percentage >= 70) {
      return "Bine! Ai o înțelegere solidă a conceptelor matematice legate de jocurile de noroc.";
    } else if (percentage >= 50) {
      return "Acceptabil, dar ai putea aprofunda mai mult matematica din spatele jocurilor de noroc.";
    } else {
      return "Ar fi util să revizuiești conceptele matematice prezentate în secțiunea de teorie pentru a înțelege mai bine de ce câștigul pe termen lung este imposibil.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="shadow-lg max-w-3xl mx-auto">
        <CardHeader className="bg-slot-darkblue text-white">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <HelpCircle className="h-6 w-6" />
            Quiz: Poți învinge păcănelele?
          </CardTitle>
          <CardDescription className="text-gray-200">
            Testează-ți cunoștințele despre probabilități și jocuri de noroc
          </CardDescription>
        </CardHeader>
        
        {!quizCompleted ? (
          <>
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progres: {Math.round(getProgressPercent())}%</span>
                  <span>Întrebarea {currentQuestion + 1} din {questions.length}</span>
                </div>
                <Progress value={getProgressPercent()} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-slot-darkblue">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full p-3 text-left rounded-md border transition-all ${
                        selectedOption === index 
                          ? (index === questions[currentQuestion].correctAnswer 
                            ? 'bg-green-100 border-green-500 text-green-800' 
                            : 'bg-red-100 border-red-500 text-red-800')
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">
                          {showExplanation && selectedOption === index ? (
                            index === questions[currentQuestion].correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )
                          ) : (
                            <div className={`w-5 h-5 rounded-full border ${
                              selectedOption === index ? 'border-white' : 'border-gray-400'
                            }`}></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {showExplanation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-semibold text-slot-darkblue mb-2">Explicație:</h4>
                    <p>{questions[currentQuestion].explanation}</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="text-sm">
                Scor curent: {score}/{questionsAnswered.length}
              </div>
              {showExplanation && (
                <Button 
                  className="bg-slot-gold text-slot-darkblue hover:bg-yellow-500 font-semibold flex items-center gap-2"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion < questions.length - 1 ? 'Următoarea întrebare' : 'Finalizează quizul'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="gold-gradient inline-block p-1 rounded-full">
                <div className="bg-white rounded-full p-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-slot-darkblue">
                    {score}/{questions.length}
                  </h3>
                </div>
              </div>
              
              <h3 className="text-xl font-bold">Quiz finalizat!</h3>
              
              <div className="p-4 bg-gray-50 rounded-md text-left">
                <p className="font-medium">{getScoreMessage()}</p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left">
                <h4 className="font-semibold text-amber-800 mb-2">Concluzie importantă:</h4>
                <p>
                  Indiferent de cât de bine înțelegi matematica din spatele jocurilor de noroc, 
                  pe termen lung, legile probabilității dictează că nu poți învinge sistemul. 
                  RTP-ul sub 100% garantează că, în timp, casa va câștiga întotdeauna.
                </p>
              </div>
              
              <Button 
                className="mt-4 bg-slot-darkblue text-white hover:bg-blue-900"
                onClick={restartQuiz}
              >
                Încearcă din nou
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default QuizSection;
