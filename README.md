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

### Schritt 2: Server starten
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

✅ Echtzeit-Multiplayer über WebSockets  
✅ 12 verschiedene Kategorien  
✅ Anpassbare Kategorien & Spielzeit  
✅ Automatische Punkteberechnung  
✅ Wort-Validation nach dem Spiel  
✅ Leaderboard mit Platzierungen  
✅ Responsive Design (auch auf Handy spielbar!)

## 📧 Fragen?

Bei Problemen bitte den Server neu starten und nochmal versuchen!

---

**Viel Spaß beim Spielen! 🎉**
