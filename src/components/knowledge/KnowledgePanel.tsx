
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
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="indicators">Wskaźniki Jakości Powietrza</TabsTrigger>
              <TabsTrigger value="aqi">Indeks AQI</TabsTrigger>
              <TabsTrigger value="glossary">Słowniczek Pojęć</TabsTrigger>
              <TabsTrigger value="methods">Metody Pomiarowe</TabsTrigger>
              <TabsTrigger value="prevention">Systemy Zapobiegania</TabsTrigger>
              <TabsTrigger value="standards">Standardy i Normy</TabsTrigger>
              <TabsTrigger value="units">Jednostki Miar</TabsTrigger>
              <TabsTrigger value="technical">Aspekty Techniczne</TabsTrigger>
              <TabsTrigger value="economic">Aspekty Ekonomiczne</TabsTrigger>
              <TabsTrigger value="regulatory">Ramy Regulacyjne</TabsTrigger>
              <TabsTrigger value="social">Implikacje Społeczne</TabsTrigger>
              <TabsTrigger value="risk">Analiza Ryzyka i Szans</TabsTrigger>
              <TabsTrigger value="best-practices">Najlepsze Praktyki</TabsTrigger>
              <TabsTrigger value="case-studies">Studia Przypadków</TabsTrigger>
              <TabsTrigger value="metrics">Metryki Wydajności</TabsTrigger>
              <TabsTrigger value="architecture">Architektura Sieci</TabsTrigger>
              <TabsTrigger value="implementation">Wytyczne Wdrożeniowe</TabsTrigger>
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

            {/* New tabs added based on user request */}
            <TabsContent value="economic">
              <h2 className="text-xl font-bold mb-4">Aspekty Ekonomiczne</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Wartość</TableHead>
                      <TableHead>Uwagi</TableHead>
                      <TableHead>Czynniki Wpływające na Koszty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Koszty Instalacji</TableCell>
                      <TableCell>5000-15000 PLN/stację</TableCell>
                      <TableCell>Zależne od typu i liczby czujników, lokalizations, złożoności technicznej, dostawcy</TableCell>
                      <TableCell>Rodzaj czujników, koszty robocizny, koszty infrastruktury, lokalizacja</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Koszty Utrzymania</TableCell>
                      <TableCell>500-1500 PLN/miesiąc</TableCell>
                      <TableCell>Obejmuje kalibrację i serwis, wymianę części, oprogramowanie, koszty komunikacji. Zależy od ilości stacji, jakości powietrza, intensywności eksploatacji.</TableCell>
                      <TableCell>Częstotliwość kalibracji, zakres serwisu, dostępność części zamiennych, koszty energii.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zwrot z Inwestycji</TableCell>
                      <TableCell>2-4 lata</TableCell>
                      <TableCell>Przy optymalnym wykorzystaniu danych, poprawie jakości powietrza, redukcji kosztów zdrowotnych i społecznych. Zależy od zdefiniowanych celów i założeń, stopnia wykorzystania danych.</TableCell>
                      <TableCell>Efektywność systemu, świadomość społeczna, wsparcie ze strony władz.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="regulatory">
              <h2 className="text-xl font-bold mb-4">Ramy Regulacyjne</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Regulacja</TableHead>
                      <TableHead>Zakres</TableHead>
                      <TableHead>Wymagania</TableHead>
                      <TableHead>Cel Regulacji</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Dyrektywa UE 2008/50/WE</TableCell>
                      <TableCell>Jakość powietrza</TableCell>
                      <TableCell>Standardy pomiarowe, raportowanie, cele jakości powietrza, ocena i zarządzanie jakością powietrza.</TableCell>
                      <TableCell>Ochrona zdrowia ludzkiego i środowiska.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Norma PN-EN 14211</TableCell>
                      <TableCell>Pomiary NO₂</TableCell>
                      <TableCell>Metodologia, dokładność, Procedura pomiaru i kontroli jakości danych z pomiarów NO₂.</TableCell>
                      <TableCell>Zapewnienie wiarygodności i porównywalności danych pomiarowych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ISO 7168-2</TableCell>
                      <TableCell>Wymiana danych</TableCell>
                      <TableCell>Formaty, protokoły, Specyfikacja formatów wymiany danych, procedury transmisji danych.</TableCell>
                      <TableCell>Umożliwienie wymiany danych między różnymi systemami i organizacjami.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="social">
              <h2 className="text-xl font-bold mb-4">Implikacje Społeczne</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aspekt</TableHead>
                      <TableHead>Wpływ</TableHead>
                      <TableHead>Działania</TableHead>
                      <TableHead>Mierniki Sukcesu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Świadomość Publiczna</TableCell>
                      <TableCell>Wysoki</TableCell>
                      <TableCell>Edukacja, dostęp do danych, Kampanie informacyjne, zapewnienie przejrzystości danych.</TableCell>
                      <TableCell>Wzrost zainteresowania jakością powietrza, częstszą interakcje z platformami monitoringu.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zdrowie Publiczne</TableCell>
                      <TableCell>Znaczący</TableCell>
                      <TableCell>Systemy ostrzegania, rekomendacje, Wdrażanie programów profilaktycznych, poprawa dostępności informacji o zagrożeniach.</TableCell>
                      <TableCell>Skuteczność systemów ostrzegania (redukcja ekspozycji na zanieczyszczenia), redukcja zachorowalności na choroby związane z zanieczyszczeniem powietrza.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Partycypacja Społeczna</TableCell>
                      <TableCell>Średni</TableCell>
                      <TableCell>Platformy zgłaszania, konsultacje, Zachęcanie do udziału w konsultacjach, rozwój narzędzi do raportowania, forum dyskusyjne.</TableCell>
                      <TableCell>Liczba aktywnych użytkowników platform, liczba zgłoszeń, liczba opinii i komentarzy.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="risk">
              <h2 className="text-xl font-bold mb-4">Analiza Ryzyka i Szans</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Opis</TableHead>
                      <TableHead>Priorytet</TableHead>
                      <TableHead>Strategia Zarządzania</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Ryzyko Techniczne</TableCell>
                      <TableCell>Awarie systemów, błędy pomiarowe, utrata danych, nieprawidłowe funkcjonowanie czujników.</TableCell>
                      <TableCell>Wysoki</TableCell>
                      <TableCell>Regularna konserwacja, redundancja systemów, ciągła kontrola jakości, szkolenia personelu, wdrożenie procesów kalibracji.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ryzyko Operacyjne</TableCell>
                      <TableCell>Problemy z utrzymaniem, wandalizm, nieodpowiednia infrastruktura, brak zasobów.</TableCell>
                      <TableCell>Średni</TableCell>
                      <TableCell>Planowanie konserwacji, zabezpieczenie przed wandalizmem, współpraca z lokalnymi społecznościami.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Szanse Rozwojowe</TableCell>
                      <TableCell>Rozbudowa sieci, nowe aplikacje, integracja z innymi systemami, rozwój nowych technologii.</TableCell>
                      <TableCell>Wysoki</TableCell>
                      <TableCell>Poszukiwanie możliwości pozyskiwania finansowania na rozwój sieci oraz wdrożenia nowych rozwiązań.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="best-practices">
              <h2 className="text-xl font-bold mb-4">Najlepsze Praktyki</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Obszar</TableHead>
                      <TableHead>Praktyka</TableHead>
                      <TableHead>Szczegółowy Opis</TableHead>
                      <TableHead>Korzyści</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Kalibracja</TableCell>
                      <TableCell>Regularna (co 3 miesiące)</TableCell>
                      <TableCell>Użycie wzorców odniesienia, kalibracja w miejscu instalacji (jeśli to możliwe).</TableCell>
                      <TableCell>Zapewnienie dokładności pomiarów, wiarygodność danych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Walidacja Danych</TableCell>
                      <TableCell>Automatyczna + manualna</TableCell>
                      <TableCell>Implementacja algorytmów do automatycznego wykrywania błędów, weryfikacja manualna przez ekspertów.</TableCell>
                      <TableCell>Wiarygodność wyników, eliminacja błędów pomiarowych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Komunikacja</TableCell>
                      <TableCell>Wielokanałowa</TableCell>
                      <TableCell>Wykorzystanie aplikacji mobilnych, stron internetowych, mediów społecznościowych, powiadomienia SMS/e-mail, komunikacja z mediami.</TableCell>
                      <TableCell>Szeroki zasięg informacji, szybkie powiadomienia o zagrożeniach.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="case-studies">
              <h2 className="text-xl font-bold mb-4">Studia Przypadków</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lokalizacja</TableHead>
                      <TableHead>Projekt</TableHead>
                      <TableHead>Rezultaty</TableHead>
                      <TableHead>Kluczowe Aspekty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Warszawa</TableCell>
                      <TableCell>Sieć 100 czujników</TableCell>
                      <TableCell>Redukcja PM2.5 o 15%, zwiększenie świadomości mieszkańców, wzrost wykorzystaniu roweru oraz transport publiczny</TableCell>
                      <TableCell>Rozbudowana sieć czujników, integracja z aplikacjami, współpraca z władzami miasta, kampania edukacyjna.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kraków</TableCell>
                      <TableCell>System alertów smogowych</TableCell>
                      <TableCell>30% wzrost świadomości, zmniejszenie liczby dni z przekroczeniami norm, zmiana w sposobie ogrzewania, wspieranie programów dotacyjnych.</TableCell>
                      <TableCell>System oparł się na prognozowaniu, kombinacja danych pomiarowych i meteorologicznych, wczesne ostrzeganie społeczności.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Poznań</TableCell>
                      <TableCell>Integracja z IoT</TableCell>
                      <TableCell>Optymalizacja zarządzania, usprawnienie przepływu danych, rozwój platformy IoT</TableCell>
                      <TableCell>Integracja z istniejącą infrastrukturą miejską, wykorzystanie platformy IoT, analiza i prezentacja danych w czasie rzeczywistym.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="metrics">
              <h2 className="text-xl font-bold mb-4">Metryki Wydajności</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metryka</TableHead>
                      <TableHead>Cel</TableHead>
                      <TableHead>Aktualny Status</TableHead>
                      <TableHead>Metody Pomiarowe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Dostępność Danych</TableCell>
                      <TableCell>&gt;99%</TableCell>
                      <TableCell>99.5%</TableCell>
                      <TableCell>Monitorowanie czasu pracy systemów, weryfikacja dostępności baz danych i serwerów, testy połączeń.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dokładność Pomiarów</TableCell>
                      <TableCell>±2%</TableCell>
                      <TableCell>±1.8%</TableCell>
                      <TableCell>Regularna kalibracja, porównanie z metodami referencyjnymi, analiza błędów pomiarowych.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Czas Odpowiedzi</TableCell>
                      <TableCell>&lt;5s</TableCell>
                      <TableCell>3.2s</TableCell>
                      <TableCell>Pomiar czasu przetworzenia danych od momentu pomiaru do publikacji, testy obciążeniowe.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="architecture">
              <h2 className="text-xl font-bold mb-4">Architektura Sieci</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Komponent</TableHead>
                      <TableHead>Specyfikacja</TableHead>
                      <TableHead>Funkcja</TableHead>
                      <TableHead>Parametry Techniczne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Czujniki</TableCell>
                      <TableCell>Klasa 1</TableCell>
                      <TableCell>Pomiary podstawowe (PM2.5, PM10, NO2, O3, SO2, CO)</TableCell>
                      <TableCell>Dokładność, zakres pomiarowy, zasilanie, typ komunikacji, odporność na warunki atmosferyczne.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Koncentratory</TableCell>
                      <TableCell>4G/5G</TableCell>
                      <TableCell>Agregacja danych</TableCell>
                      <TableCell>Przepustowość, zasięg, zabezpieczenia, zasilanie.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Serwery</TableCell>
                      <TableCell>Redundantne</TableCell>
                      <TableCell>Przetwarzanie, przechowywanie i wizualizacja danych, zarządzanie bazą danych.</TableCell>
                      <TableCell>Pojemność pamięci, moc obliczeniowa, systemy bezpieczeństwa, oprogramowanie, redundancja.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="implementation">
              <h2 className="text-xl font-bold mb-4">Wytyczne Wdrożeniowe</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Etap</TableHead>
                      <TableHead>Czas Trwania</TableHead>
                      <TableHead>Kluczowe Działania</TableHead>
                      <TableHead>Zasoby</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Planowanie</TableCell>
                      <TableCell>2-3 miesiące</TableCell>
                      <TableCell>Analiza potrzeb, wybór lokalizacji, wybór technologii, przygotowanie budżetu i harmonogramu.</TableCell>
                      <TableCell>Eksperci ds. jakości powietrza, analitycy danych, specjaliści ds. IT, inżynierowie.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Instalacja</TableCell>
                      <TableCell>1-2 miesiące</TableCell>
                      <TableCell>Montaż, kalibracja, testy funkcjonalności, integracja z istniejącymi systemami, szkolenie personelu.</TableCell>
                      <TableCell>Technicy, inżynierowie, dostawcy sprzętu, oprogramowanie.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Testowanie</TableCell>
                      <TableCell>1 miesiąc</TableCell>
                      <TableCell>Walidacja, optymalizacja, analiza danych, raportowanie wyników, wprowadzenie ewentualnych poprawek.</TableCell>
                      <TableCell>Eksperci ds. jakości powietrza, analitycy danych, zespół testowy.</TableCell>
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
