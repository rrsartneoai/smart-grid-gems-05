
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const KnowledgePanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Analiza Jakości Powietrza - Terminologia i Wskaźniki</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="indicators" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="indicators">Wskaźniki Jakości Powietrza</TabsTrigger>
              <TabsTrigger value="aqi">Indeks AQI</TabsTrigger>
              <TabsTrigger value="glossary">Słowniczek Pojęć</TabsTrigger>
              <TabsTrigger value="methods">Metody Pomiarowe</TabsTrigger>
              <TabsTrigger value="prevention">Systemy Zapobiegania</TabsTrigger>
              <TabsTrigger value="standards">Standardy i Normy</TabsTrigger>
              <TabsTrigger value="units">Jednostki Miar</TabsTrigger>
              <TabsTrigger value="technical">Aspekty Techniczne</TabsTrigger>
            </TabsList>

            <TabsContent value="indicators">
              <h2 className="text-xl font-bold mb-4">Podstawowe Wskaźniki Jakości Powietrza</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Wskaźnik</TableHead>
                      <TableHead>Wartość Graniczna</TableHead>
                      <TableHead>Opis</TableHead>
                      <TableHead>Rozszerzone Wyjaśnienie</TableHead>
                      <TableHead>Potencjalne Źródła</TableHead>
                      <TableHead>Skutki Zdrowotne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>PM2.5</TableCell>
                      <TableCell>25 μg/m³ (średnia dobowa)</TableCell>
                      <TableCell>Cząstki o średnicy aerodynamicznej mniejszej niż 2.5 μm</TableCell>
                      <TableCell>Cząstki te, ze względu na swoje niewielkie rozmiary, mogą penetrować głęboko do płuc i krwiobiegu, wywołując różnorodne reakcje zapalne. Pomiar bazuje na wykorzystaniu metod światła rozproszonego lub absorpcji promieniowania beta promien i jest uwarunkowany warunkami atmosferycznymi.</TableCell>
                      <TableCell>Spalanie paliw (transport, przemysł), rolnictwo, pożary lasów, pyły budowlane.</TableCell>
                      <TableCell>Choroby układu oddechowego (astma, zapalenie oskrzeli), choroby sercowo-naczyniowe, zwiększone ryzyko raka płuc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PM10</TableCell>
                      <TableCell>50 μg/m³ (średnia dobowa)</TableCell>
                      <TableCell>Cząstki o średnicy aerodynamicznej mniejszej niż 10 μm</TableCell>
                      <TableCell>Reprezentuje sumę cząstek o różnej genezie, w tym pyłu pochodzenia naturalnego i antropogenicznego. Metody pomiarowe obejmują grawimetrię i techniki optyczne. Monitorowanie PM10 jest kluczowe dla oceny wpływu na zdrowie w aglomeracjach miejskich.</TableCell>
                      <TableCell>To samo co PM2.5, plus drogi gruntowe, aktywność budowlana, przemysł wydobywczy.</TableCell>
                      <TableCell>Podrażnienie dróg oddechowych, nasilenie objawów astmy, zapalenie oskrzeli, ograniczenie funkcji płuc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NO₂</TableCell>
                      <TableCell>200 μg/m³ (1 godzina)</TableCell>
                      <TableCell>Dwutlenek azotu</TableCell>
                      <TableCell>Gaz o silnych właściwościach drażniących, powstający głównie w procesach spalania paliw w wysokich temperaturach. Ma wpływ na powstawanie smogu fotochemicznego. Mierzy się go metodami spektrofotometrii UV lub chemiluminescencji.</TableCell>
                      <TableCell>Transport drogowy (silniki spalinowe), przemysł energetyczny, spalanie odpadów</TableCell>
                      <TableCell>Podrażnienie dróg oddechowych, nasilenie astmy, zwiększone ryzyko infekcji dróg oddechowych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>O₃</TableCell>
                      <TableCell>120 μg/m³ (8 godzin)</TableCell>
                      <TableCell>Ozon troposferyczny</TableCell>
                      <TableCell>Wtórny zanieczyszczenie, powstające w wyniku reakcji fotochemicznych z udziałem tlenków azotu i lotnych związków organicznych w obecności światła słonecznego. Pomiar realizowany jest metodami UV absorpcji.</TableCell>
                      <TableCell>Reakcje fotochemiczne (w obecności NOx i VOC), emisje VOC z przemysłu i transportu.</TableCell>
                      <TableCell>Podrażnienie oczu i dróg oddechowych, nasilenie astmy, trudności w oddychaniu.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SO₂</TableCell>
                      <TableCell>350 μg/m³ (1 godzina)</TableCell>
                      <TableCell>Dwutlenek siarki</TableCell>
                      <TableCell>Gaz drażniący, powstający głównie w wyniku spalania paliw zawierających siarkę. Pomiar obejmuje metody fluorescencji i UV absorpcji.</TableCell>
                      <TableCell>Przemysł energetyczny (spalanie węgla), przemysł metalurgiczny, wulkaniczna emisja.</TableCell>
                      <TableCell>Podrażnienie dróg oddechowych, kaszel, trudności w oddychaniu, zaostrzenie astmy.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CO</TableCell>
                      <TableCell>10 mg/m³ (8 godzin)</TableCell>
                      <TableCell>Tlenek węgla</TableCell>
                      <TableCell>Bezwonny, bezbarwny i toksyczny gaz, powstający w wyniku niepełnego spalania paliw. Pomiar bazuje na absorpcji w podczerwieni.</TableCell>
                      <TableCell>Spaliny samochodowe, ogrzewanie domowe (piecyki, kominki), pożary.</TableCell>
                      <TableCell>Ból głowy, zawroty głowy, nudności, osłabienie, w skrajnych przypadkach śmierć.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="aqi">
              <h2 className="text-xl font-bold mb-4">Indeks Jakości Powietrza (AQI)</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Poziom AQI</TableHead>
                      <TableHead>Zakres</TableHead>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Wpływ na Zdrowie</TableHead>
                      <TableHead>Zalecenia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="bg-green-100 dark:bg-green-900">Bardzo dobry</TableCell>
                      <TableCell>0-25</TableCell>
                      <TableCell>I</TableCell>
                      <TableCell>Brak zagrożenia dla zdrowia</TableCell>
                      <TableCell>Brak ograniczeń</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="bg-green-50 dark:bg-green-800">Dobry</TableCell>
                      <TableCell>26-50</TableCell>
                      <TableCell>II</TableCell>
                      <TableCell>Minimalne zagrożenie dla zdrowia</TableCell>
                      <TableCell>Brak ograniczeń</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="bg-yellow-100 dark:bg-yellow-900">Umiarkowany</TableCell>
                      <TableCell>51-75</TableCell>
                      <TableCell>III</TableCell>
                      <TableCell>Możliwy wpływ na osoby wrażliwe (dzieci, osoby starsze, osoby z chorobami układu oddechowego)</TableCell>
                      <TableCell>Ograniczenie aktywności na zewnątrz dla osób wrażliwych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="bg-orange-100 dark:bg-orange-900">Dostateczny</TableCell>
                      <TableCell>76-100</TableCell>
                      <TableCell>IV</TableCell>
                      <TableCell>Negatywny wpływ na osoby wrażliwe</TableCell>
                      <TableCell>Unikanie wysiłku na zewnątrz dla osób wrażliwych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="bg-red-100 dark:bg-red-900">Zły</TableCell>
                      <TableCell>101-150</TableCell>
                      <TableCell>V</TableCell>
                      <TableCell>Znaczący wpływ na zdrowie dla całej populacji</TableCell>
                      <TableCell>Unikanie aktywności na zewnątrz, osoby wrażliwe powinny pozostać w domu.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="bg-purple-100 dark:bg-purple-900">Bardzo zły</TableCell>
                      <TableCell>&gt;150</TableCell>
                      <TableCell>VI</TableCell>
                      <TableCell>Poważne zagrożenie dla zdrowia</TableCell>
                      <TableCell>Ograniczenie przebywania na zewnątrz, zamknięcie okien, osoby wrażliwe powinny pozostać w domu i unikać wysiłku.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="glossary">
              <h2 className="text-xl font-bold mb-4">Słowniczek Pojęć</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Wskaźniki i Parametry</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Termin</TableHead>
                        <TableHead>Definicja</TableHead>
                        <TableHead>Rozbudowana Definicja</TableHead>
                        <TableHead>Znaczenie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>PM (Particulate Matter)</TableCell>
                        <TableCell>Cząstki stałe zawieszone w powietrzu</TableCell>
                        <TableCell>Mieszanina cząstek stałych i ciekłych, zawieszonych w powietrzu o zróżnicowanej wielkości i pochodzeniu.</TableCell>
                        <TableCell>Kluczowy wskaźnik oceny ryzyka zdrowotnego, ze względu na zdolność penetracji układu oddechowego.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>AQI (Air Quality Index)</TableCell>
                        <TableCell>Indeks jakości powietrza - wskaźnik oceny jakości powietrza</TableCell>
                        <TableCell>Skalarny indeks, integrujący pomiary różnych zanieczyszczeń, umożliwiający łatwą interpretację jakości powietrza przez społeczeństwo.</TableCell>
                        <TableCell>Umożliwia uproszczoną komunikację ryzyka, wspierając podejmowanie decyzji przez osoby indywidualne i władze.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>VOC (Volatile Organic Compounds)</TableCell>
                        <TableCell>Lotne związki organiczne</TableCell>
                        <TableCell>Grupa związków organicznych, charakteryzujących się wysoką prężnością par w temperaturze pokojowej.</TableCell>
                        <TableCell>Uczestniczą w tworzeniu smogu fotochemicznego i mogą mieć bezpośredni wpływ toksyczny.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>NOx</TableCell>
                        <TableCell>Tlenki azotu (suma NO i NO₂)</TableCell>
                        <TableCell>Suma tlenku azotu (NO) i dwutlenku azotu (NO₂).</TableCell>
                        <TableCell>Prekursory powstawania smogu fotochemicznego i kwaśnych deszczy.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>AOT40</TableCell>
                        <TableCell>Wskaźnik narażenia roślin na ozon</TableCell>
                        <TableCell>Suma nadwyżek stężeń ozonu powyżej wartości progowej (40 ppb) w określonym okresie czasu.</TableCell>
                        <TableCell>Pozwala oszacować szkody dla roślinności spowodowane ekspozycją na ozon.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>BAT (Best Available Techniques)</TableCell>
                        <TableCell>Najlepsze dostępne techniki redukcji zanieczyszczeń</TableCell>
                        <TableCell>Techniki, oparte na aktualnym stanie wiedzy i praktyce, które prowadzą do jak najmniejszego obciążenia środowiska.</TableCell>
                        <TableCell>Kluczowy element polityki ochrony powietrza, przyczyniający się do minimalizacji emisji zanieczyszczeń z źródeł przemysłowych.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="methods">
              <h2 className="text-xl font-bold mb-4">Metody Pomiarowe</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metoda</TableHead>
                      <TableHead>Zastosowanie</TableHead>
                      <TableHead>Dokładność</TableHead>
                      <TableHead>Zasada Działania</TableHead>
                      <TableHead>Zalety</TableHead>
                      <TableHead>Wady</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Grawimetryczna</TableCell>
                      <TableCell>Pomiar stężenia pyłów zawieszonych</TableCell>
                      <TableCell>Wysoka</TableCell>
                      <TableCell>Ważenie ilości cząstek zebranych na filtrze w określonym czasie.</TableCell>
                      <TableCell>Precyzyjna i wiarygodna metoda referencyjna dla PM10 i PM2.5.</TableCell>
                      <TableCell>Długi czas pomiaru, brak możliwości ciągłego monitoringu.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chemiluminescencyjna</TableCell>
                      <TableCell>Pomiar tlenków azotu</TableCell>
                      <TableCell>Dobry</TableCell>
                      <TableCell>Reakcja NO z ozonem, generująca światło, którego intensywność jest proporcjonalna do stężenia NO.</TableCell>
                      <TableCell>Wysoka czułość i selektywność</TableCell>
                      <TableCell>Wymagana kalibracja i regularne czyszczenie.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>DOAS</TableCell>
                      <TableCell>Spektroskopia optyczna do pomiaru gazów</TableCell>
                      <TableCell>Bardzo dobra</TableCell>
                      <TableCell>Analiza absorpcji światła przez gazy na podstawie ich widm absorpcyjnych.</TableCell>
                      <TableCell>Możliwość jednoczesnego pomiaru wielu gazów, wysoka czułość.</TableCell>
                      <TableCell>Wysoki koszt, wrażliwość na warunki atmosferyczne.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beta-absorpcja</TableCell>
                      <TableCell>Ciągły pomiar stężenia pyłów</TableCell>
                      <TableCell>Dobry</TableCell>
                      <TableCell>Pomiar osłabienia wiązki promieniowania beta przechodzącej przez filtr zbierający pyły.</TableCell>
                      <TableCell>Szybki i ciągły pomiar.</TableCell>
                      <TableCell>Możliwość zafałszowania wyników przez wilgotność.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="prevention">
              <h2 className="text-xl font-bold mb-4">Systemy Zapobiegania</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System</TableHead>
                      <TableHead>Funkcja</TableHead>
                      <TableHead>Opis Działania</TableHead>
                      <TableHead>Efektywność</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>SEMS</TableCell>
                      <TableCell>System monitoringu emisji</TableCell>
                      <TableCell>Ciągły monitoring emisji zanieczyszczeń z przemysłu.</TableCell>
                      <TableCell>Umożliwia wczesne wykrywanie przekroczeń i kontrolę nad procesami produkcyjnymi.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ESP</TableCell>
                      <TableCell>Elektrofiltry do odpylania</TableCell>
                      <TableCell>Usuwanie pyłów z gazów odlotowych za pomocą pola elektrycznego.</TableCell>
                      <TableCell>Bardzo wysoka efektywność w usuwaniu pyłów, szerokie zastosowanie w przemyśle ciężkim.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SCR</TableCell>
                      <TableCell>Selektywna redukcja katalityczna NOx</TableCell>
                      <TableCell>Redukcja emisji tlenków azotu za pomocą katalizatora i amoniaku.</TableCell>
                      <TableCell>Wysoce efektywny sposób redukcji NOx, zwłaszcza w elektrowniach i elektrociepłowniach.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CEMS</TableCell>
                      <TableCell>Ciągły monitoring emisji</TableCell>
                      <TableCell>Ciągły pomiar i rejestracja emisji zanieczyszczeń z kominów przemysłowych.</TableCell>
                      <TableCell>Zapewnia wiarygodne dane na temat emisji, niezbędna baza do oceny i kontroli.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="standards">
              <h2 className="text-xl font-bold mb-4">Standardy i Normy</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li className="text-base">
                  <span className="font-semibold">PN-EN 12341</span> - Metoda pomiaru PM10 i PM2.5 - Określa metody referencyjne pomiaru stężeń PM10 i PM2.5, zapewniając porównywalność danych.
                </li>
                <li className="text-base">
                  <span className="font-semibold">ISO 7168-2</span> - Wymiana danych jakości powietrza - Definiuje formaty i protokoły wymiany danych dotyczących jakości powietrza, umożliwiając interoperacyjność systemów.
                </li>
                <li className="text-base">
                  <span className="font-semibold">EN 14211</span> - Pomiar stężenia NO₂ i NO - Określa wymagania dotyczące pomiaru stężeń dwutlenku azotu i tlenku azotu, w tym metody referencyjne i analizę jakości danych.
                </li>
                <li className="text-base">
                  <span className="font-semibold">EN 14212</span> - Pomiar stężenia SO₂ - Określa wymagania związane z pomiarem dwutlenku siarki, w tym metody i procedury pomiarowe.
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="units">
              <h2 className="text-xl font-bold mb-4">Jednostki Miar</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jednostka</TableHead>
                      <TableHead>Opis</TableHead>
                      <TableHead>Przeliczniki i Zastosowanie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>μg/m³</TableCell>
                      <TableCell>Mikrogramy na metr sześcienny</TableCell>
                      <TableCell>Masa zanieczyszczeń w jednostce objętości powietrza, powszechnie stosowana dla pyłów zawieszonych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ppm</TableCell>
                      <TableCell>Części na milion</TableCell>
                      <TableCell>Procent objętościowy zanieczyszczenia w powietrzu (1 ppm = 0.0001%). Stosowane dla gazów.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ppb</TableCell>
                      <TableCell>Części na miliard</TableCell>
                      <TableCell>Bardzo małe stężenia zanieczyszczeń gazowych (1 ppb = 0.001 ppm). Służy do pomiaru gazów w niskich stężeniach.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>mg/m³</TableCell>
                      <TableCell>Miligramy na metr sześcienny</TableCell>
                      <TableCell>Masa zanieczyszczeń w jednostce objętości powietrza, częste dla gazów.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="technical">
              <h2 className="text-xl font-bold mb-4">Aspekty Techniczne</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aspekt</TableHead>
                      <TableHead>Opis</TableHead>
                      <TableHead>Parametry Techniczne</TableHead>
                      <TableHead>Wyzwania Implementacji</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Systemy Pomiarowe</TableCell>
                      <TableCell>Zaawansowane systemy do monitorowania jakości powietrza</TableCell>
                      <TableCell>Dokładność: ±2%, Częstotliwość pomiarów: 1-60 min, Zakres pomiarowy, Metody Kalibracji</TableCell>
                      <TableCell>Konieczność regularnej kalibracji, zapewnienie niezawodności w różnych warunkach atmosferycznych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sieć Czujników</TableCell>
                      <TableCell>Rozproszona sieć czujników do zbierania danych</TableCell>
                      <TableCell>Gęstość: 1-5 km², Pokrycie: &gt;90% obszaru, Rodzaj czujników, Komunikacja</TableCell>
                      <TableCell>Zapewnienie zasilania i łączności w każdym punkcie pomiarowym, zarządzanie dużą ilością danych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Przetwarzanie Danych</TableCell>
                      <TableCell>Systemy analizy i przetwarzania danych pomiarowych</TableCell>
                      <TableCell>Opóźnienie: &lt;5s, Dostępność: &gt;99.9%, Algorytmy walidacji danych, Systemy bazodanowe</TableCell>
                      <TableCell>Zapewnienie bezpieczeństwa danych, integracja danych z różnych źródeł, skalowalność.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="resources">
          <AccordionTrigger className="text-lg font-semibold">Materiały Dodatkowe</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Raporty Europejskiej Agencji Środowiska (EEA) na temat jakości powietrza</li>
              <li>Wytyczne WHO dotyczące jakości powietrza</li>
              <li>Publikacje naukowe z zakresu wpływu jakości powietrza na zdrowie</li>
              <li>Platformy monitoringu jakości powietrza: GIOŚ, EEA, AirVisual</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
