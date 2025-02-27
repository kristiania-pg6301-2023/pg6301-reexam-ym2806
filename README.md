**PG6301 - Eksamen**
(Vennligst les README.md i text editor)
Dette er min løsning for eksamen i PG6301. Prosjektet er en enkel social media API med en frontend som lar brukere opprette og slette innlegg.


Prosjektet består av to deler:
Backend (Express + MongoDB)
Frontend (React + Vite)



GitHub repository:
https://github.com/kristiania-pg6301-2023/pg6301-reexam-ym2806.git
Inneholder hele kodebasen og Actions-rapporten.

Herokuapp:
https://pg6301-app-271305e16ae4.herokuapp.com/
Fungerende applikasjon med frontend og backend via Heroku.



Oppsett og installasjon:
1. Klone prosjektet
git clone https://github.com/kristiania-pg6301-2023/pg6301-reexam-ym2806.git
cd pg6301-reexam-ym2806

2. Installere avhengigheter
-Slett tidligere .json filer hvis de eksisterer og kjør:
npm install

-Så: "cd client" for å installere build mappe og kjør: npm run build

-Konfigurer miljøvariabler
Lag en .env-fil i /server med følgende innhold:
MONGO_URI=din_mongodb_uri
PORT=5000

-Last ned vitest og testing dependencies:
npm install --save-dev vitest supertest @testing-library/react @testing-library/jest-dom


3️.Kjør prosjektet lokalt
-Start backend (Express)
npm run server
-Lokalt kjører backend på http://localhost:5000


-Start frontend (React)
Åpne en ny terminal og kjør:
npm run client
-Lokalt kjører frontend på http://localhost:5173

Funksjonalitet
-Opprette innlegg
-Lese innlegg
-Slette innlegg
-Sjekke eksisterende innlegg
-MongoDB database med brukere og innlegg
-Frontend koblet til backend


Hvordan bruke applikasjonen
Denne applikasjonen er en enkel sosial medieplattform hvor brukere med sin egen ID kan opprette, lese og slette innlegg. Her er en guide til hvordan man kan bruke systemet, både via frontend og API (Postman).

Bruk av frontend (nettleser)
1️. Åpne nettsiden:
-Gå til https://pg6301-app-271305e16ae4.herokuapp.com/

2️. Se eksisterende innlegg:
-Alle innlegg blir automatisk lastet inn og vises på forsiden.

3️. Publisere et nytt innlegg:
-Fyll inn Tittel, Innhold og Forfatter-ID (Se steg 1 under for å få ID eller bruk en av disse: user 1: 67bf504dfdd2013069ac3a88 / user 2: 67bf85041fb3afd0e4ff848a)
-Klikk på "Publiser"

4️. Slette et innlegg:
-Klikk på "Slett"-knappen under et innlegg


På dette tidspunktet kan du ikke lage bruker via google etc.
Dersom du vil bruke API-et manuelt via Postman eller andre API-klienter, kan du følge denne guiden:

1️. Opprett en bruker
-Endpoint: POST https://pg6301-app-271305e16ae4.herokuapp.com/api/users
-Body raw (JSON):
{
  "username": "testuser",
  "email": "test@example.com"
}

Hvis det er opprettet riktig skal du få svaret:
{
  "username": "testuser",
  "email": "test@example.com",
  "role": "anonymous",
  "_id": "67bf504dfdd2013069ac3a88",
  "__v": 0
}

Bruk nummeret du fikk i "_id": "67bf504dfdd2013069ac3a88" til å lage inlegg med forfatter ID.

Om du ønsker å bruke Postman for å hente innleggene kan du bruke:
Endpoint: GET https://pg6301-app-271305e16ae4.herokuapp.com/api/posts
Svar:
[
  {
    "_id": "67bf510efdd2013069ac3a8a",
    "title": "Min første post",
    "content": "Dette er en testpost via Postman!",
    "author": {
      "_id": "67bf504dfdd2013069ac3a88",
      "username": "testuser"
    }
  }
]

For å slette innlegget kan du gjøre slik:
Endpoint: DELETE https://pg6301-app-271305e16ae4.herokuapp.com/api/posts/{POST_ID}
Erstatt {POST_ID} med innleggets _id fra tidligere forespørsel.
Svar:
{ "message": "Innlegg slettet" }



Tester i Prosjektet
Prosjektet inneholder tester for både backend (API) og frontend-komponenter. Testene feiler for øyeblikket, men her er hva de tester, hvorfor de feiler, og hvordan de kan fikses senere. 

Backend API-tester (server/tests/posts.test.js)
Disse testene sjekker om API-et fungerer som forventet:
-Hente alle innlegg (GET /api/posts) – Skal returnere en liste med innlegg.
-Opprette nytt innlegg (POST /api/posts) – Skal lagre og returnere det nye innlegget.

Hvorfor testene feiler?
-Kanskje serveren kjører på en port, men eksporteres ikke riktig for testing.
-Index filen har ikke riktig kall

Mulige løsninger:
-Eksporter app uten å starte app.listen()?

Frontend-tester (server/tests/Home.test.jsx)
-Tester om Home.jsx rendres uten feil.

Hvorfor testene feiler?
-Feil filsti til Home.jsx i testen (ifølge cmd rapporten fra npm test)
-Mangler riktig testmiljø for React-komponenter?

Mulige løsninger:
-Sjekk og korriger import-stien.


Kravoppfyllelse:
Dette prosjektet har vært en fullverdig fullstack-applikasjon, utviklet med MERN-stack (MongoDB, Express, React, Node.js) og distribuert på Heroku. Jeg har gjennom hele prosessen prøvd mitt beste for å møte alle kravene til eksamen, samt løst flere utfordringer for å sikre at prosjektet fungerer stabilt. På dette tidspunktet har jeg ikke rukket å implementere pålogging med OpenID og tester.

-Appen fungerer som en enkel sosial plattform der brukere kan opprette, lese og slette innlegg.	
-Express API med Routes: API er laget og fungerer, inkludert GET, POST og DELETE.	
-MongoDB lagring: Innlegg lagres i databasen.	
-Heroku Deployment: Backend og frontend kjører på Heroku.	
-GitHub Actions. CI/CD er satt opp for automatisert bygging og testing.	
-README.md: Beskrivelse, installasjonsinstruksjoner og lenker til Heroku og GitHub er inkludert.	
-npm start starter server + klient – Riktig satt opp, fungerer både lokalt(server vil gi "cannot GET", men funker likevel) og på Heroku.	

Ikke implementert:
Brukerautentisering med OpenID Connect (Google login) – Ikke implementert.	
Brukerroller (anonyme, registrerte, verifiserte brukere) – Ikke implementert.	
Emoji-reaksjoner på innlegg – Ikke implementert.	
Redigering av innlegg – Ikke implementert.	
Validering av brukerinnlogging – Ikke implementert.	
CSS Grid/layout-forbedringer – UI er veldig enkelt og mangler god styling.	
Vitest/prettier testing – Ingen slike tester implementert.



Utviklingen har ikke vært uten utfordringer. Her er noen problemer jeg støtte på og hvordan jeg løste dem:

Etter at jeg deployet appen til Heroku, forsøkte frontend fortsatt å hente data fra http://localhost:5000/api/posts, noe som ikke fungerer på en live server.Løsningen jeg fant sikret at frontend og backend kunne kommunisere, både lokalt og i Heroku.

-Løsning: Jeg lagde en API_BASE_URL-konstant i Home.jsx som automatisk bruker riktig URL:
const API_BASE_URL = "https://pg6301-app-271305e16ae4.herokuapp.com/api";

Første gang jeg deployet til Heroku, fungerte backend fint, men frontend ble ikke vist. Nettleseren returnerte "Not Found" fordi Express-serveren ikke var satt opp til å serve React-appen. Denne løsningen sørget for at frontend blir servert fra Express-serveren etter at React-appen er bygget.

-Løsning: Jeg la til en serve frontend-funksjonalitet i server/index.js:
const path = require("path");

// Serve frontend fra build-mappen
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

Etter deployment til Heroku prøvde jeg å opprette et nytt innlegg via skjemaet, ingenting skjedde. Etter debugging fant jeg ut at jeg hadde glemt å sende Content-Type: application/json i fetch-kallet.
MongoDB-koblingen var ustabil fordi .env-variablene ikke var satt riktig i Heroku. Jeg løste dette ved å legge til headers: { "Content-Type": "application/json" } i API-kallene. 




GitHub repository: 
Inneholder all kode, actions-rapport og oppfylte krav.

Heroku-deployment: 
Applikasjonen kjører live på Heroku.

GitHub Actions: 
Automatisk CI/CD pipeline.

.gitignore: 
Ekskluderer node_modules/, .env og andre genererte filer.

README.md: 
Inkluderer instruksjoner, lenker og informasjon om prosjektet.

Videre forbedringer:
Legge til brukerautentisering (JWT)
Forbedret UI med Tailwind eller Material UI
Bedre feilhåndtering og validering på backend
Flere tester

