let score = 0;
const scoreDisplay = document.getElementById("score");
const target = document.getElementById("target");

let isVisible = false;

function showTarget() {
  target.style.display = "block";
  isVisible = true;

  setTimeout(() => {
    target.style.display = "none";
    isVisible = false;
  }, 800); // target visible for 0.8 seconds
}

setInterval(showTarget, 2000); // appears every 2 seconds

target.addEventListener("click", () => {
  if (isVisible) {
    score += 2; // bonus for clicking on time
    scoreDisplay.textContent = score;
  }
});

