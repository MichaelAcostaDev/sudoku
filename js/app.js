const STORAGE_KEY = "sudoku-studio-save";
const TUTORIAL_KEY = "sudoku-studio-tutorial";
const DIFFICULTY_SETTINGS = {
  easy: { targetEmpty: 44, maxErrors: 5, bonus: 220 },
  medium: { targetEmpty: 48, maxErrors: 4, bonus: 360 },
  hard: { targetEmpty: 52, maxErrors: 3, bonus: 520 },
  extreme: { targetEmpty: 54, maxErrors: 3, bonus: 700 },
};

const TRANSLATIONS = {
  en: {
    documentTitle: "Sudoku Studio",
    gameTagline: "Logic game",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    extreme: "Extreme",
    tutorialButton: "Tutorial",
    newGame: "New game",
    pause: "Pause",
    resume: "Resume",
    statusRegion: "Game status",
    time: "Time",
    errors: "Errors",
    hints: "Hints",
    score: "Score",
    boardLabel: "Sudoku board",
    numberPadLabel: "Number pad",
    mobileKeypadLabel: "Touch keypad",
    pencil: "✎ Notes",
    pencilActive: "✎ Notes on",
    undo: "↶ Undo",
    hint: "💡 Hint",
    restart: "↻ Restart",
    clear: "Clear",
    footerCredit: "Created by Michael Acosta",
    profilesLabel: "Michael Acosta's profiles",
    githubProfile: "Michael Acosta on GitHub",
    linkedinProfile: "Michael Acosta on LinkedIn",
    pausedEyebrow: "Paused",
    pausedTitle: "Game paused",
    continue: "Continue",
    exit: "Exit",
    tutorialEyebrow: "Guided tutorial",
    previous: "Previous",
    next: "Next",
    skip: "Skip",
    finish: "Finish",
    savedEyebrow: "Saved game",
    continueQuestion: "Continue your game?",
    savedGameMessage: "A saved game was found on this device.",
    continueGame: "Continue game",
    confirmation: "Confirmation",
    confirmNewGameQuestion: "Start a new game?",
    loseProgressMessage: "Your current progress will be lost if you continue.",
    cancel: "Cancel",
    gameOverEyebrow: "Game over",
    victoryTitle: "Sudoku complete!",
    defeatTitle: "Error limit reached",
    victoryMessage: "You completed the board in {time}.",
    defeatMessage: "The game is over. Try again or start a new game.",
    resultNewGame: "New game",
    close: "Close",
    difficultyDetail: "<strong>Difficulty:</strong> {value}",
    timeDetail: "<strong>Time:</strong> {value}",
    playedTimeDetail: "<strong>Time played:</strong> {value}",
    scoreDetail: "<strong>Score:</strong> {value}",
    errorDetail: "<strong>Errors:</strong> {value}",
    hintsUsedDetail: "<strong>Hints used:</strong> {value}",
    exitToastTitle: "Game ended",
    exitToastMessage: "You left the paused game.",
    newGameToastTitle: "New game",
    difficultyToast: "Difficulty: {value}",
    restartToastTitle: "Restarted",
    restartToastMessage: "The game has been reset.",
    restoredToastTitle: "Game restored",
    restoredToastMessage: "Your previous progress is ready.",
    pauseToastTitle: "Paused",
    pauseToastMessage: "The game is paused.",
    incorrectTitle: "Incorrect number",
    incorrectMessage: "Errors: {errors}/{max}",
    undoToastTitle: "↩ Move undone",
    undoToastMessage: "The last move was undone.",
    hintToastTitle: "💡 Hint used",
    hintToastMessage: "A correct number was revealed. Hints remaining: {count}",
    completedToastTitle: "🎉 Sudoku complete",
    completedToastMessage: "You completed the game successfully.",
    errorLimitToastTitle: "❌ Error limit reached",
    errorLimitToastMessage: "The game is over.",
    tutorialSteps: [
      { title: "What is Sudoku?", text: "Sudoku is a logic puzzle. Fill a 9×9 grid with the numbers 1 to 9 without repeating them in any row, column, or 3×3 box.", demo: "Every row, column, and box must contain each number exactly once." },
      { title: "Goal", text: "Complete every empty cell with the correct number before reaching the error limit.", demo: "Given numbers are fixed and cannot be changed." },
      { title: "Rows", text: "Each row must contain the numbers 1 to 9 exactly once.", demo: "Use the other cells in a row to work out which numbers are missing." },
      { title: "Columns", text: "Each column follows the same rule: no repeated numbers.", demo: "Rows and columns are checked using the same logic." },
      { title: "3×3 boxes", text: "Each 3×3 box must also contain the numbers 1 to 9 exactly once.", demo: "Thicker lines clearly mark each 3×3 box." },
      { title: "Notes", text: "Turn on Notes to jot down possible numbers without committing them to the board.", demo: "Small notes in a cell help you track candidates." },
      { title: "Hints", text: "Each game includes up to three hints. A hint reveals a correct number and reduces your score.", demo: "Use a hint when you get stuck." },
      { title: "Errors", text: "Incorrect entries count toward your limit. Reaching it ends the game.", demo: "Think carefully to protect your score." },
      { title: "Score", text: "Your final score depends on difficulty, time, errors, and hints used.", demo: "The timer and error count update as you play." },
      { title: "Ready to play", text: "Select an empty cell and enter a number to begin solving.", demo: "Start a new game whenever you are ready." },
    ],
  },
  es: {
    documentTitle: "Sudoku Studio",
    gameTagline: "Juego de lógica",
    difficulty: "Dificultad",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    extreme: "Extremo",
    tutorialButton: "Tutorial",
    newGame: "Nueva partida",
    pause: "Pausa",
    resume: "Continuar",
    statusRegion: "Estado del juego",
    time: "Tiempo",
    errors: "Errores",
    hints: "Pistas",
    score: "Puntuación",
    boardLabel: "Tablero de Sudoku",
    numberPadLabel: "Teclado numérico",
    mobileKeypadLabel: "Teclado táctil",
    pencil: "✎ Notas",
    pencilActive: "✎ Notas activas",
    undo: "↶ Deshacer",
    hint: "💡 Pista",
    restart: "↻ Reiniciar",
    clear: "Borrar",
    footerCredit: "Creado por Michael Acosta",
    profilesLabel: "Perfiles de Michael Acosta",
    githubProfile: "Michael Acosta en GitHub",
    linkedinProfile: "Michael Acosta en LinkedIn",
    pausedEyebrow: "Pausa",
    pausedTitle: "Partida pausada",
    continue: "Continuar",
    exit: "Salir",
    tutorialEyebrow: "Tutorial guiado",
    previous: "Anterior",
    next: "Siguiente",
    skip: "Saltar",
    finish: "Finalizar",
    savedEyebrow: "Partida guardada",
    continueQuestion: "¿Quieres continuar?",
    savedGameMessage: "Se encontró una partida guardada en este dispositivo.",
    continueGame: "Continuar partida",
    confirmation: "Confirmación",
    confirmNewGameQuestion: "¿Empezar una nueva partida?",
    loseProgressMessage: "Perderás el progreso actual si continúas.",
    cancel: "Cancelar",
    gameOverEyebrow: "Fin de partida",
    victoryTitle: "¡Sudoku completado!",
    defeatTitle: "Has alcanzado el límite de errores",
    victoryMessage: "Completaste el tablero en {time}.",
    defeatMessage: "La partida terminó. Inténtalo otra vez o comienza una nueva.",
    resultNewGame: "Nueva partida",
    close: "Cerrar",
    difficultyDetail: "<strong>Dificultad:</strong> {value}",
    timeDetail: "<strong>Tiempo:</strong> {value}",
    playedTimeDetail: "<strong>Tiempo jugado:</strong> {value}",
    scoreDetail: "<strong>Puntuación:</strong> {value}",
    errorDetail: "<strong>Errores:</strong> {value}",
    hintsUsedDetail: "<strong>Pistas usadas:</strong> {value}",
    exitToastTitle: "Partida finalizada",
    exitToastMessage: "Saliste de la partida en pausa.",
    newGameToastTitle: "Nueva partida",
    difficultyToast: "Dificultad: {value}",
    restartToastTitle: "Partida reiniciada",
    restartToastMessage: "La partida volvió a comenzar.",
    restoredToastTitle: "Partida restaurada",
    restoredToastMessage: "Tu progreso anterior está disponible.",
    pauseToastTitle: "Pausa",
    pauseToastMessage: "La partida está en pausa.",
    incorrectTitle: "Número incorrecto",
    incorrectMessage: "Errores: {errors}/{max}",
    undoToastTitle: "↩ Movimiento deshecho",
    undoToastMessage: "Se deshizo el último movimiento.",
    hintToastTitle: "💡 Pista utilizada",
    hintToastMessage: "Se reveló un número correcto. Pistas restantes: {count}",
    completedToastTitle: "🎉 Sudoku completado",
    completedToastMessage: "Completaste la partida con éxito.",
    errorLimitToastTitle: "❌ Límite de errores",
    errorLimitToastMessage: "La partida terminó.",
    tutorialSteps: [
      { title: "¿Qué es Sudoku?", text: "Sudoku es un juego de lógica. Completa una cuadrícula de 9×9 con números del 1 al 9 sin repetirlos en ninguna fila, columna o bloque de 3×3.", demo: "Cada fila, columna y bloque debe contener cada número exactamente una vez." },
      { title: "Objetivo", text: "Completa todas las casillas vacías con el número correcto antes de alcanzar el límite de errores.", demo: "Los números iniciales están fijos y no se pueden cambiar." },
      { title: "Filas", text: "Cada fila debe contener los números del 1 al 9 exactamente una vez.", demo: "Usa las demás casillas de la fila para deducir qué números faltan." },
      { title: "Columnas", text: "Cada columna sigue la misma regla: no se repiten números.", demo: "Las filas y las columnas se validan con la misma lógica." },
      { title: "Bloques de 3×3", text: "Cada bloque de 3×3 también debe contener los números del 1 al 9 exactamente una vez.", demo: "Las líneas más gruesas delimitan claramente cada bloque de 3×3." },
      { title: "Notas", text: "Activa Notas para apuntar posibles números sin colocarlos definitivamente en el tablero.", demo: "Las notas pequeñas ayudan a recordar los candidatos de cada casilla." },
      { title: "Pistas", text: "Cada partida incluye hasta tres pistas. Una pista revela un número correcto y reduce tu puntuación.", demo: "Usa una pista cuando te quedes atascado." },
      { title: "Errores", text: "Los números incorrectos cuentan para el límite. Al alcanzarlo, termina la partida.", demo: "Piensa bien tus jugadas para proteger tu puntuación." },
      { title: "Puntuación", text: "La puntuación final depende de la dificultad, el tiempo, los errores y las pistas utilizadas.", demo: "El cronómetro y el contador de errores se actualizan mientras juegas." },
      { title: "Listo para jugar", text: "Selecciona una casilla vacía e introduce un número para empezar a resolver.", demo: "Inicia una nueva partida cuando estés listo." },
    ],
  },
};

const state = {
  language: "en",
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
  state.language = detectLanguage();
  applyTranslations();
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

function detectLanguage() {
  const preferredLanguages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"];
  for (const preferredLanguage of preferredLanguages) {
    const language = preferredLanguage.toLowerCase().split("-")[0];
    if (language === "en" || language === "es") return language;
  }
  return "en";
}

function translate(key, values) {
  let text = TRANSLATIONS[state.language][key];
  if (values) {
    text = text.replace(/\{(\w+)\}/g, (_, name) => values[name]);
  }
  return text;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = translate("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });
}

function getDifficultyLabel(difficulty) {
  return translate(difficulty);
}

function getTutorialSteps() {
  return TRANSLATIONS[state.language].tutorialSteps;
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
      showToast("info", translate("exitToastTitle"), translate("exitToastMessage"));
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
  updateNoteModeButton();
  pauseBtn.textContent = translate("pause");
  updateStatus();
  renderBoard();
  startTimer();
  showToast("success", translate("newGameToastTitle"), translate("difficultyToast", { value: getDifficultyLabel(state.difficulty) }));
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
  updateNoteModeButton();
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = null;
  hideOverlay(resultModal);
  hideOverlay(pauseOverlay);
  hideOverlay(confirmOverlay);
  if (boardWrapper) boardWrapper.classList.remove("paused");
  updateStatus();
  renderBoard();
  startTimer();
  showToast("info", translate("restartToastTitle"), translate("restartToastMessage"));
}

function continueSavedGame() {
  hideOverlay(continueOverlay);
  state.maxErrors = DIFFICULTY_SETTINGS[state.difficulty].maxErrors;
  state.fixedCells = buildFixedCells(state.initialBoard);
  state.isPaused = false;
  state.gameFinished = false;
  state.isNoteMode = false;
  pencilBtn.classList.remove("active");
  updateNoteModeButton();
  updateStatus();
  renderBoard();
  startTimer();
  showToast("info", translate("restoredToastTitle"), translate("restoredToastMessage"));
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
  pauseBtn.textContent = translate(state.isPaused ? "resume" : "pause");
  pauseTime.textContent = formatTime(state.elapsedSeconds);
  pauseDifficulty.textContent = getDifficultyLabel(state.difficulty);
  pauseErrors.textContent = `${state.errors} / ${state.maxErrors}`;
  pauseScore.textContent = calculateScore();
  if (state.isPaused) {
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (boardWrapper) boardWrapper.classList.add("paused");
    showOverlay(pauseOverlay);
    showToast("warning", translate("pauseToastTitle"), translate("pauseToastMessage"));
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
  updateNoteModeButton();
}

function updateNoteModeButton() {
  if (pencilBtn) {
    pencilBtn.classList.toggle("active", state.isNoteMode);
    pencilBtn.textContent = translate(state.isNoteMode ? "pencilActive" : "pencil");
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
  clearButton.textContent = translate("clear");
  clearButton.addEventListener("click", clearSelectedCell);
  numPad.appendChild(clearButton);
}

function renderMobileKeypad() {
  const clearLabel = translate("clear");
  const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", clearLabel];
  mobileKeypad.innerHTML = "";
  values.forEach((value) => {
    const button = document.createElement("button");
    button.textContent = value;
    button.addEventListener("click", () => {
      if (value === clearLabel) {
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
      if (col === 2 || col === 5) cell.classList.add("box-right");
      if (row === 2 || row === 5) cell.classList.add("box-bottom");
      if (isSelected) cell.classList.add("selected");
      if (isHighlightRow) cell.classList.add("highlight-row");
      if (isHighlightCol) cell.classList.add("highlight-col");
      if (isHighlightBox) cell.classList.add("highlight-box");
      if (isSameValue) cell.classList.add("same-value");
      if (value !== 0 && (!isValidPlacementAt(row, col, value) || (!isFixed && value !== state.solutionBoard[row][col]))) {
        cell.classList.add("invalid");
      }

      cell.dataset.row = row;
      cell.dataset.col = col;
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

  const valid = isValidPlacementAt(row, col, value) && state.solutionBoard[row][col] === value;
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
    showToast("error", translate("incorrectTitle"), translate("incorrectMessage", { errors: state.errors, max: state.maxErrors }));
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
  showToast("warning", translate("undoToastTitle"), translate("undoToastMessage"));
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
  showToast("warning", translate("hintToastTitle"), translate("hintToastMessage", { count: Math.max(0, 3 - state.hintsUsed) }));
  if (isBoardSolved()) {
    finishGame(true);
  }
}

function isValidPlacementAt(row, col, value) {
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
    resultTitle.textContent = translate("victoryTitle");
    resultMessage.textContent = translate("victoryMessage", { time: formatTime(state.elapsedSeconds) });
    resultDetails.innerHTML = [
      translate("difficultyDetail", { value: getDifficultyLabel(state.difficulty) }),
      translate("timeDetail", { value: formatTime(state.elapsedSeconds) }),
      translate("scoreDetail", { value: calculateScore() }),
      translate("errorDetail", { value: state.errors }),
      translate("hintsUsedDetail", { value: state.hintsUsed }),
    ].map((detail) => `<div>${detail}</div>`).join("");
    triggerConfetti();
    showToast("success", translate("completedToastTitle"), translate("completedToastMessage"));
    showOverlay(resultModal);
  } else {
    resultTitle.textContent = translate("defeatTitle");
    resultMessage.textContent = translate("defeatMessage");
    resultDetails.innerHTML = [
      translate("difficultyDetail", { value: getDifficultyLabel(state.difficulty) }),
      translate("playedTimeDetail", { value: formatTime(state.elapsedSeconds) }),
      translate("errorDetail", { value: state.errors }),
    ].map((detail) => `<div>${detail}</div>`).join("");
    showToast("error", translate("errorLimitToastTitle"), translate("errorLimitToastMessage"));
    showOverlay(resultModal);
  }
  clearSavedGame();
  updateStatus();
}

function updateStatus() {
  if (timerElement) timerElement.textContent = formatTime(state.elapsedSeconds);
  if (errorsElement) errorsElement.textContent = `${state.errors} / ${state.maxErrors}`;
  if (hintsElement) hintsElement.textContent = `${Math.max(0, 3 - state.hintsUsed)}/3`;
  if (scoreElement) scoreElement.textContent = calculateScore();
  if (currentDifficulty) currentDifficulty.textContent = getDifficultyLabel(state.difficulty);
  if (pauseErrors) pauseErrors.textContent = `${state.errors} / ${state.maxErrors}`;
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
      const mirroredRow = 8 - row;
      const mirroredCol = 8 - col;
      const positionIndex = row * 9 + col;
      const mirroredIndex = mirroredRow * 9 + mirroredCol;
      if (positionIndex < mirroredIndex) {
        positions.push([{ row, col }, { row: mirroredRow, col: mirroredCol }]);
      }
    }
  }

  shuffleArray(positions);
  let removed = 0;
  while (positions.length && removed < targetEmpty) {
    const boxCounts = Array(9).fill(0);
    initialBoard.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value !== 0) boxCounts[getBoxIndex(rowIndex, colIndex)] += 1;
      });
    });
    positions.sort((firstPair, secondPair) => {
      const score = (pair) => pair.reduce((total, cell) => total + boxCounts[getBoxIndex(cell.row, cell.col)], 0);
      return score(secondPair) - score(firstPair);
    });
    const pair = positions.shift();
    const [first, second] = pair;
    const firstValue = initialBoard[first.row][first.col];
    const secondValue = initialBoard[second.row][second.col];
    initialBoard[first.row][first.col] = 0;
    initialBoard[second.row][second.col] = 0;
    if (countSolutions(initialBoard) !== 1) {
      initialBoard[first.row][first.col] = firstValue;
      initialBoard[second.row][second.col] = secondValue;
    } else {
      removed += 2;
    }
  }

  if (removed < targetEmpty) {
    const centerValue = initialBoard[4][4];
    initialBoard[4][4] = 0;
    if (countSolutions(initialBoard) === 1) {
      removed += 1;
    } else {
      initialBoard[4][4] = centerValue;
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
    const emptyPosition = findBestEmptyCell(workingBoard);
    if (!emptyPosition) {
      solutions += 1;
      return;
    }
    const { row, col, candidates } = emptyPosition;
    for (const value of candidates) {
      workingBoard[row][col] = value;
      solve();
      workingBoard[row][col] = 0;
      if (solutions >= 2) return;
    }
  };
  solve();
  return solutions;
}

function findBestEmptyCell(board) {
  let bestPosition = null;
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] !== 0) continue;
      const candidates = [];
      for (let value = 1; value <= 9; value += 1) {
        if (isValidResolved(board, row, col, value)) candidates.push(value);
      }
      if (candidates.length === 0) return { row, col, candidates };
      if (!bestPosition || candidates.length < bestPosition.candidates.length) {
        bestPosition = { row, col, candidates };
        if (candidates.length === 1) return bestPosition;
      }
    }
  }
  return bestPosition;
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
  const steps = getTutorialSteps();
  tutorialStep += direction;
  if (tutorialStep < 0) tutorialStep = 0;
  if (tutorialStep >= steps.length) {
    finishTutorial();
    return;
  }
  renderTutorialStep();
}

function renderTutorialStep() {
  const steps = getTutorialSteps();
  const step = steps[tutorialStep];
  tutorialTitle.textContent = step.title;
  tutorialText.textContent = step.text;
  tutorialDemo.textContent = step.demo;
  tutorialPrev.disabled = tutorialStep === 0;
  tutorialNext.textContent = translate(tutorialStep === steps.length - 1 ? "finish" : "next");
  progressDots.innerHTML = "";
  steps.forEach((_, index) => {
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
  const colors = ["#0f0e12", "#000000", "#b2b2b2", "#f0a800"];
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
