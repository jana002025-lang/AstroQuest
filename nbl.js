const quizQuestions = [
  {
    text: "1. What is the main purpose of the Neutral Buoyancy Laboratory (NBL)?",
    choices: [
      "To test the structural integrity of spacecraft",
      "To train astronauts for spacewalks and certify flight hardware",
      "To study aquatic life in a controlled environment",
      "To simulate lunar gravity for rover testing"
    ],
    correct: 1
  },
  {
    text: "2. The NBL facility is located at:",
    choices: [
      "Kennedy Space Center, Florida",
      "The Sonny Carter Training Facility, Texas",
      "Jet Propulsion Laboratory, California",
      "Goddard Space Flight Center, Maryland"
    ],
    correct: 1
  },
  {
    text: "3. How many gallons of water does the NBL pool hold?",
    choices: [
      "1.5 million gallons",
      "3.8 million gallons",
      "6.2 million gallons",
      "8.4 million gallons"
    ],
    correct: 2
  },
  {
    text: "4. The principle that allows the NBL to simulate microgravity is called:",
    choices: [
      "Hydrostatic pressure",
      "Neutral buoyancy",
      "Thermodynamic equilibrium",
      "Atmospheric compression"
    ],
    correct: 1
  },
  {
    text: "5. Which of the following is a key feature found at the bottom of the NBL pool?",
    choices: [
      "A model of the Martian surface",
      "Full-scale mockups of ISS modules",
      "A deep-sea research habitat",
      "Training models of the Apollo Lunar Module"
    ],
    correct: 1
  },
  {
    text: "6. Besides NASA, who else utilizes the NBL?",
    choices: [
      "Public scuba diving certification agencies",
      "Only Russian cosmonauts",
      "Private commercial companies and international partners",
      "The U.S. Navy Submarine Force"
    ],
    correct: 2
  },
  {
    text: "7. Why can a training session in the NBL last up to six hours?",
    choices: [
      "That is the maximum safe exposure time for divers",
      "To simulate the full duration of a real spacewalk",
      "It takes that long to set up the equipment",
      "The water filtration system requires a 6-hour cycle"
    ],
    correct: 1
  },
  {
    text: "8. What is a primary function of the support divers in the NBL?",
    choices: [
      "To film documentary footage for public release",
      "To act as stand-in astronauts for procedure development",
      "To ensure astronaut safety and manage training hardware",
      "To conduct marine biology research during downtime"
    ],
    correct: 2
  },
  {
    text: "9. A significant physical limitation of the NBL simulation, compared to actual space, is:",
    choices: [
      "Lower oxygen levels",
      "Colder temperatures",
      "Water drag and inertia",
      "Higher background radiation"
    ],
    correct: 2
  },
  {
    text: "10. In addition to astronaut training, the NBL is vital for:",
    choices: [
      "Hosting public swimming events",
      "Developing and testing new spacewalk tools",
      "Storing retired spacesuits",
      "Simulating asteroid impacts"
    ],
    correct: 1
  },
  {
    text: "11. How does the NBL support future exploration missions to the Moon and Mars?",
    choices: [
      "By testing soil samples from those celestial bodies",
      "By developing and practicing new techniques and tools",
      "By simulating their specific atmospheric conditions",
      "By training astronauts in partial gravity buoyancy"
    ],
    correct: 1
  },
  {
    text: "12. What type of spacesuit is used for training in the NBL?",
    choices: [
      "The Orion Crew Survival System",
      "The Advanced Crew Escape Suit",
      "The Extravehicular Mobility Unit (EMU) or its variants",
      "The Sokol space suit"
    ],
    correct: 2
  }
];


let currentQuestion = 0;
let score = 0;
let puzzleIndex = 0;

function createPuzzle() {
  const board = document.getElementById("puzzle-board");
  board.innerHTML = ""; 
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.innerHTML = `
      <div class="piece-inner">
        <div class="piece-back"></div>
        <div class="piece-front" 
          style="background-image:url('nasa.jpg'); 
          background-position:-${(i%4)*100}px -${Math.floor(i/4)*100}px;"></div>
      </div>
    `;
    board.appendChild(piece);
  }
}

function showQuestion() {
  const quizCard = document.getElementById("quiz-card");
  const q = quizQuestions[currentQuestion];

  const answersHTML = q.choices
    .map(
      (choice, i) =>
        `<label>
          <input type="radio" name="question" value="${i}">
          ${choice}
        </label>`
    )
    .join("");

  quizCard.innerHTML = `
    <div class="question">${q.text}</div>
    <div class="answers">${answersHTML}</div>
    <div id="feedback" class="feedback"></div>
  `;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="question"]:checked');
  const feedbackDiv = document.getElementById("feedback");

  if (!selected) {
    alert("Choose Answer Firstly!");
    return false;
  }

  const userAnswer = parseInt(selected.value);
  const q = quizQuestions[currentQuestion];

  if (userAnswer === q.correct) {
    score += 10;
    feedbackDiv.innerHTML = `<span style="color: lightgreen;">Right Answer! +10 points✅ </span>`;
    
    // flip puzzle piece
    if (puzzleIndex < 12) {
      const piece = document.querySelectorAll(".puzzle-piece")[puzzleIndex];
      piece.classList.add("flipped");
      puzzleIndex++;
    }
  } else {
    const correctAnswer = q.choices[q.correct];
    feedbackDiv.innerHTML = `<span style="color: red;"> Wrong Answer❌ The right Answer is  : ${correctAnswer}</span>`;
  }

  return true;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (!checkAnswer()) return;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
});

function endQuiz() {
  // بعد ما يخلص الكويز يروح للصفحة الجديدة ومعاه الدرجة
  window.location.href = `congrats.html?score=${score}`;
}


  // 🎯 عرض الصورة الكاملة
  const board = document.getElementById("puzzle-board");
  board.innerHTML = `
    <img src="nasa.jpg" alt="NASA Project" class="final-image">
  `;

  // 🔄 زر إعادة اللعب
  document.getElementById("restart-container").innerHTML = `
    <button id="restartBtn">Play Again🔄</button>
  `;

  document.getElementById("restartBtn").addEventListener("click", restartGame);

function restartGame() {
  currentQuestion = 0;
  score = 0;
  puzzleIndex = 0;

  document.getElementById("quiz-card").style.display = "block";
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("results").innerText = "";
  document.getElementById("restart-container").innerHTML = "";

  createPuzzle();
  showQuestion();
}

// 🟣 أول تشغيل
createPuzzle();
showQuestion();