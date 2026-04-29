const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('startGame');
const resetBtn = document.getElementById('resetSettings');
const playersCount = document.getElementById('playersCount');
const player1Name = document.getElementById('player1Name');
const player2Name = document.getElementById('player2Name');
const player2Label = document.getElementById('player2Label');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const difficulty = document.getElementById('difficulty');
const moveCountDisplay = document.getElementById('moveCount');
const turnDisplay = document.getElementById('turnDisplay');
const timerDisplay = document.getElementById('timer');
const roundsInput = document.getElementById('rounds');
const gameInfo = document.getElementById('gameInfo');
const scoreDisplay = document.getElementById('scoreDisplay');

let symbols = ['🍎','🍌','🍇','🍒','🍉','🥝','🍑','🍍','🍓','🍋','🍊','🥭','🍐','🥥','🍈','🍏','🍓','🍔','🍕','🌮','🍩','🍪','🍦','🥐','🧁','🍿','🍱','🍣','🍜','🍝','🍪','🍰','🍧'];
let cards = [];
let flippedCards = [];
let moveCount = 0;
let matchedPairs = 0;
let totalPairs = 8;

let currentPlayer = 0;
let playerScores = [0, 0];
let playerNames = ['Гравець 1', 'Гравець 2'];
let maxRounds = 1;
let currentRound = 1;
let totalPlayers = 1;

let timer;
let timeLeft = 0;

playersCount.addEventListener('change', () => {
  player2Label.style.display = playersCount.value === '2' ? 'block' : 'none';
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.textContent = '';
  card.addEventListener('click', handleCardClick);
  return card;
}

function startTimer() {
  clearInterval(timer);
  const limits = { easy: 180, normal: 120, hard: 60 };
  timeLeft = limits[difficulty.value];
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endRound();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moveCount++;
    moveCountDisplay.textContent = moveCount;

    const [first, second] = flippedCards;
    if (first.dataset.symbol === second.dataset.symbol) {
      first.classList.add('matched');
      second.classList.add('matched');
      matchedPairs++;
      playerScores[currentPlayer]++;
      updateScore();

      if (matchedPairs === totalPairs) {
        clearInterval(timer);
        endRound();
      }

      flippedCards = [];
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.textContent = '';
        second.textContent = '';
        flippedCards = [];
        switchTurn();
      }, 1000);
    }
  }
}

function updateScore() {
  if (totalPlayers === 1) {
    scoreDisplay.textContent = `${playerNames[0]}: ${playerScores[0]}`;
  } else {
    scoreDisplay.textContent = `${playerNames[0]}: ${playerScores[0]} | ${playerNames[1]}: ${playerScores[1]}`;
  }
}

function switchTurn() {
  if (totalPlayers === 2) {
    currentPlayer = 1 - currentPlayer;
    turnDisplay.textContent = playerNames[currentPlayer];
  }
}

function initGame() {
  board.innerHTML = '';
  moveCount = 0;
  matchedPairs = 0;
  flippedCards = [];
  moveCountDisplay.textContent = 0;
  totalPlayers = parseInt(playersCount.value);

  playerScores = [0, 0];
  playerNames[0] = player1Name.value || 'Гравець 1';
  playerNames[1] = player2Name.value || 'Гравець 2';
  currentPlayer = 0;

  turnDisplay.textContent = playerNames[currentPlayer];
  updateScore();

  gameInfo.style.display = 'block';
  restartBtn.style.display = 'inline-block';

  const rows = parseInt(rowsInput.value, 10);
  const cols = parseInt(colsInput.value, 10);
  const totalCards = rows * cols;

  if (rows < 4 || cols < 4) {
    alert('Розмір поля має бути не менше 4×4.');
    return;
  }

  if (totalCards % 2 !== 0) {
    alert('Загальна кількість карток має бути парною. Виберіть інший розмір поля.');
    return;
  }

  totalPairs = totalCards / 2;
  if (totalPairs > symbols.length) {
    alert(`Максимальна кількість пар – ${symbols.length}. Виберіть менший розмір поля.`);
    return;
  }

  board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
  const roundCards = shuffle([...symbols.slice(0, totalPairs), ...symbols.slice(0, totalPairs)]);
  roundCards.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });

  startTimer();
}

function resetSettings() {
  player1Name.value = 'Гравець 1';
  player2Name.value = 'Гравець 2';
  playersCount.value = '1';
  rowsInput.value = '4';
  colsInput.value = '4';
  roundsInput.value = '1';
  difficulty.value = 'easy';
  player2Label.style.display = 'none';
}

function endRound() {
  currentRound++;

  if (currentRound > maxRounds) {
    let winner = playerScores[0] > playerScores[1] ? playerNames[0]
                : playerScores[1] > playerScores[0] ? playerNames[1]
                : 'Нічия';
    alert(`Гру завершено! Переможець: ${winner}`);
    resetSettings();
    gameInfo.style.display = 'none';
    restartBtn.style.display = 'none';
    board.innerHTML = '';
  } else {
    alert(`Раунд ${currentRound - 1} завершено. Наступний раунд!`);
    playerScores = [0, 0];
    initGame();
  }
}

startBtn.addEventListener('click', () => {
  maxRounds = parseInt(roundsInput.value, 10);
  currentRound = 1;
  initGame();
});

restartBtn.addEventListener('click', initGame);
resetBtn.addEventListener('click', resetSettings);