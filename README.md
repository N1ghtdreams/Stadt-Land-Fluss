# 🎮 Stadt Land Fluss Online - Multiplayer Game

Ein interaktives Stadt-Land-Fluss Spiel zum Online spielen mit Freunden!

## 🚀 Installation & Start

### Voraussetzungen
- **Node.js** muss installiert sein (Download: https://nodejs.org/)

### Schritt 1: Dependencies installieren
Öffne ein Terminal/PowerShell im Spiel-Ordner und gib ein:
```
npm install
```

### Schritt 2: Git‑Repository vorbereiten (nur einmal nötig)
Falls du das Projekt noch nicht versioniert hast, musst du einmal ein Git‑Repo einrichten, damit deine Änderungen später gepusht werden können:
```
cd "C:\Users\Home\Documents\Eigenes Minecraft"
git init
git add .
git commit -m "initial commit"
```
Danach kannst du es zu GitHub, Render oder einem anderen Dienst hochladen.

### Schritt 3: Server starten
```
npm start
```

Der Server läuft dann auf: **http://localhost:3000**

## 🎯 So spielst du

### Host erstellen:
1. Gib deinen Namen ein
2. Klick "Neues Spiel erstellen"
3. Gib den Code deinen Freunden (z.B. über Discord, WhatsApp, etc.)
4. Stelle Kategorien & Zeit ein
5. Klick "Spiel starten"

### Beitreten:
1. Gib deinen Namen ein
2. Gib den Spiel-Code ein (von deinem Freund)
3. Klick "Beitreten"
4. Warte bis der Host das Spiel startet

## 🔐 Anmeldung & Level

Bevor du spielen kannst, **muss ein Nutzerkonto angelegt oder eingeloggt** werden. Die erste Seite zeigt ein Formular zum Registrieren oder Anmelden.
Nach erfolgreicher Anmeldung siehst du deinen Namen und aktuellen Level oben auf der Startseite. Jeder Gewinn und jedes gespielte Spiel erhöht deine Level‑Fortschritte automatisch.

## 🎲 Spielmechanik

- **Zufälliger Buchstabe** wird angezeigt
- **Zeit**: Du hast X Sekunden um Wörter einzugeben
- **Kategorien**: Wähle aus: Stadt, Land, Fluss, Videospiel, Job, usw.
- **Punkte**:
  - Einzigartiges Wort (nur du): **10 Punkte**
  - Gleiches Wort wie andere: **5 Punkte**
  - Abgelehnte Wörter: **0 Punkte**

## 🔧 Troubleshooting

**"Port 3000 wird bereits verwendet"**
- Ein anderes Programm nutzt den Port
- Lösung: Server mit anderem Port starten

**"Verbindung fehlgeschlagen"**
- Stelle sicher, dass der Server läuft
- Überprüfe deine Firewall

**"npm: Befehl nicht gefunden"**
- Node.js ist nicht installiert
- Download: https://nodejs.org/

## 📝 Features

✅ Anmeldung/Registrierung mit Benutzerlevels  
✅ Echtzeit-Multiplayer über WebSockets  
✅ 12 verschiedene Kategorien  
✅ Anpassbare Kategorien & Spielzeit  
✅ Automatische Punkteberechnung  
✅ Wort-Validation nach dem Spiel  
✅ Leaderboard mit Platzierungen  
✅ Responsive Design (auch auf Handy spielbar!)

## 📧 Fragen?

- Stelle sicher, dass du die **aktuelle Version** deines Codes verwendest. Nach Änderungen (z. B. Anmeldung/Level) musst du:
  1. `git add . && git commit -m "neu: Anmeldung und Level"`
  2. `git push` (damit Render/andere Hosting-Dienste neu deployen)
  3. Den Browser-Cache leeren oder `Strg+F5` drücken.
- Wenn du lokal testest, stoppe und starte den Server neu (`npm start`).

Bei weiteren Problemen einfach melden!

---

**Viel Spaß beim Spielen! 🎉**
