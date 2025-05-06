
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, BookOpen, CoinsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ThesisSection: React.FC = () => {
  const [showPdfModal, setShowPdfModal] = React.useState(false);

  const { toast } = useToast();
  
  const handleDownloadClick = () => {
    toast({
      title: "Descărcare inițiată",
      description: "Teza se va descărca în curând.",
    });
    
    // Note: In a real application, this would point to an actual PDF file
    // For this demo, it's just a placeholder action
    setTimeout(() => {
      toast({
        title: "Notă",
        description: "Aceasta este o aplicație demonstrativă. Într-o implementare reală, aici s-ar descărca un PDF.",
      });
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-slot-darkblue text-white">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <FileText className="h-6 w-6" />
              Teză de Licență: Modelarea Probabilistică a Pierderilor în Jocurile de Noroc de tip Slots
            </CardTitle>
            <CardDescription className="text-gray-200">
              Analiză matematică riguroasă a jocurilor de noroc
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center md:w-1/3">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-slot-darkblue mb-2" />
                    <div className="text-sm text-gray-500">Teză Academică</div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-3 text-slot-darkblue">Rezumatul tezei</h3>
                  <p className="mb-3">
                    Această teză analizează principiile matematice implicate în jocurile de noroc de tip slot-machine (păcănele), 
                    folosind teoria probabilităților, statistica matematică și simulări Monte Carlo.
                  </p>
                  <p className="mb-3">
                    Cercetarea demonstrează, atât prin teoreme teoretice cât și prin dovezi empirice, de ce jucătorii sunt 
                    condamnați statistic să piardă pe termen lung.
                  </p>
                  <p>
                    Studiul combină teoreme tradiționale, exemple tangibile și simulări computerizate numerice 
                    pentru a educa și sensibiliza publicul cu privire la riscurile jocurilor de noroc.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-slot-darkblue" />
                      Conținut
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Modele probabilistice ale jocurilor de noroc</li>
                      <li>Legea Numerelor Mari și aplicații</li>
                      <li>Analiza statistică a rezultatelor</li>
                      <li>Simulări Monte Carlo și vizualizări</li>
                      <li>Implicații pentru jucători</li>
                      <li>Concluzii matematice</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CoinsIcon className="h-5 w-5 text-slot-darkblue" />
                      Concluzii principale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>RTP-ul sub 100% garantează pierderi pe termen lung</li>
                      <li>Legea Numerelor Mari elimină factorul "noroc"</li>
                      <li>Variația pe termen scurt creează iluzia posibilului câștig</li>
                      <li>Strategiile de joc nu pot depăși dezavantajul matematic</li>
                      <li>Efectul compus amplifica pierderile in timp</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Citește teza completă</h3>
                <p className="mb-4">
                  Pentru o analiză mai aprofundată a modelelor matematice și demonstrațiilor riguroase, 
                  descarcă sau vizualizează teza completă.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleDownloadClick}
                    className="bg-slot-darkblue hover:bg-blue-900 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <a 
  href="/Licenta_Filipovici_Sebastian.pdf" 
  download 
  className=" hover:text-blue-800"
>
  Download(PDF)
</a>

                  </Button>
                  
                  <Button
  variant="outline"
  className="border-slot-darkblue text-slot-darkblue hover:bg-blue-50 flex items-center gap-2"
  onClick={() => setShowPdfModal(true)}
>
  <ExternalLink className="h-4 w-4" />
  Vizualizează online
</Button>

                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-3">
            
            <Button
              variant="link"
              className="text-slot-darkblue"
              onClick={() => {
                toast({
                  title: "Mulțumiri",
                  description: "Mulțumim pentru interesul acordat acestei cercetări academice.",
                });
              }}
            >
              Contactează autorul
            </Button>
          </CardFooter>
        </Card>
      </div>
      {showPdfModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Vizualizare Teză</h2>
        <button 
          onClick={() => setShowPdfModal(false)} 
          className="text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
      </div>
      <div className="p-4" style={{ height: '80vh' }}>
        <iframe 
          src="/Licenta_Filipovici_Sebastian.pdf" 
          title="Teză Licență"
          className="w-full h-full"
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ThesisSection;
