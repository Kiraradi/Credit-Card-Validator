import "./css/creditCardValidatorStyle.css";
import countLuhnAlgorithm from "./countLuhnAlgorithm";
export default class creditCardValidatorHtmlContloller {
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

    formValidatorEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputForm = e.target.querySelector("input");
      this.setResultText(
        formValidatorTextStatusEl,
        countLuhnAlgorithm(inputForm.value)
      );
    });

    formValidatorInputEl.addEventListener("input", (e) => {
      this.setResultIcon(e.target.value, formValidatorTextStatusEl);
    });

    return formValidatorEl;
  }

  setResultText(textEl, status = null) {
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
    const creditCardIcons = Array.from(
      this.conteiner.querySelectorAll(".credit-card-item")
    );
    this.removeClassDarkbackgroung();
    creditCardIcons.forEach((el) => {
      if (!el.classList.contains(cardName)) {
        el.classList.add("darkbackgroung");
      }
    });
  }

  removeClassDarkbackgroung() {
    const creditCardIcons = Array.from(
      this.conteiner.querySelectorAll(".credit-card-item")
    );
    creditCardIcons.forEach((el) => el.classList.remove("darkbackgroung"));
  }
}
