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
  returnBtn.style.color = "#003b5c";
  body.style.backgroundColor = "#1A1A2E";
  for (let i = 0; i < 81; i++) {
    input[i].style.backgroundColor = "#a2dff7"; // light blue
    input[i].style.color = "#003b5c"; // dark blue text
    cell[i].style.borderColor = "#A0A0A0";
  }
  header.style.color = "#a2dff7";
  grid.style.borderColor = "#a2dff7";
  darkBtn.innerHTML = "Light Mode";

  const buttonStyle = (btn) => {
    btn.style.backgroundColor = "#a2dff7";
    btn.style.color = "#003b5c";
    btn.addEventListener("mouseleave", () => {
      btn.style.backgroundColor = "#a2dff7";
      btn.style.color = "#003b5c";
    });
    btn.addEventListener("mouseenter", () => {
      btn.style.backgroundColor = "#7ec8e3";
      btn.style.color = "#ffffff";
    });
  };

  buttonStyle(submitBtn);
  buttonStyle(resetBtn);
  buttonStyle(returnBtn);
  buttonStyle(darkBtn);
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
  grid.style.borderColor = "#a9a9a9";
  darkBtn.innerHTML = "Dark Mode";

  const buttonStyle = (btn) => {
    btn.style.backgroundColor = "#a2dff7";
    btn.style.color = "#003b5c";
    btn.addEventListener("mouseleave", () => {
      btn.style.backgroundColor = "#a2dff7";
      btn.style.color = "#003b5c";
    });
    btn.addEventListener("mouseenter", () => {
      btn.style.backgroundColor = "#7ec8e3";
      btn.style.color = "#ffffff";
    });
  };

  buttonStyle(submitBtn);
  buttonStyle(resetBtn);
  buttonStyle(returnBtn);
  buttonStyle(darkBtn);
}

function display(mili) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < 81) {
      input[index].value = game[Math.floor(index / 9)][index % 9] || "";
      if (input[index].value !== "") {
        if (!isDarkmode) {
          input[index].style.backgroundColor = index % 2 === 0 ? "#E0F7FA" : "#FFE3E3";
          input[index].style.color = "#003b5c";
        } else {
          input[index].style.backgroundColor = index % 2 === 0 ? "#a2dff7" : "#7ec8e3";
          input[index].style.color = "#003b5c";
        }
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
  isDarkmode ? darkMode() : lightMode();
});

submitBtn.addEventListener("click", () => {
  solve(game);
  display(10);
});

resetBtn.addEventListener("click", () => {
  game = Array.from({ length: 9 }, () => Array(9).fill(0));
  let index = 0;
  const interval = setInterval(() => {
    if (index < 81) {
      input[index].value = "";
      input[index].style.backgroundColor = isDarkmode ? "#E0E0E0" : "#fff";
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
    const rowIdx = Math.floor(i / 9), colIdx = i % 9;

    if (input[i].value === "" || isValid(game, rowIdx, colIdx, value)) {
      game[rowIdx][colIdx] = value;
      msg.style.display = "none";
      submitBtn.style.display = "block";

      if (!isDarkmode) {
        input[i].style.backgroundColor = i % 2 === 0 ? "#E0F7FA" : "#FFE3E3";
        input[i].style.color = "#003b5c";
      } else {
        input[i].style.backgroundColor = i % 2 === 0 ? "#a2dff7" : "#7ec8e3";
        input[i].style.color = "#003b5c";
      }

      if (input[i].value === "") {
        input[i].style.backgroundColor = isDarkmode ? "#E0E0E0" : "#ffffff";
      }
    } else {
      msg.style.display = "block";
      msg.innerHTML = "invalid input";
      submitBtn.style.display = "none";
    }
  });
}
