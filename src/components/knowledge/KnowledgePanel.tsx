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
            <h3 className="text-lg font-medium mb-2">Jakość energii</h3>
            <p className="text-muted-foreground">
              Jakość energii elektrycznej określa się poprzez stabilność napięcia,
              częstotliwość oraz brak zakłóceń w sieci.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Efektywność energetyczna</h3>
            <p className="text-muted-foreground">
              To stosunek uzyskanej energii użytecznej do energii dostarczonej.
              Im wyższa efektywność, tym mniejsze straty energii.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};