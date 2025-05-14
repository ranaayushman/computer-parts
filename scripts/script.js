document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let score = 0;
    const answers = {
      q1: "b",
      q2: "a",
      q3: "b",
    };

    for (let q in answers) {
      const userAnswer = form.elements[q].value;
      if (userAnswer === answers[q]) {
        score++;
      }
    }

    result.textContent = `You scored ${score} out of 3.`;
    result.style.color = score === 3 ? "green" : score === 2 ? "orange" : "red";
  });
});
