import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const KnowledgePanel = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Kompendium wiedzy</h2>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">Podstawy energetyki</h3>
            <p className="text-muted-foreground">
              Energia elektryczna jest mierzona w kilowatogodzinach (kWh). 
              1 kWh to ilość energii, jaką zużywa urządzenie o mocy 1000 watów pracujące przez godzinę.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Nomenklatura</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Skrót</th>
                    <th className="text-left py-2 px-4">Rozwinięcie</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">AI</td>
                    <td className="py-2 px-4">Sztuczna inteligencja</td>
                    <td className="py-2 px-4">Dziedzina informatyki zajmująca się tworzeniem inteligentnych systemów.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">ACO</td>
                    <td className="py-2 px-4">Optymalizacja kolonii mrówek</td>
                    <td className="py-2 px-4">Algorytm optymalizacji inspirowany zachowaniem mrówek w poszukiwaniu pożywienia.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">ABC</td>
                    <td className="py-2 px-4">Algorytm sztucznej pszczoły</td>
                    <td className="py-2 px-4">Algorytm optymalizacji inspirowany poszukiwaniem miodu przez pszczoły.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">AEP</td>
                    <td className="py-2 px-4">Roczna produkcja energii</td>
                    <td className="py-2 px-4">Całkowita ilość energii wyprodukowanej w ciągu roku.</td>
                  </tr>
                  {/* Add all other abbreviations similarly */}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Stałe i zmienne</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Symbol</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">A</td>
                    <td className="py-2 px-4">Przewodność cieplna w ogólności (kW/°F)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Cpv</td>
                    <td className="py-2 px-4">Całkowita powierzchnia naświetlenia paneli PV (m²)</td>
                  </tr>
                  {/* Add all other constants similarly */}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Zmienne</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Zmienna</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">at</td>
                    <td className="py-2 px-4">Wskaźnik przybycia do kolejki Qt (kW)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Bt</td>
                    <td className="py-2 px-4">Koszt zakupu energii elektrycznej (RMB/kWh)</td>
                  </tr>
                  {/* Add all other variables similarly */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};