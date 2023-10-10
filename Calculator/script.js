// buttons
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");
const comma = document.querySelector(".comma");

// result panel
const currentNumberLabel = document.querySelector(".current-number");
let hasComma = false;

function updateLabel(value) {
  let size = currentNumberLabel.textContent.length;
  if(size >= 7) {
    currentNumberLabel.style.cssText = "font-size: 4rem";
  }
  if (size >= 10) {
    currentNumberLabel.style.cssText = "font-size: 3.5rem";
  }
  if (currentNumberLabel.textContent[0] == 0) {
    currentNumberLabel.textContent = "";
  }
  if(currentNumberLabel.textContent.length < 11) {
    currentNumberLabel.textContent += value;
  }
}

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    const value = digit.getAttribute("value");
    updateLabel(value);
  });
});

comma.addEventListener("click", () => {
  if (!hasComma) {
    updateLabel(".");
    hasComma = true;
  }
});
