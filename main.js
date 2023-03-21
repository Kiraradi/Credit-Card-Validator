/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/creditCardValidatorModul/components/creditCardValidatorComponent/creditCardValidatorContloller.js
class creditCardValidatorContloller {
  constructor(htmlController) {
    this.htmlController = htmlController;
  }
  init() {
    this.htmlController.creditCardList = ["visa", "masterCart", "jcb", "discover", "americanExpress", "mir"];
    this.htmlController.drawUi();
  }
}
;// CONCATENATED MODULE: ./src/modules/creditCardValidatorModul/components/creditCardValidatorComponent/countLuhnAlgorithm.js
function countLuhnAlgorithm(cardNumber) {
  let checked = false;
  if (cardNumber) {
    let cardNumberArr = cardNumber.split("");
    if (cardNumberArr.length >= 13) {
      const checkDigit = Number(cardNumberArr.pop());
      cardNumberArr.reverse();
      if (cardNumberArr.every(el => !isNaN(Number(el))) && !isNaN(checkDigit)) {
        cardNumberArr = cardNumberArr.map(el => Number(el));
        for (let i = 1; i < cardNumberArr.length + 1; i++) {
          if (i % 2 === 1) {
            cardNumberArr[i - 1] = cardNumberArr[i - 1] * 2;
          }
        }
        cardNumberArr = cardNumberArr.map(el => {
          if (el > 9) {
            return el - 9;
          }
          return el;
        });
        const checksum = cardNumberArr.reduce((acum, el) => acum + el, 0) + checkDigit;
        if (checksum % 10 === 0) {
          checked = true;
        }
      }
    }
  }
  return checked;
}
;// CONCATENATED MODULE: ./src/modules/creditCardValidatorModul/components/creditCardValidatorComponent/creditCardValidatorHtmlContloller.js


class creditCardValidatorHtmlContloller {
  constructor(conteiner) {
    this.conteiner = conteiner;
    this.creditCardList = [];
    this.validatorCollback = () => {};
  }
  drawUi() {
    const blockValidator = document.createElement("div");
    blockValidator.classList.add("block-validator");
    blockValidator.appendChild(this.getCreditCardIcons());
    blockValidator.appendChild(this.getFormcreditCardValidator());
    this.conteiner.appendChild(blockValidator);
  }
  getCreditCardIcons() {
    if (this.creditCardList.length > 0) {
      const creditCardIcons = document.createElement("div");
      creditCardIcons.classList.add("credit-card-icons");
      for (const value of this.creditCardList) {
        const creditCardItem = document.createElement("div");
        creditCardItem.classList.add("credit-card-item", value);
        creditCardIcons.appendChild(creditCardItem);
      }
      return creditCardIcons;
    }
  }
  getFormcreditCardValidator() {
    const formValidatorEl = document.createElement("form");
    formValidatorEl.classList.add("form-validator");
    const formValidatorInputEl = document.createElement("input");
    formValidatorInputEl.classList.add("form-validator__input");
    formValidatorEl.appendChild(formValidatorInputEl);
    const formValidatorButtonEl = document.createElement("button");
    formValidatorButtonEl.classList.add("form-validator__button");
    formValidatorButtonEl.textContent = "Click to Validate";
    formValidatorEl.appendChild(formValidatorButtonEl);
    const formValidatorTextEl = document.createElement("div");
    formValidatorTextEl.classList.add("form-validator__text");
    formValidatorTextEl.textContent = "Проверка алгоритма Луна: ";
    const formValidatorTextStatusEl = document.createElement("span");
    formValidatorTextStatusEl.classList.add("form-validator__text-status");
    formValidatorTextStatusEl.textContent = "Не пройдена";
    formValidatorTextEl.appendChild(formValidatorTextStatusEl);
    formValidatorEl.appendChild(formValidatorTextEl);
    formValidatorEl.addEventListener("submit", e => {
      e.preventDefault();
      const inputForm = e.target.querySelector("input");
      this.setResultText(formValidatorTextStatusEl, countLuhnAlgorithm(inputForm.value));
    });
    formValidatorInputEl.addEventListener("input", e => {
      this.setResultIcon(e.target.value, formValidatorTextStatusEl);
    });
    return formValidatorEl;
  }
  setResultText(textEl) {
    let status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (status && status !== null) {
      textEl.textContent = "Успешно пройдена";
      textEl.style.color = "green";
    } else if (!status && status !== null) {
      textEl.textContent = "Провалена";
      textEl.style.color = "red";
    } else {
      textEl.textContent = "Не пройдена";
      textEl.style.color = "black";
    }
  }
  setResultIcon(value, textEl) {
    this.setResultText(textEl);
    if (value[0] === "4") {
      this.hideIcons("visa");
    } else if (value[0] === "2") {
      this.hideIcons("mir");
    } else if (value[0] === "5") {
      this.hideIcons("masterCart");
    } else if (value[0] === "3" && value[1] === "5") {
      this.hideIcons("jcb");
    } else if (value[0] === "3" && value[1] === "7") {
      this.hideIcons("americanExpress");
    } else if (value[0] === "6") {
      this.hideIcons("discover");
    }
    if (value.length === 0) {
      this.removeClassDarkbackgroung();
    }
  }
  hideIcons(cardName) {
    const creditCardIcons = Array.from(this.conteiner.querySelectorAll(".credit-card-item"));
    this.removeClassDarkbackgroung();
    creditCardIcons.forEach(el => {
      if (!el.classList.contains(cardName)) {
        el.classList.add("darkbackgroung");
      }
    });
  }
  removeClassDarkbackgroung() {
    const creditCardIcons = Array.from(this.conteiner.querySelectorAll(".credit-card-item"));
    creditCardIcons.forEach(el => el.classList.remove("darkbackgroung"));
  }
}
;// CONCATENATED MODULE: ./src/app.js


const conteiner = document.querySelector(".conteiner");
const htmlController = new creditCardValidatorHtmlContloller(conteiner);
const controller = new creditCardValidatorContloller(htmlController);
controller.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;