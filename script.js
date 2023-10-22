// buttons
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");
const comma = document.querySelector(".comma");
const equal = document.querySelector(".equal");
const currentTime = document.querySelector(".current-time");

// result panel
const currentNumberLabel = document.querySelector(".current-number");

let hasComma = false;
let hasOperator = false;

let sign;
let currentNumber;

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const currentTimeString = `${hours}:${minutes}`;

  currentTime.textContent = currentTimeString;
}

function getNumber() {
  currentNumber = +currentNumberLabel.textContent;
  hasOperator = false;
}

function updateLabel(value) {
  if (currentNumberLabel.textContent[0] == 0 && value == ".") {
    currentNumberLabel.textContent += value;
    return;
  }
  if (
    currentNumberLabel.textContent[0] == 0 &&
    currentNumberLabel.textContent[1] != "."
  ) {
    currentNumberLabel.textContent = "";
  }
  if (hasOperator) {
    getNumber();
    hasComma = false;
    currentNumberLabel.textContent = "";
    currentNumberLabel.textContent += value;
    return;
  }
  if (currentNumberLabel.textContent.length < 9) {
    currentNumberLabel.textContent += value;
    return;
  }
  if (currentNumberLabel.textContent.length < 10 && hasComma) {
    currentNumberLabel.textContent += value;
  }
}

function calculate(a, b, sign) {
  switch (sign) {
    case "/":
      return a / b;
    case "*":
      return a * b;
    case "-":
      return a - b;
    case "+":
      return a + b;
  }
}

changeSign.addEventListener("click", () => {
  currentNumber = -+currentNumberLabel.textContent;
  currentNumberLabel.textContent = currentNumber;
});

percent.addEventListener("click", () => {
  currentNumber = +currentNumberLabel.textContent;
  currentNumber /= 100;
  currentNumberLabel.textContent = currentNumber;
  hasComma = true;
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    sign = e.target.getAttribute("value");
    hasOperator = true;
  });
});

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

equal.addEventListener("click", () => {
  if (sign != undefined) {
    let secondNumber = +currentNumberLabel.textContent;
    currentNumberLabel.textContent = calculate(
      currentNumber,
      secondNumber,
      sign
    );
  }
});

allClear.addEventListener("click" ,() => {
  window.location.reload();
})

updateClock();
setInterval(updateClock, 1000);
