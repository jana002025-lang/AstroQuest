// --- Flow Control Variables ---
const screens = [
    document.getElementById('screen-1'), document.getElementById('screen-2'), document.getElementById('screen-3'),
    document.getElementById('screen-4'), document.getElementById('screen-5'), document.getElementById('screen-6'),
    document.getElementById('screen-7') 
];

// --- Resource Page Variables (Screen 5) ---
let currentResourcePage = 1;
const resourcePageCount = 4;
const nextPageButton = document.getElementById('next-page-button');
const prevPageButton = document.getElementById('prev-page-button');
const startPlayingButton = document.getElementById('start-playing-button');

// --- PUZZLE GAME DATA & VARIABLES (Screen 7)
const puzzleData = {
    totalPieces: 16, 
    questions: [ 
        // 16 Questions for the puzzle (unchanged)
        { question: "In 1969, which mission first landed humans on the Moon?", options: ["Apollo 13", "Apollo 11", "Apollo 17", "Gemini 4"], answer: "Apollo 11", pieceIndex: 1 },
        { question: "What is the largest space telescope launched as a successor to the Hubble?", options: ["Kepler Telescope", "James Webb Space Telescope", "Spitzer Telescope", "Fermi Telescope"], answer: "James Webb Space Telescope", pieceIndex: 2 },
        { question: "Which planet is famous for the 'Great Red Spot'?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: "Jupiter", pieceIndex: 3 },
        { question: "What was the name of the NASA spacecraft that made the first successful landing on Mars?", options: ["Viking 1", "Perseverance", "Opportunity", "Curiosity"], answer: "Viking 1", pieceIndex: 4 },
        { question: "What is the name of the galaxy our solar system belongs to?", options: ["Andromeda", "The Milky Way", "Magellanic Cloud", "Triangulum"], answer: "The Milky Way", pieceIndex: 5 },
        { question: "What is the outermost layer of the sun's atmosphere visible during a total solar eclipse?", options: ["Chromosphere", "Corona", "Photosphere", "Sunspots"], answer: "Corona", pieceIndex: 6 },
        { question: "What is the most abundant chemical element in the universe?", options: ["Oxygen", "Helium", "Hydrogen", "Carbon"], answer: "Hydrogen", pieceIndex: 7 },
        { question: "Who was the first human to perform a spacewalk (Extra-Vehicular Activity)?", options: ["Yuri Gagarin", "Neil Armstrong", "Alexei Leonov", "John Glenn"], answer: "Alexei Leonov", pieceIndex: 8 },
        { question: "In astrophysics, what does Hubble's Law measure?", options: ["The mass of stars", "The expansion rate of the universe", "The temperature of planets", "The force of gravity"], answer: "The expansion rate of the universe", pieceIndex: 9 },
        { question: "What is the name of the NASA probe currently studying Jupiter and its moons?", options: ["Cassini", "Juno", "New Horizons", "Voyager 1"], answer: "Juno", pieceIndex: 10 },
        { question: "What is the mysterious substance that makes up about 27% of the universe?", options: ["Luminous Matter", "Dark Energy", "Dark Matter", "Cosmic Plasma"], answer: "Dark Matter", pieceIndex: 11 },
        { question: "Which asteroid did the NASA OSIRIS-REx spacecraft land on to collect a sample?", options: ["Vesta", "Bennu", "Ceres", "Eros"], answer: "Bennu", pieceIndex: 12 },
        { question: "Which of these is a moon of Saturn known for its dense, methane-rich atmosphere?", options: ["Europa", "Titan", "Io", "Callisto"], answer: "Titan", pieceIndex: 13 },
        { question: "Who was the first female Arab astronaut to reach the International Space Station (ISS)?", options: ["Mishael Al-Shemimry", "Rayyanah Barnawi", "Sarah Sabry", "Nora Al Matrooshi"], answer: "Rayyanah Barnawi", pieceIndex: 14 },
        { question: "What is the boundary around a black hole from which nothing, not even light, can escape?", options: ["Hubble Horizon", "Event Horizon", "Spacetime Region", "Singularity"], answer: "Event Horizon", pieceIndex: 15 },
        { question: "What does the acronym NASA stand for?", options: ["National Alliance of Space Agencies", "National Aeronautics and Space Association", "New Age Space Administration", "National Aeronautics and Space Administration"], answer: "National Aeronautics and Space Administration", pieceIndex: 16 }
    ]
};

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let currentMission = 'Default';
let currentScientistImage = 'cupola_scientist_image.jpg'; 
let finalScientistName = 'Unknown Specialist'; 

const puzzleBoard = document.getElementById('puzzle-board');
const quizArea = document.getElementById('quiz-area');
const questionText = document.getElementById('quiz-question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-puzzle-button');
const finalResultMessage = document.getElementById('final-result-message');
const scientistNameSpan = document.getElementById('scientist-name');
const statusDisplay = document.getElementById('status-display');
        
// --- FLOW CONTROL FUNCTIONS ---
        
window.goToScreen = function(screenNumber) {
    const targetIndex = screenNumber - 1;
    if (targetIndex >= 0 && targetIndex < screens.length) {
        screens.forEach((screen, index) => {
            screen.classList.toggle('active', index === targetIndex);
        });
        // Enable scrolling only for resource page (Screen 5)
        document.body.style.overflowY = (screenNumber === 5) ? 'auto' : 'hidden';
        window.scrollTo(0, 0); 
    }
}
        
// --- RESOURCE PAGE FUNCTIONS (Screen 5) ---
window.toggleAccordion = function(questionElement) {
    const item = questionElement.closest('.accordion-item');
    // Close other open accordions
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
            openItem.classList.remove('open');
        }
    });
    item.classList.toggle('open');
}

window.showResourcePage = function(pageNumber) {
    currentResourcePage = pageNumber;
    
    document.querySelectorAll('.resource-page-slide').forEach(page => page.classList.remove('active'));
    document.getElementById(`resource-page-${pageNumber}`).classList.add('active');

    // Control navigation buttons
    prevPageButton.classList.toggle('hidden', pageNumber === 1);
    nextPageButton.classList.toggle('hidden', pageNumber === resourcePageCount);
    startPlayingButton.classList.toggle('hidden', pageNumber !== resourcePageCount);
    
    // Close all accordions when changing pages
    document.querySelectorAll('.accordion-item.open').forEach(item => item.classList.remove('open'));
}

window.changeResourcePage = function(direction) {
    let newPage = currentResourcePage + direction;
    if (newPage >= 1 && newPage <= resourcePageCount) {
        showResourcePage(newPage);
        window.scrollTo(0, 0); 
    }
}

// --- PUZZLE GAME FUNCTIONS (Screen 7) ---
        
function initializePuzzle() {
    puzzleBoard.innerHTML = ''; 
    // Set the correct scientist image as the background for the board
    puzzleBoard.style.backgroundImage = `url('${currentScientistImage}')`;
    
    for (let i = 1; i <= puzzleData.totalPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece', `piece-${i}`);
        piece.id = `piece-${i}`;
        puzzleBoard.appendChild(piece);
    }
}

function updateStatus() {
    statusDisplay.textContent = `${currentMission} Decryption: Clues ${correctAnswersCount} of ${puzzleData.totalPieces}`;
}

window.startGame = function(mission, imagePath, scientistTitle) {
    currentMission = mission;
    currentScientistImage = imagePath; 
    finalScientistName = scientistTitle; 

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    
    initializePuzzle();
    
    finalResultMessage.classList.add('hidden');
    quizArea.classList.remove('hidden');
    updateStatus();
    loadQuestion();
}

function loadQuestion() {
    const q = puzzleData.questions[currentQuestionIndex];
    
    if (!q) {
        endGame();
        return;
    }

    questionText.textContent = `Clue ${currentQuestionIndex + 1} (${currentMission}): ${q.question}`;
    optionsContainer.innerHTML = ''; 
    nextButton.classList.add('hidden'); 

    q.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(button, option, q.answer, q.pieceIndex));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedButton, selectedOption, correctAnswer, pieceIndex) {
    // Disable all options after selection
    document.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        selectedButton.classList.add('correct');
        correctAnswersCount++;
        revealPuzzlePiece(pieceIndex);
    } else {
        selectedButton.classList.add('incorrect');
        // Highlight the correct answer
        document.querySelectorAll('.option-button').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    updateStatus();
    // Show next button after a short delay
    setTimeout(() => {
        nextButton.classList.remove('hidden');
    }, 1000);
}

function revealPuzzlePiece(index) {
    const piece = document.getElementById(`piece-${index}`);
    if (piece) {
        piece.classList.add('piece-revealed');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < puzzleData.questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    quizArea.classList.add('hidden');
    finalResultMessage.classList.remove('hidden');
    scientistNameSpan.textContent = finalScientistName;
    statusDisplay.textContent = "MISSION COMPLETE: SCIENTIST IDENTIFIED!";
}

// --- Initialization ---
nextButton.addEventListener('click', nextQuestion);

document.addEventListener('DOMContentLoaded', () => {
    initializePuzzle(); 
    goToScreen(1); // Start on the first screen
    showResourcePage(1); // Initialize resource pages state
});