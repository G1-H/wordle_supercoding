let attempts = 0;
let index = 0;
let correctWord = "JIWON";
let howManyCorrect = 0;

function appStart() {
  const backspaceKeydown = () => {
    if (index !== 0) {
      const eraseBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      eraseBlock.innerText = "";
      index--;
    }
  };
  const enterKeydown = () => {
    for (let i = 0; i < 5; i++) {
      const comparedBlock = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      if (correctWord[i] === comparedBlock.innerText) {
        comparedBlock.style = "background-color:#F5793A; color : white;";
        comparedBlock.style.animation = "0.5s ease-in 0.1s action1";
        howManyCorrect++;
      } else if (correctWord.includes(comparedBlock.innerText)) {
        comparedBlock.style = "background-color:#85BFF9; color : white;";
        comparedBlock.style.animation = "0.5s ease-in 0.1s action1";
      } else {
        comparedBlock.style = "background-color:#787C7E; color : white;";
        comparedBlock.style.animation = "0.5s ease-in 0.1s action1";
      }
    }
    if (howManyCorrect === 5) {
      keyLock();
      success();
    } else {
      if (attempts !== 5) {
        attempts++;
        index = 0;
        howManyCorrect = 0;
      } else {
        keyLock();
        fail();
      }
    }
  };
  const keyLock = () => {
    window.removeEventListener("keydown", handleKeydown);
  };
  const success = () => {
    const successNotice = document.querySelector(".success");
    successNotice.style.display = "block";
    successNotice.style.animation = "1s ease-in 0.1s action2";
    window.clearInterval(interval);
  };
  const fail = () => {
    const failNoitce = document.querySelector(".fail");
    failNoitce.style.display = "block";
    failNoitce.style.animation = "1s ease-in 0.1s action2";
    window.clearInterval(interval);
  };
  const handleKeydown = (ev) => {
    const key = ev.key.toUpperCase();
    const keyCode = ev.keyCode;
    if (index === 5) {
      if (key === "ENTER") {
        enterKeydown();
      } else if (key === "BACKSPACE") {
        backspaceKeydown();
      } else {
        return;
      }
    } else {
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      if (65 <= keyCode && keyCode <= 90 && ev.altKey === false) {
        thisBlock.innerText = key;
        index++;
        console.log(ev);
      } else if (key === "BACKSPACE") {
        backspaceKeydown();
      }
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

appStart();

const startTimer = () => {
  let timer = document.querySelector("#timer");
  const start_time = new Date();
  function setTime() {
    let now = new Date();
    let last_time = new Date(now - start_time);
    const min = last_time.getMinutes().toString().padStart(2, "0");
    const sec = last_time.getSeconds().toString().padStart(2, "0");
    timer.innerText = `${min}:${sec}`;
    if (Number(min) == 01) {
      timer.style.color = "#F5793A";
    } else if (Number(min) > 01) {
      timer.style.color = "red";
    }
  }
  let interval = window.setInterval(setTime, 1000);
};

startTimer();
