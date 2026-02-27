const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, 'public')));

let games = {}; // { gameId: { players: {}, gameState: {}, ... } }

io.on('connection', (socket) => {
    console.log('Neuer Benutzer verbunden:', socket.id);

    // Neues Spiel erstellen
    socket.on('createGame', (playerName, callback) => {
        const gameId = Math.random().toString(36).substr(2, 9);
        
        games[gameId] = {
            gameId,
            players: {
                [socket.id]: {
                    name: playerName,
                    socketId: socket.id
                }
            },
            gameState: 'waiting', // waiting, setup, playing, results
            settings: null,
            answers: {},
            wordValidation: {},
            scores: {}
        };

        socket.join(gameId);
        socket.gameId = gameId;

        console.log(`Spiel erstellt: ${gameId} von ${playerName}`);
        callback({ gameId, success: true });
    });

    // Zu Spiel beitreten
    socket.on('joinGame', (gameId, playerName, callback) => {
        if (!games[gameId]) {
            callback({ success: false, message: 'Spiel nicht gefunden' });
            return;
        }

        if (games[gameId].gameState !== 'waiting') {
            callback({ success: false, message: 'Spiel hat bereits begonnen' });
            return;
        }

        const existingPlayers = Object.values(games[gameId].players).map(p => p.name);
        if (existingPlayers.includes(playerName)) {
            callback({ success: false, message: 'Name bereits vergeben' });
            return;
        }

        games[gameId].players[socket.id] = {
            name: playerName,
            socketId: socket.id
        };

        socket.join(gameId);
        socket.gameId = gameId;

        io.to(gameId).emit('playerJoined', {
            players: Object.values(games[gameId].players).map(p => p.name)
        });

        console.log(`${playerName} trat Spiel ${gameId} bei`);
        callback({ success: true });
    });

    // Spielstart
    socket.on('startGame', (settings) => {
        const gameId = socket.gameId;
        if (!games[gameId]) return;

        games[gameId].settings = settings;
        games[gameId].gameState = 'playing';
        games[gameId].answers = {};
        games[gameId].wordValidation = {};
        games[gameId].scores = {};

        Object.keys(games[gameId].players).forEach(playerId => {
            games[gameId].scores[games[gameId].players[playerId].name] = 0;
        });

        io.to(gameId).emit('gameStarted', {
            settings,
            players: Object.values(games[gameId].players).map(p => p.name)
        });

        console.log(`Spiel ${gameId} gestartet`);
    });

    // Antworten speichern
    socket.on('submitAnswers', (letter, answers) => {
        const gameId = socket.gameId;
        if (!games[gameId]) return;

        const playerName = games[gameId].players[socket.id].name;

        if (!games[gameId].answers[letter]) {
            games[gameId].answers[letter] = {};
        }

        if (!games[gameId].answers[letter][playerName]) {
            games[gameId].answers[letter][playerName] = {};
        }

        games[gameId].answers[letter][playerName] = answers;

        // Check ob alle Spieler ihre Antworten eingegeben haben
        const allAnswered = checkAllAnswered(gameId, letter);
        
        io.to(gameId).emit('answersSubmitted', {
            letter,
            playerName,
            allAnswered
        });
    });

    // Spiel beenden
    socket.on('endGame', () => {
        const gameId = socket.gameId;
        if (!games[gameId]) return;

        games[gameId].gameState = 'results';

        const resultsData = calculateResults(gameId);

        io.to(gameId).emit('gameEnded', {
            answers: games[gameId].answers,
            scores: resultsData.scores
        });

        console.log(`Spiel ${gameId} beendet`);
    });

    // Wort validieren
    socket.on('validateWord', (wordKey, approved) => {
        const gameId = socket.gameId;
        if (!games[gameId]) return;

        games[gameId].wordValidation[wordKey] = { approved };

        // Scores neu berechnen
        const resultsData = calculateResults(gameId);

        io.to(gameId).emit('scoresUpdated', {
            scores: resultsData.scores,
            wordValidation: games[gameId].wordValidation
        });
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('Benutzer disconnected:', socket.id);

        if (socket.gameId && games[socket.gameId]) {
            delete games[socket.gameId].players[socket.id];

            if (Object.keys(games[socket.gameId].players).length === 0) {
                delete games[socket.gameId];
                console.log(`Spiel ${socket.gameId} gelöscht`);
            } else {
                io.to(socket.gameId).emit('playerLeft', {
                    players: Object.values(games[socket.gameId].players).map(p => p.name)
                });
            }
        }
    });
});

function checkAllAnswered(gameId, letter) {
    const game = games[gameId];
    const playerCount = Object.keys(game.players).length;
    const answeredCount = Object.keys(game.answers[letter] || {}).length;
    return answeredCount === playerCount;
}

function calculateResults(gameId) {
    const game = games[gameId];
    const scores = {};

    Object.values(game.players).forEach(player => {
        scores[player.name] = 0;
    });

    for (const letter in game.answers) {
        const letterAnswers = game.answers[letter];

        for (const category in game.settings.categories) {
            const categoryName = game.settings.categories[category];
            const categoryAnswers = {};

            for (const player in letterAnswers) {
                if (letterAnswers[player][categoryName]) {
                    categoryAnswers[player] = letterAnswers[player][categoryName];
                }
            }

            // Count word occurrences
            const wordCounts = {};
            const playerWords = {};

            for (const player in categoryAnswers) {
                const word = categoryAnswers[player];
                if (word) {
                    const key = `${letter}-${categoryName}-${word.toLowerCase()}`;
                    const wordKey = word.toLowerCase();

                    // Check if word is rejected
                    if (game.wordValidation[key] && game.wordValidation[key].approved === false) {
                        continue;
                    }

                    wordCounts[wordKey] = (wordCounts[wordKey] || 0) + 1;
                    if (!playerWords[player]) playerWords[player] = [];
                    playerWords[player].push(wordKey);
                }
            }

            // Award points
            for (const player in playerWords) {
                playerWords[player].forEach(word => {
                    const count = wordCounts[word];
                    if (count === 1) {
                        scores[player] += 10; // Unique word
                    } else if (count > 1) {
                        scores[player] += 5; // Duplicate word
                    }
                });
            }
        }
    }

    return { scores };
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});