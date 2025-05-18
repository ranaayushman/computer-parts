document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const modal = document.getElementById("rules-modal");
  const exitBtn = document.getElementById("exit-quiz");
  const continueBtn = document.getElementById("continue-quiz");
  const quizForm = document.getElementById("quiz-form");
  const timerDisplay = document.getElementById("timer");
  const resultDisplay = document.getElementById("quiz-result");
  const questionContainers = document.querySelectorAll(".question");

  // Quiz state
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  const answers = {
    q1: "b", // Keyboard
    q2: "a", // Printer
    q3: "b", // The brain of the computer
  };

  // Initialize quiz
  quizForm.style.display = "none";
  modal.style.display = "flex";
  questionContainers.forEach((q, index) => {
    q.classList.toggle("active", index === 0);
  });

  // Exit button: redirect to index.html
  exitBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Continue button: start quiz
  continueBtn.addEventListener("click", () => {
    modal.style.display = "none";
    quizForm.style.display = "block";
    startTimer();
  });

  // Timer logic
  function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        disableCurrentQuestion();
        setTimeout(moveToNextQuestion, 1000);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.color = timeLeft <= 5 ? "red" : "black";
  }

  // Question handling
  questionContainers.forEach((question, index) => {
    const radios = question.querySelectorAll("input[type='radio']");
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        clearInterval(timerInterval);
        disableCurrentQuestion();
        setTimeout(moveToNextQuestion, 1000);
      });
    });
  });

  function disableCurrentQuestion() {
    const radios = questionContainers[currentQuestion].querySelectorAll(
      "input[type='radio']"
    );
    radios.forEach((radio) => {
      radio.disabled = true;
    });
  }

  function moveToNextQuestion() {
    // Check answer
    const selected = questionContainers[currentQuestion].querySelector(
      "input[type='radio']:checked"
    );
    if (selected && selected.value === answers[`q${currentQuestion + 1}`]) {
      score++;
    }

    // Hide current question
    questionContainers[currentQuestion].classList.remove("active");
    currentQuestion++;

    if (currentQuestion < questionContainers.length) {
      // Show next question
      questionContainers[currentQuestion].classList.add("active");
      startTimer();
    } else {
      // Show results
      clearInterval(timerInterval);
      quizForm.style.display = "none";
      resultDisplay.style.display = "block";
      resultDisplay.textContent = `You scored ${score} out of 3!`;
      resultDisplay.style.color =
        score === 3 ? "green" : score === 2 ? "orange" : "red";
    }
  }
});
