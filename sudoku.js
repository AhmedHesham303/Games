let body = document.querySelector("body");
let input = document.querySelectorAll(".cell input");
let cell = document.querySelectorAll(".cell");
let row = document.querySelectorAll(".row");
let submitBtn = document.querySelector(".submit-btn");
let resetBtn = document.querySelector(".reset-btn");
let darkBtn = document.querySelector(".darkmode-btn");
let msg = document.querySelector(".msg");
let returnBtn = document.querySelector(".return-btn");
let header = document.querySelector("h1");
let grid = document.querySelector("#grid");
let isDarkmode = 0;
let game = [];

function inialise() {
  for (let i = 0; i < 81; i++) {
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
      input[i].style.borderRight = "3px solid #A0A0A0";
    }
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0 && i < 9) {
      row[i].style.borderBottom = "3px solid #A0A0A0";
    }
  }

  for (let i = 0; i < 9; i++) {
    game[i] = Array(9).fill(0);
  }
}

function darkMode() {
  returnBtn.style.color = "white";
  body.style.backgroundColor = "#1A1A2E";
  for (let i = 0; i < 81; i++) {
    input[i].style.backgroundColor = "#E0E0E0";
    input[i].style.color = "#fff";
    cell[i].style.borderColor = "#A0A0A0";
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
      input[i].style.borderRight = "3px solid #008080";
    }
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0 && i < 9) {
      row[i].style.borderBottom = "3px solid #008080";
    }
  }
  header.style.color = "#E0E0E0";
  grid.style.borderColor = "#008080";
  darkBtn.innerHTML = "Light Mode";
  
  submitBtn.style.backgroundColor = "#008080";
  submitBtn.style.color = "White";
  submitBtn.addEventListener("mouseleave", () => {
    submitBtn.style.backgroundColor = "#008080";
    submitBtn.style.color = "White";
  });
  submitBtn.addEventListener("mouseenter", () => {
    submitBtn.style.backgroundColor = "#00b3b3";
    submitBtn.style.color = "#000000";
  });
  resetBtn.style.backgroundColor = "#008080";
  resetBtn.style.color = "White";
  resetBtn.addEventListener("mouseleave", () => {
    resetBtn.style.backgroundColor = "#008080";
    resetBtn.style.color = "White";
  });
  resetBtn.addEventListener("mouseenter", () => {
    resetBtn.style.backgroundColor = "#00b3b3";
    resetBtn.style.color = "#000000";
  });
  returnBtn.style.backgroundColor = "#008080";
  darkBtn.style.backgroundColor = "#008080";
  darkBtn.style.color = "White";
  darkBtn.addEventListener("mouseleave", () => {
    darkBtn.style.backgroundColor = "#008080";
    darkBtn.style.color = "White";
  });
  darkBtn.addEventListener("mouseenter", () => {
    darkBtn.style.backgroundColor = "#00b3b3";
    darkBtn.style.color = "#000000";
  });
}

function lightMode() {
  body.style.backgroundColor = "hsl(0, 8%, 90%)";
  for (let i = 0; i < 81; i++) {
    input[i].style.backgroundColor = "#fff";
    input[i].style.color = "#0056b3";
    cell[i].style.borderColor = "#A0A0A0";
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0) {
      input[i].style.borderRight = "3px solid #A0A0A0";
    }
    if ((i + 1) % 3 === 0 && (i + 1) % 9 !== 0 && i < 9) {
      row[i].style.borderBottom = "3px solid #A0A0A0";
    }
  }
  header.style.color = "#0056b3";
  grid.style.borderColor = " #a9a9a9";
  darkBtn.innerHTML = "Dark Mode";
  returnBtn.style.color = "#003b5c";
  returnBtn.style.backgroundColor = "#a2dff7";
  submitBtn.style.backgroundColor = "#a2dff7";
  submitBtn.style.color = "#003b5c";
  submitBtn.addEventListener("mouseleave", () => {
    submitBtn.style.backgroundColor = "#a2dff7";
    submitBtn.style.color = "#003b5c";
  });
  submitBtn.addEventListener("mouseenter", () => {
    submitBtn.style.backgroundColor = "#7ec8e3";
    submitBtn.style.color = "#ffffff";
  });
  resetBtn.style.backgroundColor = "#a2dff7";
  resetBtn.style.color = "#003b5c";
  resetBtn.addEventListener("mouseleave", () => {
    resetBtn.style.backgroundColor = "#a2dff7";
    resetBtn.style.color = "#003b5c";
  });
  resetBtn.addEventListener("mouseenter", () => {
    resetBtn.style.backgroundColor = "#7ec8e3";
    resetBtn.style.color = "#ffffff";
  });

  darkBtn.style.backgroundColor = "#a2dff7";
  darkBtn.style.color = "#003b5c";
  darkBtn.addEventListener("mouseleave", () => {
    darkBtn.style.backgroundColor = "#a2dff7";
    darkBtn.style.color = "#003b5c";
  });
  darkBtn.addEventListener("mouseenter", () => {
    darkBtn.style.backgroundColor = "#7ec8e3";
    darkBtn.style.color = "#ffffff";
  });
}

function display(mili) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < 81) {
      input[index].value = game[Math.floor(index / 9)][index % 9] || "";
      if (input[index].value != "") {
        if (index % 2 === 0 && !isDarkmode)
          input[index].style.backgroundColor = "#E0F7FA";
        else if (index % 2 === 1 && !isDarkmode)
          input[index].style.backgroundColor = "#FFE3E3";
        else if (index % 2 === 0 && isDarkmode)
          input[index].style.backgroundColor = "#008080";
        else if (index % 2 === 1 && isDarkmode)
          input[index].style.backgroundColor = "#FF6347";
      }
      index++;
    } else {
      clearInterval(interval);
    }
  }, mili);
}

function isValid(board, i, j, val) {
  for (let z = 0; z < 9; z++) {
    if (!Number.isInteger(val)) return false;
    if (board[i][z] === val) return false;
    if (board[z][j] === val) return false;
    if (
      board[Math.floor(3 * Math.floor(i / 3) + Math.floor(z / 3))][
        Math.floor(3 * Math.floor(j / 3) + (z % 3))
      ] === val
    )
      return false;
  }
  return true;
}

function solve(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let val = 1; val <= 9; val++) {
          if (isValid(board, i, j, val)) {
            board[i][j] = val;
            if (solve(board)) return true;
            else board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

inialise();
darkBtn.addEventListener("click", () => {
  isDarkmode = isDarkmode ^ 1;
  display(0);
  if (isDarkmode) {
    darkMode();
  } else {
    lightMode();
  }
});

submitBtn.addEventListener("click", () => {
  solve(game);
  display(10);
});

resetBtn.addEventListener("click", () => {
  game = [];
  for (let i = 0; i < 9; i++) {
    game[i] = Array(9).fill(0);
  }
  let index = 0;
  const interval = setInterval(() => {
    if (index < 81) {
      input[index].value = "";
      if (!isDarkmode) input[index].style.backgroundColor = "#fff";
      else {
        input[index].style.backgroundColor = "#E0E0E0";
      }
      index++;
    } else {
      clearInterval(interval);
    }
  }, 10);

  msg.style.display = "none";
  submitBtn.style.display = "block";
});

returnBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

for (let i = 0; i < 81; i++) {
  input[i].addEventListener("input", () => {
    const value = Number(input[i].value);
    if (
      input[i].value === "" ||
      isValid(game, Math.floor(i / 9), i % 9, value)
    ) {
      game[Math.floor(i / 9)][i % 9] = value;
      msg.style.display = "none";
      submitBtn.style.display = "block";
      if (i % 2 === 0 && !isDarkmode)
        input[i].style.backgroundColor = "#E0F7FA";
      else if (i % 2 === 1 && !isDarkmode)
        input[i].style.backgroundColor = "#FFE3E3";
      else if (i % 2 === 0 && isDarkmode)
        input[i].style.backgroundColor = "#008080";
      else if (i % 2 === 1 && isDarkmode)
        input[i].style.backgroundColor = "#FF6347";
      if (input[i].value === "" && !isDarkmode)
        input[i].style.backgroundColor = "white";
      else if (input[i].value === "" && isDarkmode)
        input[i].style.backgroundColor = "#E0E0E0";
    } else {
      msg.style.display = "block";
      msg.innerHTML = "invalid input";
      submitBtn.style.display = "none";
    }
  });
}
