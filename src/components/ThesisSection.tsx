
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, BookOpen, CoinsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';


const ThesisSection: React.FC = () => {
  const [showPdfModal, setShowPdfModal] = React.useState(false);
  const [showAuthorModal, setShowAuthorModal] = React.useState(false);


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
                setShowAuthorModal(true)}
              }
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

{showAuthorModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button
        onClick={() => setShowAuthorModal(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
      >
        ✖
      </button>
      <div className="text-center">
        <img
          src="/author_profile.jpg" // <-- Add your profile picture here
          alt="Author"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">Sebastian Filipovici</h2>
        <p className="mb-4 text-sm text-gray-600">Contactează-mă pe rețelele sociale:</p>
        <div className="flex justify-center gap-4">
        <a href="mailto:sebastian.filipovici@stud.ubbcluj.ro" className="text-slot-darkblue hover:text-blue-700">
        <Mail className="w-6 h-6" />
        </a>
          <a href="https://instagram.com/filipovici_" target="_blank" rel="noopener noreferrer">
            <img alt="Instagram" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxyYWRpYWxHcmFkaWVudCBpZD0ieU9ybm5obGlDcmRTMmd5fjR0RDhtYSIgY3g9IjE5LjM4IiBjeT0iNDIuMDM1IiByPSI0NC44OTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZDUiLz48c3RvcCBvZmZzZXQ9Ii4zMjgiIHN0b3AtY29sb3I9IiNmZjU0M2YiLz48c3RvcCBvZmZzZXQ9Ii4zNDgiIHN0b3AtY29sb3I9IiNmYzUyNDUiLz48c3RvcCBvZmZzZXQ9Ii41MDQiIHN0b3AtY29sb3I9IiNlNjQ3NzEiLz48c3RvcCBvZmZzZXQ9Ii42NDMiIHN0b3AtY29sb3I9IiNkNTNlOTEiLz48c3RvcCBvZmZzZXQ9Ii43NjEiIHN0b3AtY29sb3I9IiNjYzM5YTQiLz48c3RvcCBvZmZzZXQ9Ii44NDEiIHN0b3AtY29sb3I9IiNjODM3YWIiLz48L3JhZGlhbEdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjeU9ybm5obGlDcmRTMmd5fjR0RDhtYSkiIGQ9Ik0zNC4wMTcsNDEuOTlsLTIwLDAuMDE5Yy00LjQsMC4wMDQtOC4wMDMtMy41OTItOC4wMDgtNy45OTJsLTAuMDE5LTIwCWMtMC4wMDQtNC40LDMuNTkyLTguMDAzLDcuOTkyLTguMDA4bDIwLTAuMDE5YzQuNC0wLjAwNCw4LjAwMywzLjU5Miw4LjAwOCw3Ljk5MmwwLjAxOSwyMAlDNDIuMDE0LDM4LjM4MywzOC40MTcsNDEuOTg2LDM0LjAxNyw0MS45OXoiLz48cmFkaWFsR3JhZGllbnQgaWQ9InlPcm5uaGxpQ3JkUzJneX40dEQ4bWIiIGN4PSIxMS43ODYiIGN5PSI1LjU0IiByPSIyOS44MTMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLjY2NjMgMCAxLjg0OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTY4YzkiLz48c3RvcCBvZmZzZXQ9Ii45OTkiIHN0b3AtY29sb3I9IiM0MTY4YzkiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN5T3JubmhsaUNyZFMyZ3l+NHREOG1iKSIgZD0iTTM0LjAxNyw0MS45OWwtMjAsMC4wMTljLTQuNCwwLjAwNC04LjAwMy0zLjU5Mi04LjAwOC03Ljk5MmwtMC4wMTktMjAJYy0wLjAwNC00LjQsMy41OTItOC4wMDMsNy45OTItOC4wMDhsMjAtMC4wMTljNC40LTAuMDA0LDguMDAzLDMuNTkyLDguMDA4LDcuOTkybDAuMDE5LDIwCUM0Mi4wMTQsMzguMzgzLDM4LjQxNyw0MS45ODYsMzQuMDE3LDQxLjk5eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNCwzMWMtMy44NTksMC03LTMuMTQtNy03czMuMTQxLTcsNy03czcsMy4xNCw3LDdTMjcuODU5LDMxLDI0LDMxeiBNMjQsMTljLTIuNzU3LDAtNSwyLjI0My01LDUJczIuMjQzLDUsNSw1czUtMi4yNDMsNS01UzI2Ljc1NywxOSwyNCwxOXoiLz48Y2lyY2xlIGN4PSIzMS41IiBjeT0iMTYuNSIgcj0iMS41IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMwLDM3SDE4Yy0zLjg1OSwwLTctMy4xNC03LTdWMThjMC0zLjg2LDMuMTQxLTcsNy03aDEyYzMuODU5LDAsNywzLjE0LDcsN3YxMglDMzcsMzMuODYsMzMuODU5LDM3LDMwLDM3eiBNMTgsMTNjLTIuNzU3LDAtNSwyLjI0My01LDV2MTJjMCwyLjc1NywyLjI0Myw1LDUsNWgxMmMyLjc1NywwLDUtMi4yNDMsNS01VjE4YzAtMi43NTctMi4yNDMtNS01LTVIMTh6Ii8+PC9zdmc+" className="w-6 h-6" />
          </a>
          <a href="https://facebook.com/seby.filipovici" target="_blank" rel="noopener noreferrer">
          <img alt="Facebook" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMzRjUxQjUiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNVYzN3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMzQuMzY4LDI1SDMxdjEzaC01VjI1aC0zdi00aDN2LTIuNDFjMC4wMDItMy41MDgsMS40NTktNS41OSw1LjU5Mi01LjU5SDM1djRoLTIuMjg3QzMxLjEwNCwxNywzMSwxNy42LDMxLDE4LjcyM1YyMWg0TDM0LjM2OCwyNXoiLz48L3N2Zz4=" className="w-6 h-6" />
          </a>
          <a href="https://github.com/supergod25" target="_blank" rel="noopener noreferrer">
          <img alt="Github" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPiAgICA8cGF0aCBkPSJNMTcuNzkxLDQ2LjgzNkMxOC41MDIsNDYuNTMsMTksNDUuODIzLDE5LDQ1di01LjRjMC0wLjE5NywwLjAxNi0wLjQwMiwwLjA0MS0wLjYxQzE5LjAyNywzOC45OTQsMTkuMDE0LDM4Ljk5NywxOSwzOSBjMCwwLTMsMC0zLjYsMGMtMS41LDAtMi44LTAuNi0zLjQtMS44Yy0wLjctMS4zLTEtMy41LTIuOC00LjdDOC45LDMyLjMsOS4xLDMyLDkuNywzMmMwLjYsMC4xLDEuOSwwLjksMi43LDJjMC45LDEuMSwxLjgsMiwzLjQsMiBjMi40ODcsMCwzLjgyLTAuMTI1LDQuNjIyLTAuNTU1QzIxLjM1NiwzNC4wNTYsMjIuNjQ5LDMzLDI0LDMzdi0wLjAyNWMtNS42NjgtMC4xODItOS4yODktMi4wNjYtMTAuOTc1LTQuOTc1IGMtMy42NjUsMC4wNDItNi44NTYsMC40MDUtOC42NzcsMC43MDdjLTAuMDU4LTAuMzI3LTAuMTA4LTAuNjU2LTAuMTUxLTAuOTg3YzEuNzk3LTAuMjk2LDQuODQzLTAuNjQ3LDguMzQ1LTAuNzE0IGMtMC4xMTItMC4yNzYtMC4yMDktMC41NTktMC4yOTEtMC44NDljLTMuNTExLTAuMTc4LTYuNTQxLTAuMDM5LTguMTg3LDAuMDk3Yy0wLjAyLTAuMzMyLTAuMDQ3LTAuNjYzLTAuMDUxLTAuOTk5IGMxLjY0OS0wLjEzNSw0LjU5Ny0wLjI3LDguMDE4LTAuMTExYy0wLjA3OS0wLjUtMC4xMy0xLjAxMS0wLjEzLTEuNTQzYzAtMS43LDAuNi0zLjUsMS43LTVjLTAuNS0xLjctMS4yLTUuMywwLjItNi42IGMyLjcsMCw0LjYsMS4zLDUuNSwyLjFDMjEsMTMuNCwyMi45LDEzLDI1LDEzczQsMC40LDUuNiwxLjFjMC45LTAuOCwyLjgtMi4xLDUuNS0yLjFjMS41LDEuNCwwLjcsNSwwLjIsNi42YzEuMSwxLjUsMS43LDMuMiwxLjYsNSBjMCwwLjQ4NC0wLjA0NSwwLjk1MS0wLjExLDEuNDA5YzMuNDk5LTAuMTcyLDYuNTI3LTAuMDM0LDguMjA0LDAuMTAyYy0wLjAwMiwwLjMzNy0wLjAzMywwLjY2Ni0wLjA1MSwwLjk5OSBjLTEuNjcxLTAuMTM4LTQuNzc1LTAuMjgtOC4zNTktMC4wODljLTAuMDg5LDAuMzM2LTAuMTk3LDAuNjYzLTAuMzI1LDAuOThjMy41NDYsMC4wNDYsNi42NjUsMC4zODksOC41NDgsMC42ODkgYy0wLjA0MywwLjMzMi0wLjA5MywwLjY2MS0wLjE1MSwwLjk4N2MtMS45MTItMC4zMDYtNS4xNzEtMC42NjQtOC44NzktMC42ODJDMzUuMTEyLDMwLjg3MywzMS41NTcsMzIuNzUsMjYsMzIuOTY5VjMzIGMyLjYsMCw1LDMuOSw1LDYuNlY0NWMwLDAuODIzLDAuNDk4LDEuNTMsMS4yMDksMS44MzZDNDEuMzcsNDMuODA0LDQ4LDM1LjE2NCw0OCwyNUM0OCwxMi4zMTgsMzcuNjgzLDIsMjUsMlMyLDEyLjMxOCwyLDI1IEMyLDM1LjE2NCw4LjYzLDQzLjgwNCwxNy43OTEsNDYuODM2eiIvPjwvc3ZnPg==" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ThesisSection;
