
import { useEffect, useState } from "react";
import socket from "./socket";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [gamePin, setGamePin] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [score, setScore] = useState(0);
  const [earnedScore, setEarnedScore] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionEnded, setQuestionEnded] = useState(false);

  useEffect(() => {
    socket.on("gameCreated", ({ pin, players }) => {
      setGamePin(pin);
      setPlayers(players);
      setScreen("lobby");
    });

    socket.on("joinedGame", ({ pin, players }) => {
      setGamePin(pin);
      setPlayers(players);
      setScreen("lobby");
    });

    socket.on("playersUpdated", (players) => {
      setPlayers(players);

      const currentPlayer = players.find(
        (player) => player.id === socket.id
      );

      if (currentPlayer) {
        setScore(currentPlayer.score);
      }
    });

    socket.on("joinError", (message) => {
      setError(message);
    });

    socket.on("gameError", (message) => {
      setError(message);
    });

    socket.on(
      "gameStarted",
      ({
        question,
        questionNumber,
        totalQuestions,
        timeLimit,
      }) => {
        setQuestion(question);
        setQuestionNumber(questionNumber);
        setTotalQuestions(totalQuestions);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setEarnedScore(0);
        setBonus(0);
        setQuestionEnded(false);
        setTimeLeft(timeLimit || 15);
        setScreen("quiz");
      }
    );

    socket.on(
      "nextQuestion",
      ({
        question,
        questionNumber,
        totalQuestions,
        timeLimit,
      }) => {
        setQuestion(question);
        setQuestionNumber(questionNumber);
        setTotalQuestions(totalQuestions);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setEarnedScore(0);
        setBonus(0);
        setQuestionEnded(false);
        setTimeLeft(timeLimit || 15);
        setScreen("quiz");
      }
    );

    socket.on(
      "answerResult",
      ({
        correct,
        score,
        earnedScore,
        bonus,
      }) => {
        setAnswerResult(correct);
        setScore(score);
        setEarnedScore(earnedScore || 0);
        setBonus(bonus || 0);
      }
    );

    socket.on("questionTimeout", () => {
      setQuestionEnded(true);
      setTimeLeft(0);
    });

    socket.on("gameFinished", ({ players }) => {
      setPlayers(players);

      const currentPlayer = players.find(
        (player) => player.id === socket.id
      );

      if (currentPlayer) {
        setScore(currentPlayer.score);
      }

      setScreen("result");
    });

    return () => {
      socket.off("gameCreated");
      socket.off("joinedGame");
      socket.off("playersUpdated");
      socket.off("joinError");
      socket.off("gameError");
      socket.off("gameStarted");
      socket.off("nextQuestion");
      socket.off("answerResult");
      socket.off("questionTimeout");
      socket.off("gameFinished");
    };
  }, []);

  useEffect(() => {
    if (
      screen !== "quiz" ||
      !question ||
      questionEnded
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    screen,
    questionNumber,
    questionEnded,
    question,
  ]);

  function createGame() {
    if (!name.trim()) {
      setError("Ismingizni kiriting!");
      return;
    }

    setError("");
    socket.emit("createGame", name.trim());
  }

  function joinGame() {
    if (!name.trim()) {
      setError("Ismingizni kiriting!");
      return;
    }

    if (!pin.trim()) {
      setError("PIN kodni kiriting!");
      return;
    }

    setError("");

    socket.emit("joinGame", {
      pin: pin.trim(),
      playerName: name.trim(),
    });
  }

  function startGame() {
    setError("");
    socket.emit("startGame", gamePin);
  }

  function submitAnswer(index) {
    if (
      selectedAnswer !== null ||
      answerResult !== null ||
      questionEnded ||
      timeLeft <= 0
    ) {
      return;
    }

    setSelectedAnswer(index);

    socket.emit("submitAnswer", {
      pin: gamePin,
      questionId: question.id,
      answer: index,
    });
  }

  function leaveGame() {
    if (gamePin) {
      socket.emit("leaveGame", gamePin);
    }

    setScreen("home");
    setGamePin("");
    setPlayers([]);
    setQuestion(null);
    setQuestionNumber(0);
    setTotalQuestions(0);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setEarnedScore(0);
    setBonus(0);
    setScore(0);
    setTimeLeft(15);
    setQuestionEnded(false);
    setError("");
  }

  const isHost =
    players.length > 0 &&
    players[0].id === socket.id;

  const sortedLivePlayers = [...players].sort(
    (a, b) => b.score - a.score
  );

  const sortedPlayers = [...players].sort(
    (a, b) => b.score - a.score
  );

  const timerClass =
    timeLeft <= 5
      ? "timer danger"
      : timeLeft <= 10
      ? "timer warning"
      : "timer";

  if (screen === "home") {
    return (
      <div className="quiz-page">
        <div className="home-card">
          <div className="logo big-logo">
            <span>⚡</span>
            Quiz Game
          </div>

          <p className="subtitle">
            Do‘stlaring bilan bilim bellashuvini boshlang
          </p>

          <input
            className="game-input"
            type="text"
            placeholder="Ismingizni kiriting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            className="main-btn"
            onClick={createGame}
          >
            🎮 O‘yin yaratish
          </button>

          <div className="or">
            <span>yoki</span>
          </div>

          <input
            className="game-input"
            type="text"
            placeholder="6 xonali PIN"
            value={pin}
            maxLength={6}
            onChange={(e) =>
              setPin(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

          <button
            className="secondary-btn"
            onClick={joinGame}
          >
            🚀 O‘yinga kirish
          </button>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (screen === "lobby") {
    return (
      <div className="quiz-page">
        <div className="lobby-card">
          <div className="logo">
            <span>⚡</span>
            Quiz Game
          </div>

          <p className="lobby-title">
            O‘yin kutish xonasida
          </p>

          <div className="pin-box">
            <p>O‘YIN PIN</p>
            <strong>{gamePin}</strong>
          </div>

          <p className="players-title">
            O‘yinchilar ({players.length})
          </p>

          <div className="players-list">
            {players.map((player, index) => (
              <div
                className="player"
                key={player.id}
              >
                <span className="player-number">
                  {index + 1}
                </span>

                <span>{player.name}</span>

                {index === 0 && (
                  <span className="host">
                    HOST
                  </span>
                )}
              </div>
            ))}
          </div>

          {isHost ? (
            <button
              className="main-btn start-btn"
              onClick={startGame}
            >
              🚀 Boshlash
            </button>
          ) : (
            <p className="waiting">
              Host o‘yinni boshlashini kuting...
            </p>
          )}

          <button
            className="leave-btn"
            onClick={leaveGame}
          >
            Chiqish
          </button>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (screen === "quiz" && question) {
    return (
      <div className="quiz-page">
        <div className="game-layout">
          <div className="quiz-card">
            <div className="quiz-top">
              <span>
                Savol {questionNumber} /{" "}
                {totalQuestions}
              </span>

              <span className={timerClass}>
                ⏱️ {timeLeft}s
              </span>

              <span className="score-display">
                🏆 {score}
              </span>
            </div>

            <div
              className="question-box question-animation"
              key={questionNumber}
            >
              <div className="question-label">
                SAVOL {questionNumber}
              </div>

              <h1>{question.question}</h1>
            </div>

            <div className="answers">
              {question.options.map(
                (option, index) => {
                  let className =
                    "answer-btn";

                  if (
                    selectedAnswer === index
                  ) {
                    className +=
                      " selected";
                  }

                  if (
                    answerResult !== null &&
                    selectedAnswer === index
                  ) {
                    className +=
                      answerResult
                        ? " correct"
                        : " wrong";
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() =>
                        submitAnswer(index)
                      }
                      disabled={
                        selectedAnswer !== null ||
                        answerResult !== null ||
                        questionEnded ||
                        timeLeft <= 0
                      }
                    >
                      <span>
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      {option}
                    </button>
                  );
                }
              )}
            </div>

            {answerResult !== null && (
              <div
                className={
                  answerResult
                    ? "result-message correct-message"
                    : "result-message wrong-message"
                }
              >
                {answerResult ? (
                  <>
                    <strong>
                      ✅ To‘g‘ri javob!
                    </strong>

                    <span>
                      +{earnedScore} ball
                    </span>

                    {bonus > 0 && (
                      <small>
                        🔥 Tezlik bonusi: +{bonus}
                      </small>
                    )}
                  </>
                ) : (
                  <strong>
                    ❌ Noto‘g‘ri javob!
                  </strong>
                )}
              </div>
            )}

            {questionEnded &&
              answerResult === null && (
                <div className="result-message wrong-message">
                  ⏰ Vaqt tugadi!
                </div>
              )}

            {selectedAnswer !== null &&
              answerResult !== null && (
                <div className="waiting">
                  ⏳ Boshqa o‘yinchilar javob berishini kuting...
                </div>
              )}
          </div>

          <div className="live-scoreboard">
            <div className="scoreboard-header">
              <span>📊</span>
              <h2>Jonli natijalar</h2>
            </div>

            <div className="scoreboard-list">
              {sortedLivePlayers.map(
                (player, index) => (
                  <div
                    className={
                      player.id === socket.id
                        ? "live-player current-player"
                        : "live-player"
                    }
                    key={player.id}
                  >
                    <div className="live-rank">
                      {index + 1}
                    </div>

                    <div className="live-player-info">
                      <strong>
                        {player.name}
                      </strong>

                      {player.id === socket.id && (
                        <small>Siz</small>
                      )}
                    </div>

                    <div className="live-score">
                      {player.score}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    return (
      <div className="quiz-page">
        <div className="result-card">
          <div className="logo">
            <span>🏆</span>
            O‘yin tugadi
          </div>

          <h1>Yakuniy natijalar</h1>

          <div className="podium">
            {sortedPlayers
              .slice(0, 3)
              .map((player, index) => (
                <div
                  key={player.id}
                  className={`podium-item place-${
                    index + 1
                  }`}
                >
                  <div className="podium-crown">
                    {index === 0
                      ? "👑"
                      : index === 1
                      ? "🥈"
                      : "🥉"}
                  </div>

                  <div className="podium-avatar">
                    {player.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <strong>{player.name}</strong>

                  <span>
                    {player.score} ball
                  </span>

                  <div className="podium-block">
                    {index + 1}
                  </div>
                </div>
              ))}
          </div>

          <div className="results-list">
            {sortedPlayers.map(
              (player, index) => (
                <div
                  className="result-player"
                  key={player.id}
                >
                  <span className="result-position">
                    {index + 1}
                  </span>

                  <span className="result-name">
                    {player.name}
                  </span>

                  <strong>
                    {player.score} ball
                  </strong>
                </div>
              )
            )}
          </div>

          <button
            className="main-btn"
            onClick={leaveGame}
          >
            🏠 Bosh sahifaga
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;

