const displayLeft = document.querySelector(".display");
const displayRight = document.querySelector(".display-2");
const temp = document.querySelector(".temp");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".c");
const clearlast = document.querySelector(".ce");
let display1Num = "";
let display2Num = "";
let lastOperator = "";
let result = null;
let isDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerHTML === "." && !isDot) {
      isDot = true;
    } else if (e.target.innerHTML === "." && isDot) {
      return;
    }
    display2Num += e.target.innerHTML;
    displayRight.innerHTML = display2Num;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display2Num) return;

    if (display1Num && display2Num && lastOperator) {
      operate();
    } else {
      result = parseFloat(display2Num);
    }

    isDot = false;
    const operatorName = e.target.innerHTML;

    clear(operatorName);
    lastOperator = operatorName;
  });
});

function clear(name = "") {
  display1Num += `${display2Num} ${name} `;
  displayLeft.innerHTML = display1Num;
  displayRight.innerHTML = "";
  display2Num = "";
  temp.innerHTML = result;
}

function operate() {
  switch (lastOperator) {
    case "x":
      result = parseFloat(result) * parseFloat(display2Num);
      break;
    case "%":
      result = parseFloat(result) % parseFloat(display2Num);
      break;
    case "/":
      result = parseFloat(result) / parseFloat(display2Num);
      break;
    case "+":
      result = parseFloat(result) + parseFloat(display2Num);
      break;
    case "-":
      result = parseFloat(result) - parseFloat(display2Num);
      break;
  }
}

//operation

equal.addEventListener("click", () => {
  if (!display1Num || !display2Num) return;
  isDot = false;
  operate();
  clear();
  displayRight.innerHTML = result;
  temp.innerHTML = "";
  display2Num = result;
  display1Num = "";
});

clearAll.addEventListener("click", () => {
  display1Num = "";
  display2Num = "";
  displayLeft.innerHTML = "";
  displayRight.innerHTML = "";
  result = "";
  temp.innerHTML = "";
});

clearlast.addEventListener("click", () => {
  displayRight.innerHTML = "";
  display2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0" ||
    e.key === "."
  ) {
    pressNumber(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    pressOperator(e.key);
  } else if (e.key === "*") {
    pressOperator("x");
  } else if (e.key === "Enter" || e.key === "=") {
    pressResult();
  }
});

function pressNumber(key) {
  numbers.forEach((number) => {
    if (number.innerHTML === key) {
      number.click();
    }
  });
}

function pressOperator(key) {
  operators.forEach((operator) => {
    if (operator.innerHTML === key) {
      operator.click();
    }
  });
}

function pressResult() {
  equal.click();
}
