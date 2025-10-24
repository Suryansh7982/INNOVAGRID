const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

function render() {
  const app = document.getElementById('app');

  if (currentQuestion >= quizData.length) {
    renderResults(app);
  } else {
    renderQuestion(app);
  }
}

function renderQuestion(app) {
  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  app.innerHTML = `
    <div class="header">
      <div class="progress-info">
        <span>Question ${currentQuestion + 1} of ${quizData.length}</span>
        <span class="score">Score: ${score}/${quizData.length}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="question">${question.question}</div>
    </div>
    <div class="options">
      ${question.options.map((option, index) => `
        <div class="option ${selectedAnswer === index ? 'selected' : ''}" onclick="selectAnswer(${index})">
          <div class="option-letter">${String.fromCharCode(65 + index)}</div>
          <div class="option-text">${option}</div>
        </div>
      `).join('')}
    </div>
    <button class="next-btn" onclick="nextQuestion()" ${selectedAnswer === null ? 'disabled' : ''}>
      ${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
    </button>
  `;
}

function renderResults(app) {
  const percentage = (score / quizData.length) * 100;
  let message = '';
  let messageClass = '';

  if (percentage >= 80) {
    message = 'Excellent work!';
    messageClass = 'excellent';
  } else if (percentage >= 60) {
    message = 'Good job!';
    messageClass = 'good';
  } else if (percentage >= 40) {
    message = 'Not bad! Keep practicing!';
    messageClass = 'average';
  } else {
    message = 'Keep learning! You\'ll do better next time!';
    messageClass = 'poor';
  }

  app.innerHTML = `
    <div class="result-container">
      <div class="trophy">🏆</div>
      <div class="result-title">Quiz Complete!</div>
      <div class="score-box">
        <div class="score-number">${score}/${quizData.length}</div>
        <div class="score-label">Your Score</div>
        <div class="percentage">${percentage.toFixed(0)}% Correct</div>
      </div>
      <div class="message ${messageClass}">${message}</div>
      <button class="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
    </div>
  `;
}

function selectAnswer(index) {
  selectedAnswer = index;
  render();
}

function nextQuestion() {
  if (selectedAnswer === null) return;

  if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
    score++;
  }

  currentQuestion++;
  selectedAnswer = null;
  render();
}

function restartQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  render();
}

render();
