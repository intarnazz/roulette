let balance = document.getElementById("balance");
let bid = document.getElementById("bid");
let massage = document.getElementById("massage");
let result = document.getElementById("result");
let choice = document.getElementById("choice");
let table = document.getElementById("table");
let img = document.getElementById("img");

const user = prompt("user") || "user";

if (!localStorage.getItem("table")) {
  localStorage.setItem("table", JSON.stringify({}));
}

if (!JSON.parse(localStorage.getItem("table"))[user]) {
  let table = JSON.parse(localStorage.getItem("table"));
  table[user] = { sum: 0, balance: 0 };
  localStorage.setItem("table", JSON.stringify(table));
}

function getBalance() {
  return +JSON.parse(localStorage.getItem("table"))[user].balance;
}

function setBalance(value) {
  let table = JSON.parse(localStorage.getItem("table"));
  table[user].balance = value;
  localStorage.setItem("table", JSON.stringify(table));
  init();
}

function getBid() {
  return +bid.value;
}

function init() {
  balance.innerHTML = getBalance() + "$";
  let tableJSON = JSON.parse(localStorage.getItem("table"));

  const sortedEntries = Object.entries(tableJSON).sort(
    ([, a], [, b]) => b.sum - a.sum
  );
  let keys = sortedEntries.map(([key, value]) => key);
  let values = sortedEntries.map(([key, value]) => value);
  let s = "";
  s = `<tbody>`;
  for (let i = 0; i < values.length; i++) {
    s += `
  <tr>
  <td>${keys[i]}</td>
  <td>${values[i].sum}</td>
  </tr>`;
  }
  s += "</tbody>";
  table.innerHTML = s;
}

function degTransform(deg) {
  deg = Math.round(deg / 9.7);
  switch (deg) {
    case 0:
      return 0;
    case 1:
      return 26;
    case 2:
      return 3;
    case 3:
      return 35;
    case 4:
      return 12;
    case 5:
      return 28;
    case 6:
      return 7;
    case 7:
      return 29;
    case 8:
      return 18;
    case 9:
      return 22;
    case 10:
      return 9;
    case 11:
      return 31;
    case 12:
      return 14;
    case 13:
      return 20;
    case 14:
      return 1;
    case 15:
      return 33;
    case 16:
      return 16;
    case 17:
      return 24;
    case 18:
      return 5;
    case 19:
      return 10;
    case 20:
      return 23;
    case 21:
      return 8;
    case 22:
      return 30;
    case 23:
      return 11;
    case 24:
      return 36;
    case 25:
      return 13;
    case 26:
      return 27;
    case 27:
      return 6;
    case 28:
      return 34;
    case 29:
      return 17;
    case 30:
      return 25;
    case 31:
      return 2;
    case 32:
      return 21;
    case 33:
      return 4;
    case 34:
      return 19;
    case 35:
      return 15;
    case 36:
      return 32;
    default:
      return 0;
  }
}

function degColor(deg) {
  switch (true) {
    case [
      26, 35, 28, 29, 22, 31, 20, 33, 24, 10, 8, 11, 13, 6, 17, 2, 4, 15,
    ].includes(deg):
      return "black";
    case [
      3, 12, 7, 18, 9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32,
    ].includes(deg):
      return "red";
    default:
      return "zero";
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rotate = {
  roulette: document.getElementById("roulette"),
  num: document.getElementById("num"),
  deg: 0,
  rotate: function () {
    this.deg += 3;
    this.deg = this.deg < 360 ? this.deg : 0;
    this.roulette.style.transform = `rotate(${this.deg}deg)`;
    this.num.innerHTML = degTransform(this.deg);
  },
};

function spin(rate) {
  if (choice <= 0 && rate === "choice") {
    massage.innerHTML = "неверный выбор числа";
  } else if (getBid() <= 0) {
    massage.innerHTML = "Маленькая ставка";
  } else if (getBalance() < getBid()) {
    massage.innerHTML = "Маленький баланс";
  } else {
    let bonus = 0;
    massage.innerHTML = "";
    result.innerHTML = "";
    let interval = setInterval(rotate.rotate.bind(rotate), getRandomInt(2, 20));
    let timeout = setTimeout(() => {
      clearInterval(interval);
      clearTimeout(timeout);
      result.innerHTML = (
        rate === "choice"
          ? (() => {
              bonus = getBid() * 2;
              return (
                +document.getElementById("num").innerHTML === +choice.value
              );
            })()
          : (() => {
              switch (rate) {
                case "black":
                  return true;
                case "red":
                  return true;
                case "zero":
                  bonus = getBid() * 3;
                  return true;
                default:
                  return false;
              }
            })()
          ? (() => {
              return (
                degColor(+document.getElementById("num").innerHTML) === rate
              );
            })()
          : (() => {
              if (+document.getElementById("num").innerHTML % 2 === 0) {
                return rate === "even";
              } else {
                return rate !== "even";
              }
            })()
      )
        ? (() => {
            setBalance(getBalance() + getBid() + bonus);
            let table = JSON.parse(localStorage.getItem("table"));
            table[user].sum += getBid() + bonus;
            table[user].balance = getBalance();
            localStorage.setItem("table", JSON.stringify(table));
            init();
            img.innerHTML = `<img src="./img/win/${Math.floor(
              Math.random() * 17
            )}.gif" alt="img"><h1>you win</h1>`;
            setTimeout(() => {
              img.innerHTML = "";
            }, 5000);
            return "you win";
          })()
        : (() => {
            setBalance(getBalance() - getBid());
            let table = JSON.parse(localStorage.getItem("table"));
            table[user].sum += -getBid();
            table[user].balance = getBalance();
            localStorage.setItem("table", JSON.stringify(table));
            init();
            img.innerHTML = `<img src="./img/lose/${Math.floor(
              Math.random() * 11
            )}.gif" alt="img"><h1>you lose</h1>`;
            setTimeout(() => {
              img.innerHTML = "";
            }, 5000);
            return "you lose";
          })();
    }, getRandomInt(4000, 10000));
  }
}

init();
