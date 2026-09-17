
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3002;
const QUESTION_TIME = 15;

const questionBank = [
  {
    question: "React nima?",
    options: [
      "JavaScript kutubxonasi",
      "Ma'lumotlar bazasi",
      "Operatsion tizim",
      "Brauzer",
    ],
    answer: 0,
  },
  {
    question: "JavaScript faylining kengaytmasi qaysi?",
    options: [".css", ".html", ".js", ".jsx"],
    answer: 2,
  },
  {
    question: "HTML nimani anglatadi?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language",
    ],
    answer: 0,
  },
  {
    question: "CSS nima uchun ishlatiladi?",
    options: [
      "Server yaratish uchun",
      "Web sahifani bezash uchun",
      "Database yaratish uchun",
      "Video montaj qilish uchun",
    ],
    answer: 1,
  },
  {
    question: "Git nima?",
    options: [
      "Kod versiyalarini boshqarish tizimi",
      "Brauzer",
      "Database",
      "Operatsion tizim",
    ],
    answer: 0,
  },
  {
    question: "GitHub nima?",
    options: [
      "Kod saqlash va hamkorlik platformasi",
      "Video platforma",
      "O'yin",
      "Brauzer",
    ],
    answer: 0,
  },
  {
    question: "React'da komponent nima?",
    options: [
      "UI ning qayta ishlatiladigan qismi",
      "Database jadvali",
      "Server porti",
      "CSS fayli",
    ],
    answer: 0,
  },
  {
    question: "useState nima uchun ishlatiladi?",
    options: [
      "State boshqarish uchun",
      "CSS yozish uchun",
      "Server ishga tushirish uchun",
      "Git repository yaratish uchun",
    ],
    answer: 0,
  },
  {
    question: "JavaScript'da array qaysi belgilar bilan yoziladi?",
    options: [
      "{}",
      "()",
      "[]",
      "<>",
    ],
    answer: 2,
  },
  {
    question: "map() metodi nima qiladi?",
    options: [
      "Array elementlari ustida amal bajarib yangi array qaytaradi",
      "Serverni o'chiradi",
      "CSS yozadi",
      "Database yaratadi",
    ],
    answer: 0,
  },
  {
    question: "Node.js nima?",
    options: [
      "JavaScript runtime",
      "CSS framework",
      "Database",
      "Brauzer",
    ],
    answer: 0,
  },
  {
    question: "Express.js nima?",
    options: [
      "Node.js uchun web framework",
      "React komponenti",
      "Database",
      "Operatsion tizim",
    ],
    answer: 0,
  },
  {
    question: "npm nima?",
    options: [
      "JavaScript paketlar menejeri",
      "Rasm tahrirlash dasturi",
      "Brauzer",
      "Database",
    ],
    answer: 0,
  },
  {
    question: "HTTP nimaga xizmat qiladi?",
    options: [
      "Client va server o'rtasida ma'lumot almashishga",
      "Rasm chizishga",
      "Video montajga",
      "CSS yaratishga",
    ],
    answer: 0,
  },
  {
    question: "JSON nima?",
    options: [
      "Ma'lumot almashish formati",
      "CSS framework",
      "Brauzer",
      "Operatsion tizim",
    ],
    answer: 0,
  },
  {
    question: "React'da JSX nima?",
    options: [
      "JavaScript ichida UI yozish sintaksisi",
      "Database",
      "Server",
      "Git komandasi",
    ],
    answer: 0,
  },
  {
    question: "HTML'da havola yaratish uchun qaysi tag ishlatiladi?",
    options: [
      "<p>",
      "<a>",
      "<div>",
      "<img>",
    ],
    answer: 1,
  },
  {
    question: "HTML'da rasm qo'yish uchun qaysi tag ishlatiladi?",
    options: [
      "<image>",
      "<picture>",
      "<img>",
      "<src>",
    ],
    answer: 2,
  },
  {
    question: "CSS'da matn rangini o'zgartirish uchun qaysi property ishlatiladi?",
    options: [
      "background",
      "font-size",
      "color",
      "text-style",
    ],
    answer: 2,
  },
  {
    question: "CSS'da elementlar orasidagi ichki masofa qaysi property?",
    options: [
      "margin",
      "padding",
      "gap",
      "space",
    ],
    answer: 1,
  },
  {
    question: "CSS'da tashqi masofa qaysi property?",
    options: [
      "padding",
      "margin",
      "border",
      "space",
    ],
    answer: 1,
  },
  {
    question: "JavaScript'da o'zgaruvchi yaratish uchun qaysi keyword ishlatilishi mumkin?",
    options: [
      "let",
      "make",
      "varible",
      "create",
    ],
    answer: 0,
  },
  {
    question: "JavaScript'da qat'iy qiymat uchun qaysi keyword ishlatiladi?",
    options: [
      "let",
      "var",
      "const",
      "fixed",
    ],
    answer: 2,
  },
  {
    question: "console.log() nima qiladi?",
    options: [
      "Konsolga ma'lumot chiqaradi",
      "Serverni ishga tushiradi",
      "HTML yaratadi",
      "CSS o'zgartiradi",
    ],
    answer: 0,
  },
  {
    question: "Boolean qanday qiymatlarni qabul qiladi?",
    options: [
      "Faqat string",
      "true yoki false",
      "Faqat number",
      "Array",
    ],
    answer: 1,
  },
  {
    question: "JavaScript'da string nima?",
    options: [
      "Matn",
      "Raqam",
      "Boolean",
      "Funksiya",
    ],
    answer: 0,
  },
  {
    question: "React ilovasini yaratishda Vite nima?",
    options: [
      "Frontend build tool",
      "Database",
      "CSS property",
      "Telegram bot",
    ],
    answer: 0,
  },
  {
    question: "Socket.IO nima uchun ishlatiladi?",
    options: [
      "Real-time aloqa uchun",
      "Rasm tahrirlash uchun",
      "CSS yozish uchun",
      "Database yaratish uchun",
    ],
    answer: 0,
  },
  {
    question: "Frontend nima?",
    options: [
      "Foydalanuvchi ko'radigan va ishlatadigan qism",
      "Faqat database",
      "Serverning fizik qismi",
      "Operatsion tizim",
    ],
    answer: 0,
  },
  {
    question: "Backend nima?",
    options: [
      "Server tomonda ishlaydigan qism",
      "Faqat CSS",
      "Web sahifa dizayni",
      "Brauzer",
    ],
    answer: 0,
  },
];

const games = {};

function shuffle(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [
      newArray[j],
      newArray[i],
    ];
  }

  return newArray;
}

function generatePin() {
  let pin;

  do {
    pin = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  } while (games[pin]);

  return pin;
}

function clearGameTimer(game) {
  if (game.timer) {
    clearTimeout(game.timer);
    game.timer = null;
  }
}

function getPublicQuestion(question) {
  return {
    id: question.id,
    question: question.question,
    options: question.options,
  };
}

function startQuestionTimer(pin) {
  const game = games[pin];

  if (!game) {
    return;
  }

  clearGameTimer(game);

  game.questionStartedAt = Date.now();

  game.timer = setTimeout(() => {
    const currentGame = games[pin];

    if (!currentGame) {
      return;
    }

    if (
      currentGame.currentQuestion >=
      currentGame.questions.length
    ) {
      return;
    }

    currentGame.timer = null;

    io.to(pin).emit("questionTimeout");

    setTimeout(() => {
      sendNextQuestion(pin);
    }, 1000);
  }, QUESTION_TIME * 1000);
}

function sendNextQuestion(pin) {
  const game = games[pin];

  if (!game) {
    return;
  }

  clearGameTimer(game);

  game.advancing = false;
  game.answers = {};

  game.currentQuestion++;

  if (
    game.currentQuestion >=
    game.questions.length
  ) {
    io.to(pin).emit("gameFinished", {
      players: game.players,
    });

    delete games[pin];

    return;
  }

  const question =
    game.questions[game.currentQuestion];

  io.to(pin).emit("nextQuestion", {
    question: getPublicQuestion(question),
    questionNumber: game.currentQuestion + 1,
    totalQuestions: game.questions.length,
    timeLimit: QUESTION_TIME,
  });

  startQuestionTimer(pin);
}

function advanceWhenEveryoneAnswered(pin) {
  const game = games[pin];

  if (!game || game.advancing) {
    return;
  }

  if (game.players.length === 0) {
    return;
  }

  const answeredPlayers = Object.keys(
    game.answers
  ).length;

  if (
    answeredPlayers >= game.players.length
  ) {
    game.advancing = true;

    clearGameTimer(game);

    setTimeout(() => {
      if (!games[pin]) {
        return;
      }

      sendNextQuestion(pin);
    }, 1000);
  }
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createGame", (playerName) => {
    const pin = generatePin();

    const shuffledQuestions = shuffle(
      questionBank
    );

    const selectedQuestions =
      shuffledQuestions.map(
        (question, index) => ({
          ...question,
          id: index + 1,
        })
      );

    games[pin] = {
      pin,
      host: socket.id,
      started: false,
      currentQuestion: -1,
      questions: selectedQuestions,
      answers: {},
      timer: null,
      questionStartedAt: null,
      advancing: false,
      players: [
        {
          id: socket.id,
          name: playerName,
          score: 0,
        },
      ],
    };

    socket.join(pin);

    socket.emit("gameCreated", {
      pin,
      players: games[pin].players,
    });

    console.log(
      `Game created: ${pin}`
    );
  });

  socket.on(
    "joinGame",
    ({ pin, playerName }) => {
      const game = games[pin];

      if (!game) {
        socket.emit(
          "joinError",
          "Bunday PIN bilan o'yin topilmadi!"
        );

        return;
      }

      if (game.started) {
        socket.emit(
          "joinError",
          "Bu o'yin allaqachon boshlangan!"
        );

        return;
      }

      const alreadyJoined =
        game.players.some(
          (player) =>
            player.name.toLowerCase() ===
            playerName.toLowerCase()
        );

      if (alreadyJoined) {
        socket.emit(
          "joinError",
          "Bu ism allaqachon ishlatilgan!"
        );

        return;
      }

      game.players.push({
        id: socket.id,
        name: playerName,
        score: 0,
      });

      socket.join(pin);

      io.to(pin).emit("playersUpdated", game.players);

      socket.emit("joinedGame", {
        pin,
        players: game.players,
      });

      console.log(
        `${playerName} joined game ${pin}`
      );
    }
  );

  socket.on("startGame", (pin) => {
    const game = games[pin];

    if (!game) {
      socket.emit(
        "gameError",
        "O'yin topilmadi!"
      );

      return;
    }

    if (socket.id !== game.host) {
      socket.emit(
        "gameError",
        "Faqat host o'yinni boshlashi mumkin!"
      );

      return;
    }

    if (game.players.length < 1) {
      socket.emit(
        "gameError",
        "O'yinchilar yo'q!"
      );

      return;
    }

    game.started = true;
    game.currentQuestion = 0;
    game.answers = {};
    game.questionStartedAt = Date.now();

    const question =
      game.questions[0];

    io.to(pin).emit("gameStarted", {
      question: getPublicQuestion(question),
      questionNumber: 1,
      totalQuestions: game.questions.length,
      timeLimit: QUESTION_TIME,
    });

    startQuestionTimer(pin);

    console.log(
      `Game ${pin} started`
    );
  });

  socket.on(
    "submitAnswer",
    ({
      pin,
      questionId,
      answer,
    }) => {
      const game = games[pin];

      if (!game || !game.started) {
        return;
      }

      if (
        game.currentQuestion < 0 ||
        game.currentQuestion >=
          game.questions.length
      ) {
        return;
      }

      if (game.answers[socket.id]) {
        return;
      }

      const player = game.players.find(
        (item) =>
          item.id === socket.id
      );

      if (!player) {
        return;
      }

      const question =
        game.questions[
          game.currentQuestion
        ];

      if (question.id !== questionId) {
        return;
      }

      const isCorrect =
        Number(answer) === question.answer;

      let earnedScore = 0;
      let bonus = 0;

      if (isCorrect) {
        const elapsedSeconds =
          (Date.now() -
            game.questionStartedAt) /
          1000;

        const remainingSeconds =
          Math.max(
            0,
            QUESTION_TIME -
              elapsedSeconds
          );

        bonus = Math.round(
          (remainingSeconds /
            QUESTION_TIME) *
            50
        );

        earnedScore =
          100 + bonus;

        player.score += earnedScore;
      }

      game.answers[socket.id] = {
        answer,
        correct: isCorrect,
        earnedScore,
      };

      socket.emit("answerResult", {
        correct: isCorrect,
        score: player.score,
        earnedScore,
        baseScore: isCorrect ? 100 : 0,
        bonus,
      });

      io.to(pin).emit(
        "playersUpdated",
        game.players
      );

      advanceWhenEveryoneAnswered(pin);
    }
  );

  socket.on(
    "nextQuestion",
    (pin) => {
      const game = games[pin];

      if (!game) {
        return;
      }

      if (socket.id !== game.host) {
        return;
      }

      sendNextQuestion(pin);
    }
  );

  socket.on(
    "leaveGame",
    (pin) => {
      const game = games[pin];

      if (!game) {
        return;
      }

      const leavingPlayer =
        game.players.find(
          (player) =>
            player.id === socket.id
        );

      game.players =
        game.players.filter(
          (player) =>
            player.id !== socket.id
        );

      delete game.answers[socket.id];

      socket.leave(pin);

      if (
        socket.id === game.host &&
        game.players.length > 0
      ) {
        game.host =
          game.players[0].id;
      }

      if (game.players.length === 0) {
        clearGameTimer(game);
        delete games[pin];
        return;
      }

      io.to(pin).emit(
        "playersUpdated",
        game.players
      );

      if (
        game.started &&
        game.players.length > 0
      ) {
        advanceWhenEveryoneAnswered(pin);
      }

      console.log(
        `${leavingPlayer?.name || "Player"} left game ${pin}`
      );
    }
  );

  socket.on("disconnect", () => {
    console.log(
      "User disconnected:",
      socket.id
    );

    for (const pin in games) {
      const game = games[pin];

      const playerExists =
        game.players.some(
          (player) =>
            player.id === socket.id
        );

      if (!playerExists) {
        continue;
      }

      game.players =
        game.players.filter(
          (player) =>
            player.id !== socket.id
        );

      delete game.answers[socket.id];

      if (
        socket.id === game.host &&
        game.players.length > 0
      ) {
        game.host =
          game.players[0].id;
      }

      if (game.players.length === 0) {
        clearGameTimer(game);
        delete games[pin];
        continue;
      }

      io.to(pin).emit(
        "playersUpdated",
        game.players
      );

      if (game.started) {
        advanceWhenEveryoneAnswered(pin);
      }
    }
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Quiz Game Server ishlayapti!",
  });
});

app.get("/questions", (req, res) => {
  res.json({
    count: questionBank.length,
    questions: questionBank.map(
      (question) => ({
        question: question.question,
        options: question.options,
      })
    ),
  });
});

app.get("/games", (req, res) => {
  res.json({
    games: Object.values(games).map(
      (game) => ({
        pin: game.pin,
        started: game.started,
        players: game.players,
        currentQuestion:
          game.currentQuestion,
        totalQuestions:
          game.questions.length,
      })
    ),
  });
});

server.listen(PORT, () => {
  console.log(
    `Server http://localhost:${PORT} da ishlayapti`
  );
});

