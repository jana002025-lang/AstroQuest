const quizQuestions = [
  {
    text: "1. What is the primary operational purpose of the Cupola on the ISS?",
    choices: [
      "To conduct microgravity biology experiments",
      "To serve as a control tower for observing external operations",
      "To provide a dedicated area for physical exercise",
      "To store spare parts for spacewalks"
    ],
    correct: 1
  },
  {
    text: "2. How many windows does the Cupola have?",
    choices: [
      "One",
      "Five",
      "Seven",
      "Ten"
    ],
    correct: 2
  },
  {
    text: "3. What is a key feature of the Cupola's largest window?",
    choices: [
      "It is made of unbreakable diamond composite",
      "It is the largest window ever flown in space",
      "It can telescope outward for a wider view",
      "It has built-in solar filters for sun observation"
    ],
    correct: 1
  },
  {
    text: "4. The Cupola is permanently attached to which ISS module?",
    choices: [
      "The Destiny laboratory",
      "The Node 3 (Tranquility) module",
      "The Zvezda service module",
      "The Kibo laboratory"
    ],
    correct: 1
  },
  {
    text: "5. Besides its operational role, what major scientific function does the Cupola serve?",
    choices: [
      "Astronomy and deep space observation",
      "Earth observation and scientific study of our planet",
      "Monitoring the station's solar array efficiency",
      "Studying cosmic ray impacts on the station"
    ],
    correct: 1
  },
  {
    text: "6. What specific equipment is primarily controlled from the Cupola?",
    choices: [
      "The station's communication antennas",
      "The Canadarm2 robotic arm",
      "The station's docking systems",
      "The solar panel alignment motors"
    ],
    correct: 1
  },
  {
    text: "7. What important psychological benefit does the Cupola provide?",
    choices: [
      "It provides the quietest place on the station for meditation",
      "Its views help reduce stress and combat isolation",
      "It contains special lighting that simulates Earth's day-night cycle",
      "It allows private video conferences with families"
    ],
    correct: 1
  },
  {
    text: "8. How was the Cupola delivered to the International Space Station?",
    choices: [
      "On a SpaceX Dragon spacecraft",
      "Aboard the Space Shuttle Endeavour (STS-130)",
      "Pre-installed on the Zarya module",
      "On a Russian Progress cargo vehicle"
    ],
    correct: 1
  },
  {
    text: "9. During cargo spacecraft arrivals, what is the crew's main activity in the Cupola?",
    choices: [
      "Directly piloting the approaching spacecraft",
      "Monitoring the approach and operating the robotic arm for capture",
      "Preparing the station's docking systems for pressurization",
      "Conducting safety checks on the spacecraft's systems"
    ],
    correct: 1
  },
  {
    text: "10. How is the interior of the Cupola equipped for its functional role?",
    choices: [
      "With scientific laboratories for Earth observation",
      "With robotic workstations and control panels",
      "With medical equipment for emergency situations",
      "With communication equipment for space-to-ground links"
    ],
    correct: 1
  },
  {
    text: "11. How has the Cupola influenced future spacecraft design?",
    choices: [
      "By demonstrating the need for larger sleeping quarters",
      "By proving the value of large windows for operations and crew well-being",
      "By showing that round modules are more structurally sound",
      "By demonstrating new radiation shielding techniques"
    ],
    correct: 1
  },
  {
    text: "12. What unique observational advantage does the Cupola provide?",
    choices: [
      "Direct measurement of solar radiation",
      "An unobstructed view for observing celestial phenomena like auroras",
      "The ability to see the dark side of the Moon",
      "Continuous monitoring of satellite trajectories"
    ],
    correct: 1
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
          style="background-image:url('cupola.jpg'); 
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
    feedbackDiv.innerHTML = `<span style="color: lightgreen;">Right Answer! +10 points✅</span>`;
    
    // flip puzzle piece
    if (puzzleIndex < 12) {
      const piece = document.querySelectorAll(".puzzle-piece")[puzzleIndex];
      piece.classList.add("flipped");
      puzzleIndex++;
    }
  } else {
    const correctAnswer = q.choices[q.correct];
    feedbackDiv.innerHTML = `<span style="color: red;">Wrong Answer❌ The right Answer is: ${correctAnswer}</span>`;
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
  window.location.href = `congrats_cupola.html?score=${score}`;
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