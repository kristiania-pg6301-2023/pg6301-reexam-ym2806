**PG6301 - Eksamen**

(Vennligst les README i text editor grunnet elendig formatering)
Dette er min løsning for eksamen i PG6301. Prosjektet er en enkel social media API med en frontend som lar brukere opprette og slette innlegg.


Prosjektet består av to deler:
Backend (Express + MongoDB)
Frontend (React + Vite)



GitHub repository:
https://github.com/kristiania-pg6301-2023/pg6301-reexam-ym2806.git
Inneholder hele kodebasen og Actions-rapporten.

Heroku applikasjon:
https://pg6301-app-271305e16ae4.herokuapp.com/
Fungerende applikasjon med både fungerende backend og frontend funksjoner.




Oppsett og installasjon:
1. Klone prosjektet
git clone https://github.com/kristiania-pg6301-2023/pg6301-reexam-ym2806.git
cd pg6301-reexam-ym2806

2. Installere avhengigheter
npm install

3️.Kjør prosjektet lokalt
-Start backend (Express)
npm run server (vil sikkert ikke funke da server er linka til heroku)

-Start frontend (React)
Åpne en ny terminal og kjør:
npm run client

-Lokalt kjører frontend på http://localhost:5173

Funksjonalitet
-Opprette innlegg
-Slette innlegg
-Sjekke eksisterende innlegg
-MongoDB database med brukere og innlegg
-Frontend koblet til backend


Kravoppfyllelse:
Dette prosjektet har vært en fullverdig fullstack-applikasjon, utviklet med MERN-stack (MongoDB, Express, React, Node.js) og distribuert på Heroku. Jeg har gjennom hele prosessen prøvd mitt beste for å møte alle kravene til eksamen, samt løst flere utfordringer for å sikre at prosjektet fungerer stabilt. På dette tidspunktet har jeg ikke rukket å implementere pålogging med OpenID.

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


GitHub repository: 
Inneholder all kode, actions-rapport og oppfylte krav.

Heroku-deployment: 
Applikasjonen kjører live på Heroku.

GitHub Actions: 
Automatisk CI/CD pipeline.

.gitignore: 
Ekskluderer node_modules/ og andre genererte filer.

README.md: 
Inkluderer instruksjoner, lenker og informasjon om prosjektet.

Videre forbedringer:
Legge til brukerautentisering (JWT).
Forbedret UI med Tailwind eller Material UI.
Bedre feilhåndtering og validering på backend.
Flere tester.

