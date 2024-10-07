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

function name() {
  
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rotate = {
  roulette: document.getElementById("roulette"),
  num: document.getElementById("num"),
  deg: 0,
  rotate: function () {
    this.deg = this.deg++ < 360 ? this.deg : 0;
    this.roulette.style.transform = `rotate(${this.deg}deg)`;
    this.num.innerHTML = degTransform(this.deg);
  },
};

function spin(rate) {
  let result = document.getElementById("result");
  result.innerHTML = "";
  let Interval = setInterval(rotate.rotate.bind(rotate), getRandomInt(1, 20));
  let timeout = setTimeout(() => {
    clearInterval(Interval);
    clearTimeout(timeout);
    result.innerHTML =
      degColor(+document.getElementById("num").innerHTML) === rate
        ? "you win"
        : "you lose";
  }, 5000);
}
