document.addEventListener("DOMContentLoaded", function () {

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
    }, 800);
  }

  setInterval(showTarget, 2000);

  target.addEventListener("click", () => {
    if (isVisible) {
      score += 2;
      scoreDisplay.textContent = score;
    }
  });

});
