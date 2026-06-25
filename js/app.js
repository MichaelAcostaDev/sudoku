const STORAGE_KEY = "sudoku-studio-save";
const TUTORIAL_KEY = "sudoku-studio-tutorial";
const DIFFICULTY_SETTINGS = {
  easy: { targetEmpty: 36, maxErrors: 5, bonus: 220, label: "Fácil" },
  medium: { targetEmpty: 42, maxErrors: 4, bonus: 360, label: "Medio" },
  hard: { targetEmpty: 48, maxErrors: 3, bonus: 520, label: "Difícil" },
  extreme: { targetEmpty: 54, maxErrors: 3, bonus: 700, label: "Extremo" },
};

const TUTORIAL_STEPS = [
  { title: "¿Qué es Sudoku?", text: "Sudoku es un juego de lógica en el que debes rellenar una cuadrícula 9×9 con números del 1 al 9 sin repetir en filas, columnas ni bloques de 3×3.", demo: "Cada fila, columna y bloque debe quedar completo y sin repeticiones." },
  { title: "Objetivo", text: "Tu meta es completar todas las celdas vacías con la solución correcta antes de agotar los errores permitidos.", demo: "Las celdas fijas ya están resueltas y no se pueden modificar." },
  { title: "Filas", text: "Cada fila debe contener todos los números del 1 al 9 exactamente una vez.", demo: "Observa cómo se reparten los valores según la fila actual." },
  { title: "Columnas", text: "Cada columna debe cumplir el mismo principio, evitando repeticiones.", demo: "Las columnas y las filas comparten la misma lógica de validación." },
  { title: "Bloques 3×3", text: "Cada bloque de 3×3 también debe contener los números del 1 al 9 una vez cada uno.", demo: "Los bloques están separados por líneas más gruesas para facilitar la lectura." },
  { title: "Modo lápiz", text: "Activa el lápiz para dejar notas temporales y probar posibles soluciones sin comprometer el tablero.", demo: "Las anotaciones aparecen pequeñas en cada celda y ayudan a analizar." },
  { title: "Pistas", text: "Cada partida incluye hasta 3 pistas. Se revelará un número correcto y se descontará puntos.", demo: "Las pistas son útiles cuando el tablero se complica." },
  { title: "Errores", text: "Los errores cuentan contra tu límite. Al alcanzarlo, la partida termina y aparece la pantalla de derrota.", demo: "Cuida tus decisiones si quieres mantener la puntuación alta." },
  { title: "Puntuación", text: "La puntuación final combina dificultad, tiempo, errores y pistas. Cuanto mejor juegues, mejor será tu resultado.", demo: "El temporizador y el contador de errores se actualizan en tiempo real." },
  { title: "Comenzar a jugar", text: "Ya estás listo para empezar. Selecciona una celda, añade un número y disfruta del juego.", demo: "Tu experiencia comienza con una partida nueva y una cuadrícula lista para resolver." },
];

const state = {
  difficulty: "easy",
  initialBoard: [],
  solutionBoard: [],
  currentBoard: [],
  notesBoard: [],
  fixedCells: [],
  errors: 0,
  maxErrors: 5,
  elapsedSeconds: 0,
  timerInterval: null,
  selectedCell: null,
  isNoteMode: false,
  isPaused: false,
  gameFinished: false,
  hintsUsed: 0,
  history: [],
  tutorialCompleted: false,
};

const boardElement = document.getElementById("board");
const boardWrapper = document.getElementById("boardWrapper");
const timerElement = document.getElementById("timer");
const errorsElement = document.getElementById("errors");
const hintsElement = document.getElementById("hints");
const scoreElement = document.getElementById("score");
const difficultySelect = document.getElementById("difficultySelect");
const currentDifficulty = document.getElementById("currentDifficulty");
const modeLabel = document.getElementById("modeLabel");
const pauseOverlay = document.getElementById("pauseOverlay");
const tutorialOverlay = document.getElementById("tutorialOverlay");
const continueOverlay = document.getElementById("continueOverlay");
const confirmOverlay = document.getElementById("confirmOverlay");
const resultModal = document.getElementById("resultModal");
const pauseBtn = document.getElementById("pauseBtn");
const pencilBtn = document.getElementById("pencilBtn");
const undoBtn = document.getElementById("undoBtn");
const hintBtn = document.getElementById("hintBtn");
const tutorialBtn = document.getElementById("tutorialBtn");
const newGameBtn = document.getElementById("newGameBtn");
const restartBtn = document.getElementById("restartBtn");
const resumeBtn = document.getElementById("resumeBtn");
const pauseRestartBtn = document.getElementById("pauseRestartBtn");
const pauseNewGameBtn = document.getElementById("pauseNewGameBtn");
const pauseExitBtn = document.getElementById("pauseExitBtn");
const tutorialPrev = document.getElementById("tutorialPrev");
const tutorialNext = document.getElementById("tutorialNext");
const tutorialSkip = document.getElementById("tutorialSkip");
const tutorialFinish = document.getElementById("tutorialFinish");
const continueGameBtn = document.getElementById("continueGameBtn");
const newSavedGameBtn = document.getElementById("newSavedGameBtn");
const cancelNewGameBtn = document.getElementById("cancelNewGameBtn");
const confirmNewGameBtn = document.getElementById("confirmNewGameBtn");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultDetails = document.getElementById("resultDetails");
const resultNewGameBtn = document.getElementById("resultNewGameBtn");
const resultCloseBtn = document.getElementById("resultCloseBtn");
const mobileKeypad = document.getElementById("mobileKeypad");
const numPad = document.getElementById("numPad");
const tutorialTitle = document.getElementById("tutorialTitle");
const tutorialText = document.getElementById("tutorialText");
const tutorialDemo = document.getElementById("tutorialDemo");
const progressDots = document.getElementById("progressDots");
const pauseTime = document.getElementById("pauseTime");
const pauseDifficulty = document.getElementById("pauseDifficulty");
const pauseErrors = document.getElementById("pauseErrors");
const pauseScore = document.getElementById("pauseScore");
const confettiLayer = document.getElementById("confettiLayer");
const toastContainer = document.getElementById("toastContainer");

let tutorialStep = 0;

function init() {
  bindEvents();
  renderNumberPad();
  renderMobileKeypad();
  loadTutorialState();
  const savedGame = loadSavedGame();
  if (savedGame) {
    showContinueOverlay();
  } else if (!state.tutorialCompleted) {
    showTutorial();
  } else {
    startNewGame();
  }
}

function bindEvents() {
  if (difficultySelect) {
    difficultySelect.addEventListener("change", (event) => {
      state.difficulty = event.target.value;
      openNewGameConfirm();
    });
  }

  if (newGameBtn) newGameBtn.addEventListener("click", openNewGameConfirm);
  if (restartBtn) restartBtn.addEventListener("click", restartGame);
  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  if (resumeBtn) resumeBtn.addEventListener("click", resumeGame);
  if (pauseRestartBtn) pauseRestartBtn.addEventListener("click", restartGame);
  if (pauseNewGameBtn) pauseNewGameBtn.addEventListener("click", openNewGameConfirm);
  if (pauseExitBtn) {
    pauseExitBtn.addEventListener("click", () => {
      hideOverlay(pauseOverlay);
      state.isPaused = false;
      state.gameFinished = true;
      if (boardWrapper) boardWrapper.classList.remove("paused");
      showToast("info", "Salida", "Has dejado la partida en pausa.");
    });
  }
  if (pencilBtn) pencilBtn.addEventListener("click", toggleNoteMode);
  if (undoBtn) undoBtn.addEventListener("click", undoMove);
  if (hintBtn) hintBtn.addEventListener("click", useHint);
  if (tutorialBtn) tutorialBtn.addEventListener("click", showTutorial);
  if (tutorialPrev) tutorialPrev.addEventListener("click", () => changeTutorialStep(-1));
  if (tutorialNext) tutorialNext.addEventListener("click", () => changeTutorialStep(1));
  if (tutorialSkip) tutorialSkip.addEventListener("click", finishTutorial);
  if (tutorialFinish) tutorialFinish.addEventListener("click", finishTutorial);
  if (continueGameBtn) {
    continueGameBtn.addEventListener("click", () => {
      hideOverlay(continueOverlay);
      if (!state.tutorialCompleted) {
        showTutorial();
      } else {
        continueSavedGame();
      }
    });
  }
  if (newSavedGameBtn) {
    newSavedGameBtn.addEventListener("click", () => {
      hideOverlay(continueOverlay);
      if (!state.tutorialCompleted) {
        showTutorial();
      } else {
        startNewGame();
      }
    });
  }
  if (cancelNewGameBtn) cancelNewGameBtn.addEventListener("click", () => hideOverlay(confirmOverlay));
  if (confirmNewGameBtn) {
    confirmNewGameBtn.addEventListener("click", () => {
      hideOverlay(confirmOverlay);
      startNewGame();
    });
  }
  if (resultNewGameBtn) resultNewGameBtn.addEventListener("click", startNewGame);
  if (resultCloseBtn) resultCloseBtn.addEventListener("click", () => hideOverlay(resultModal));
  document.addEventListener("keydown", handleKeyboardInput);
}

function loadTutorialState() {
  state.tutorialCompleted = localStorage.getItem(TUTORIAL_KEY) === "true";
}

function persistTutorialState() {
  localStorage.setItem(TUTORIAL_KEY, String(state.tutorialCompleted));
}

function loadSavedGame() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (!parsed || !parsed.initialBoard || !parsed.solutionBoard || !parsed.currentBoard) return null;
    state.difficulty = parsed.difficulty || "easy";
    state.initialBoard = parsed.initialBoard.map((row) => [...row]);
    state.solutionBoard = parsed.solutionBoard.map((row) => [...row]);
    state.currentBoard = parsed.currentBoard.map((row) => [...row]);
    state.notesBoard = (parsed.notesBoard || []).map((row) => row.map((notes) => [...notes]));
    state.errors = parsed.errors || 0;
    state.elapsedSeconds = parsed.elapsedSeconds || 0;
    state.maxErrors = DIFFICULTY_SETTINGS[state.difficulty].maxErrors;
    state.hintsUsed = parsed.hintsUsed || 0;
    state.fixedCells = buildFixedCells(state.initialBoard);
    state.gameFinished = false;
    state.isPaused = false;
    state.isNoteMode = false;
    state.history = [];
    difficultySelect.value = state.difficulty;
    updateStatus();
    renderBoard();
    return parsed;
  } catch (error) {
    console.error("No se pudo restaurar la partida:", error);
    return null;
  }
}

function persistGame() {
  const payload = {
    difficulty: state.difficulty,
    initialBoard: state.initialBoard.map((row) => [...row]),
    solutionBoard: state.solutionBoard.map((row) => [...row]),
    currentBoard: state.currentBoard.map((row) => [...row]),
    notesBoard: state.notesBoard.map((row) => row.map((notes) => [...notes])),
    errors: state.errors,
    elapsedSeconds: state.elapsedSeconds,
    hintsUsed: state.hintsUsed,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function clearSavedGame() {
  localStorage.removeItem(STORAGE_KEY);
}

function startNewGame() {
  clearSavedGame();
  state.difficulty = difficultySelect.value || state.difficulty;
  state.maxErrors = DIFFICULTY_SETTINGS[state.difficulty].maxErrors;
  const puzzle = generatePuzzle(state.difficulty);
  state.initialBoard = puzzle.initialBoard;
  state.solutionBoard = puzzle.solutionBoard;
  state.currentBoard = puzzle.initialBoard.map((row) => [...row]);
  state.notesBoard = createEmptyNotes();
  state.fixedCells = buildFixedCells(state.initialBoard);
  state.errors = 0;
  state.elapsedSeconds = 0;
  state.hintsUsed = 0;
  state.gameFinished = false;
  state.isPaused = false;
  state.isNoteMode = false;
  state.selectedCell = null;
  state.history = [];
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = null;
  hideOverlay(resultModal);
  hideOverlay(pauseOverlay);
  hideOverlay(continueOverlay);
  hideOverlay(tutorialOverlay);
  hideOverlay(confirmOverlay);
  if (boardWrapper) boardWrapper.classList.remove("paused");
  pencilBtn.classList.remove("active");
  pauseBtn.textContent = "Pausa";
  updateStatus();
  renderBoard();
  startTimer();
  showToast("success", "Nueva partida", `Dificultad: ${DIFFICULTY_SETTINGS[state.difficulty].label}`);
}

function restartGame() {
  if (!state.initialBoard.length) return;
  clearSavedGame();
  state.currentBoard = state.initialBoard.map((row) => [...row]);
  state.notesBoard = createEmptyNotes();
  state.errors = 0;
  state.elapsedSeconds = 0;
  state.hintsUsed = 0;
  state.gameFinished = false;
  state.isPaused = false;
  state.selectedCell = null;
  state.history = [];
  state.isNoteMode = false;
  pencilBtn.classList.remove("active");
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = null;
  hideOverlay(resultModal);
  hideOverlay(pauseOverlay);
  hideOverlay(confirmOverlay);
  if (boardWrapper) boardWrapper.classList.remove("paused");
  updateStatus();
  renderBoard();
  startTimer();
  showToast("info", "Reiniciado", "La partida ha vuelto a empezar.");
}

function continueSavedGame() {
  hideOverlay(continueOverlay);
  state.maxErrors = DIFFICULTY_SETTINGS[state.difficulty].maxErrors;
  state.fixedCells = buildFixedCells(state.initialBoard);
  state.isPaused = false;
  state.gameFinished = false;
  state.isNoteMode = false;
  pencilBtn.classList.remove("active");
  updateStatus();
  renderBoard();
  startTimer();
  showToast("info", "Partida restaurada", "Tu progreso anterior ya está disponible.");
}

function createEmptyNotes() {
  return Array.from({ length: 9 }, () => Array(9).fill(0).map(() => []));
}

function buildFixedCells(board) {
  const fixed = [];
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value !== 0) fixed.push(`${rowIndex}-${colIndex}`);
    });
  });
  return fixed;
}

function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    if (!state.isPaused && !state.gameFinished) {
      state.elapsedSeconds += 1;
      updateStatus();
      persistGame();
    }
  }, 1000);
}

function togglePause() {
  if (state.gameFinished) return;
  state.isPaused = !state.isPaused;
  pauseBtn.textContent = state.isPaused ? "Reanudar" : "Pausa";
  pauseTime.textContent = formatTime(state.elapsedSeconds);
  pauseDifficulty.textContent = DIFFICULTY_SETTINGS[state.difficulty].label;
  pauseErrors.textContent = `${state.errors}/${state.maxErrors}`;
  pauseScore.textContent = calculateScore();
  if (state.isPaused) {
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (boardWrapper) boardWrapper.classList.add("paused");
    showOverlay(pauseOverlay);
    showToast("warning", "Pausa", "La partida está en pausa.");
  } else {
    if (boardWrapper) boardWrapper.classList.remove("paused");
    hideOverlay(pauseOverlay);
    startTimer();
  }
  persistGame();
}

function resumeGame() {
  if (!state.isPaused) return;
  togglePause();
}

function toggleNoteMode() {
  state.isNoteMode = !state.isNoteMode;
  if (pencilBtn) {
    pencilBtn.classList.toggle("active", state.isNoteMode);
    pencilBtn.textContent = state.isNoteMode ? "✎ Lápiz activo" : "✎ Lápiz";
  }
  if (modeLabel) {
    modeLabel.textContent = state.isNoteMode ? "Lápiz" : "Normal";
  }
}

function handleKeyboardInput(event) {
  if (state.isPaused || state.gameFinished || !state.currentBoard.length) return;
  if (event.key >= "1" && event.key <= "9") {
    placeValue(Number(event.key));
  } else if (event.key === "Backspace" || event.key === "Delete") {
    clearSelectedCell();
  }
}

function renderNumberPad() {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numPad.innerHTML = "";
  values.forEach((value) => {
    const button = document.createElement("button");
    button.textContent = value;
    button.addEventListener("click", () => placeValue(value));
    numPad.appendChild(button);
  });
  const clearButton = document.createElement("button");
  clearButton.className = "clear-btn";
  clearButton.textContent = "Borrar";
  clearButton.addEventListener("click", clearSelectedCell);
  numPad.appendChild(clearButton);
}

function renderMobileKeypad() {
  const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Borrar"];
  mobileKeypad.innerHTML = "";
  values.forEach((value) => {
    const button = document.createElement("button");
    button.textContent = value;
    button.addEventListener("click", () => {
      if (value === "Borrar") {
        clearSelectedCell();
      } else {
        placeValue(Number(value));
      }
    });
    mobileKeypad.appendChild(button);
  });
}

function renderBoard() {
  boardElement.innerHTML = "";
  const selectedRow = state.selectedCell ? state.selectedCell.row : null;
  const selectedCol = state.selectedCell ? state.selectedCell.col : null;
  const selectedValue = state.selectedCell ? state.currentBoard[state.selectedCell.row][state.selectedCell.col] : 0;

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.type = "button";
      const value = state.currentBoard[row][col];
      const isFixed = state.fixedCells.includes(`${row}-${col}`);
      const isSelected = selectedRow === row && selectedCol === col;
      const isSameValue = selectedValue !== 0 && value !== 0 && value === selectedValue;
      const isHighlightRow = selectedRow === row;
      const isHighlightCol = selectedCol === col;
      const isHighlightBox = selectedRow !== null && selectedCol !== null && getBoxIndex(selectedRow, selectedCol) === getBoxIndex(row, col);

      if (isFixed) cell.classList.add("locked");
      if (isSelected) cell.classList.add("selected");
      if (isHighlightRow) cell.classList.add("highlight-row");
      if (isHighlightCol) cell.classList.add("highlight-col");
      if (isHighlightBox) cell.classList.add("highlight-box");
      if (isSameValue) cell.classList.add("same-value");
      if (value !== 0 && !isValidPlacementAt(row, col, value, true)) cell.classList.add("invalid");

      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.style.animationDelay = `${(row * 18 + col * 8) % 240}ms`;
      cell.addEventListener("click", () => selectCell(row, col));

      if (value !== 0) {
        cell.textContent = value;
      } else {
        const notes = state.notesBoard[row][col];
        if (notes.length) {
          cell.classList.add("notes");
          notes.forEach((note) => {
            const noteSpan = document.createElement("span");
            noteSpan.className = "cell-note";
            noteSpan.textContent = note;
            cell.appendChild(noteSpan);
          });
        }
      }

      boardElement.appendChild(cell);
    }
  }
}

function selectCell(row, col) {
  if (state.isPaused || state.gameFinished) return;
  const isFixed = state.fixedCells.includes(`${row}-${col}`);
  if (isFixed) return;
  state.selectedCell = { row, col };
  renderBoard();
}

function placeValue(value) {
  if (!state.selectedCell || state.isPaused || state.gameFinished) return;
  const { row, col } = state.selectedCell;
  const isFixed = state.fixedCells.includes(`${row}-${col}`);
  if (isFixed) return;

  const previousState = captureState();
  if (state.isNoteMode) {
    toggleNote(row, col, value);
    return;
  }

  if (state.currentBoard[row][col] !== 0) {
    state.currentBoard[row][col] = 0;
  }

  const valid = isValidPlacementAt(row, col, value, false);
  if (valid) {
    state.currentBoard[row][col] = value;
    state.notesBoard[row][col] = [];
    state.history.push(previousState);
    flashCell(row, col, "revealed");
    if (isBoardSolved()) {
      finishGame(true);
      return;
    }
  } else {
    state.errors += 1;
    state.history.push(previousState);
    flashCell(row, col, "invalid");
    showToast("error", "Número incorrecto", `Errores: ${state.errors}/${state.maxErrors}`);
  }

  updateStatus();
  renderBoard();
  persistGame();
}

function toggleNote(row, col, value) {
  if (state.currentBoard[row][col] !== 0) return;
  const notes = state.notesBoard[row][col];
  const index = notes.indexOf(value);
  if (index >= 0) {
    notes.splice(index, 1);
  } else {
    notes.push(value);
    notes.sort((a, b) => a - b);
  }
  state.notesBoard[row][col] = notes;
  state.currentBoard[row][col] = 0;
  state.history.push(captureState());
  updateStatus();
  renderBoard();
  persistGame();
}

function clearSelectedCell() {
  if (!state.selectedCell || state.isPaused || state.gameFinished) return;
  const { row, col } = state.selectedCell;
  const isFixed = state.fixedCells.includes(`${row}-${col}`);
  if (isFixed) return;
  const previousState = captureState();
  state.currentBoard[row][col] = 0;
  state.notesBoard[row][col] = [];
  state.history.push(previousState);
  updateStatus();
  renderBoard();
  persistGame();
}

function undoMove() {
  if (!state.history.length) return;
  const previousState = state.history.pop();
  state.currentBoard = previousState.currentBoard.map((row) => [...row]);
  state.notesBoard = previousState.notesBoard.map((row) => row.map((notes) => [...notes]));
  state.errors = previousState.errors;
  state.elapsedSeconds = previousState.elapsedSeconds;
  state.hintsUsed = previousState.hintsUsed;
  state.gameFinished = previousState.gameFinished;
  state.isPaused = previousState.isPaused;
  updateStatus();
  renderBoard();
  persistGame();
  showToast("warning", "↩ Movimiento revertido", "El último cambio ha sido deshecho.");
}

function useHint() {
  if (state.hintsUsed >= 3 || state.gameFinished || state.isPaused) return;
  const emptyCells = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.currentBoard[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  if (!emptyCells.length) return;
  const target = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const previousState = captureState();
  state.currentBoard[target.row][target.col] = state.solutionBoard[target.row][target.col];
  state.notesBoard[target.row][target.col] = [];
  state.hintsUsed += 1;
  state.history.push(previousState);
  flashCell(target.row, target.col, "revealed");
  updateStatus();
  renderBoard();
  persistGame();
  showToast("warning", "💡 Pista utilizada", `Se reveló un número correcto. Pistas restantes: ${Math.max(0, 3 - state.hintsUsed)}`);
  if (isBoardSolved()) {
    finishGame(true);
  }
}

function isValidPlacementAt(row, col, value, skipSelf) {
  for (let index = 0; index < 9; index += 1) {
    if (index !== col && state.currentBoard[row][index] === value) return false;
    if (index !== row && state.currentBoard[index][col] === value) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxCol; c < boxCol + 3; c += 1) {
      if ((r !== row || c !== col) && state.currentBoard[r][c] === value) return false;
    }
  }
  if (!skipSelf && state.initialBoard[row][col] !== 0 && state.initialBoard[row][col] !== value) return false;
  return true;
}

function isBoardSolved() {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.currentBoard[row][col] !== state.solutionBoard[row][col]) return false;
    }
  }
  return true;
}

function finishGame(victory) {
  if (state.gameFinished) return;
  state.gameFinished = true;
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  hideOverlay(pauseOverlay);
  hideOverlay(tutorialOverlay);
  hideOverlay(continueOverlay);
  if (victory) {
    resultTitle.textContent = "¡Sudoku Completado!";
    resultMessage.textContent = `Has completado el tablero en ${formatTime(state.elapsedSeconds)}.`;
    resultDetails.innerHTML = `<div><strong>Dificultad:</strong> ${DIFFICULTY_SETTINGS[state.difficulty].label}</div><div><strong>Tiempo:</strong> ${formatTime(state.elapsedSeconds)}</div><div><strong>Puntuación:</strong> ${calculateScore()}</div><div><strong>Errores:</strong> ${state.errors}</div><div><strong>Pistas usadas:</strong> ${state.hintsUsed}</div>`;
    triggerConfetti();
    showToast("success", "🎉 Sudoku completado", "Tu partida ha terminado con éxito.");
    showOverlay(resultModal);
  } else {
    resultTitle.textContent = "Has alcanzado el límite de errores";
    resultMessage.textContent = "La partida ha terminado. Puedes intentarlo de nuevo o abrir una nueva.";
    resultDetails.innerHTML = `<div><strong>Dificultad:</strong> ${DIFFICULTY_SETTINGS[state.difficulty].label}</div><div><strong>Tiempo jugado:</strong> ${formatTime(state.elapsedSeconds)}</div><div><strong>Errores:</strong> ${state.errors}</div>`;
    showToast("error", "❌ Límite de errores", "La partida ha terminado.");
    showOverlay(resultModal);
  }
  clearSavedGame();
  updateStatus();
}

function updateStatus() {
  if (timerElement) timerElement.textContent = formatTime(state.elapsedSeconds);
  if (errorsElement) errorsElement.textContent = `${state.errors}/${state.maxErrors}`;
  if (hintsElement) hintsElement.textContent = `${Math.max(0, 3 - state.hintsUsed)}/3`;
  if (scoreElement) scoreElement.textContent = calculateScore();
  if (currentDifficulty) currentDifficulty.textContent = DIFFICULTY_SETTINGS[state.difficulty].label;
  if (pauseErrors) pauseErrors.textContent = `${state.errors}/${state.maxErrors}`;
  if (pauseScore) pauseScore.textContent = calculateScore();
  if (state.errors >= state.maxErrors) {
    finishGame(false);
  }
}

function calculateScore() {
  const base = 1000;
  const difficultyBonus = DIFFICULTY_SETTINGS[state.difficulty].bonus;
  const timePenalty = Math.floor(state.elapsedSeconds / 12) * 6;
  const errorPenalty = state.errors * 80;
  const hintPenalty = state.hintsUsed * 120;
  return Math.max(120, base + difficultyBonus - timePenalty - errorPenalty - hintPenalty);
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function captureState() {
  return {
    currentBoard: state.currentBoard.map((row) => [...row]),
    notesBoard: state.notesBoard.map((row) => row.map((notes) => [...notes])),
    errors: state.errors,
    elapsedSeconds: state.elapsedSeconds,
    hintsUsed: state.hintsUsed,
    gameFinished: state.gameFinished,
    isPaused: state.isPaused,
  };
}

function generatePuzzle(difficulty) {
  const solutionBoard = createSolvedBoard();
  const initialBoard = solutionBoard.map((row) => [...row]);
  const targetEmpty = DIFFICULTY_SETTINGS[difficulty].targetEmpty;
  const positions = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      positions.push({ row, col });
    }
  }

  shuffleArray(positions);
  let removed = 0;
  for (const position of positions) {
    if (removed >= targetEmpty) break;
    const { row, col } = position;
    const backup = initialBoard[row][col];
    initialBoard[row][col] = 0;
    if (countSolutions(initialBoard) !== 1) {
      initialBoard[row][col] = backup;
    } else {
      removed += 1;
    }
  }

  return { initialBoard, solutionBoard };
}

function createSolvedBoard() {
  const base = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => ((row * 3 + Math.floor(row / 3) + col) % 9) + 1)
  );

  const bandOrder = shuffleArray([0, 1, 2]);
  const rowOrder = bandOrder.flatMap((band) => shuffleArray([band * 3, band * 3 + 1, band * 3 + 2]));
  const stackOrder = shuffleArray([0, 1, 2]);
  const colOrder = stackOrder.flatMap((stack) => shuffleArray([stack * 3, stack * 3 + 1, stack * 3 + 2]));

  let board = rowOrder.map((row) => colOrder.map((col) => base[row][col]));
  const digitMap = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  board = board.map((row) => row.map((value) => digitMap[value - 1]));

  if (Math.random() > 0.5) {
    board = transposeBoard(board);
  }
  if (Math.random() > 0.5) {
    board = board.map((row) => [...row].reverse());
  }

  return board;
}

function transposeBoard(board) {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

function countSolutions(board) {
  const workingBoard = board.map((row) => [...row]);
  let solutions = 0;
  const solve = () => {
    if (solutions >= 2) return;
    const emptyPosition = findEmptyCell(workingBoard);
    if (!emptyPosition) {
      solutions += 1;
      return;
    }
    const { row, col } = emptyPosition;
    for (const value of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (isValidResolved(workingBoard, row, col, value)) {
        workingBoard[row][col] = value;
        solve();
        workingBoard[row][col] = 0;
      }
    }
  };
  solve();
  return solutions;
}

function findEmptyCell(board) {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) return { row, col };
    }
  }
  return null;
}

function isValidResolved(board, row, col, value) {
  for (let index = 0; index < 9; index += 1) {
    if (board[row][index] === value) return false;
    if (board[index][col] === value) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxCol; c < boxCol + 3; c += 1) {
      if (board[r][c] === value) return false;
    }
  }
  return true;
}

function getBoxIndex(row, col) {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

function showTutorial() {
  tutorialStep = 0;
  renderTutorialStep();
  showOverlay(tutorialOverlay);
}

function changeTutorialStep(direction) {
  tutorialStep += direction;
  if (tutorialStep < 0) tutorialStep = 0;
  if (tutorialStep >= TUTORIAL_STEPS.length) {
    finishTutorial();
    return;
  }
  renderTutorialStep();
}

function renderTutorialStep() {
  const step = TUTORIAL_STEPS[tutorialStep];
  tutorialTitle.textContent = step.title;
  tutorialText.textContent = step.text;
  tutorialDemo.textContent = step.demo;
  tutorialPrev.disabled = tutorialStep === 0;
  tutorialNext.textContent = tutorialStep === TUTORIAL_STEPS.length - 1 ? "Finalizar" : "Siguiente";
  progressDots.innerHTML = "";
  TUTORIAL_STEPS.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `progress-dot${index === tutorialStep ? " active" : ""}`;
    progressDots.appendChild(dot);
  });
}

function finishTutorial() {
  state.tutorialCompleted = true;
  persistTutorialState();
  hideOverlay(tutorialOverlay);
  if (!state.initialBoard.length) {
    startNewGame();
  }
}

function openNewGameConfirm() {
  showOverlay(confirmOverlay);
}

function showContinueOverlay() {
  showOverlay(continueOverlay);
}

function showOverlay(element) {
  element.classList.remove("hidden");
}

function hideOverlay(element) {
  element.classList.add("hidden");
}

function flashCell(row, col, className) {
  const selector = `.cell[data-row="${row}"][data-col="${col}"]`;
  const cell = boardElement.querySelector(selector);
  if (cell) {
    cell.classList.add(className);
    setTimeout(() => cell.classList.remove(className), 420);
  }
}

function triggerConfetti() {
  confettiLayer.innerHTML = "";
  const colors = ["#4A6CF7", "#355DE8", "#FFC107", "#2AB673"];
  for (let index = 0; index < 36; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = "-20px";
    piece.style.background = colors[index % colors.length];
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

function showToast(type, title, message) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-message">${message}</div>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function shuffleArray(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

document.addEventListener("DOMContentLoaded", init);
