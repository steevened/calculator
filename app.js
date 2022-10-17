const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");

//pass trought all keys to add each element to the event click

let keyPressed = "";
let displayValue = "";
let value = 0;
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let operator = "";

//*textContent is a string
// "3" + "6" = "36"

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", (e) => {
    keys[i].classList.add("pressed");
    console.log(e.target.textContent);

    //detect the pressed key
    keyPressed = e.target.textContent;

    //detext if the valus is a number
    if (numbers.includes(keyPressed)) {
      displayValue += keyPressed;
      display.innerHTML = displayValue;
    } else {
      switch (keyPressed) {
        case "AC":
          clear();
          break;
        case "+":
          value = Number(displayValue);
          operator = "+";
          clear();
          break;
        case "-":
          value = Number(displayValue);
          operator = "-";
          clear();
          break;
        case "x":
          value = Number(displayValue);
          operator = "x";
          clear();
          break;
        case "=":
          const result = calculate(operator, value, Number(displayValue));
          clear();
          display.innerHTML = result;
          break;
      }
    }
  });

  keys[i].addEventListener("transitionend", () => {
    if (keys[i].classList.contains("pressed")) {
      keys[i].classList.remove("pressed");
    }
  });
}

function clear() {
  displayValue = "";
  display.innerHTML = "0";
}

function calculate(oper, num1, num2) {
  let result = 0;
  switch (oper) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
  }
  return result;
}
