import './css/creditCardValidatorStyle.css'
export default class creditCardValidatorHtmlContloller {
    constructor(conteiner) {
        this.conteiner = conteiner;
        this.creditCardList = [];
        this.validatorCollback = () => {};
    }

    drawUi() {
        const blockValidator = document.createElement('div');
        blockValidator.classList.add('block-validator');

        blockValidator.appendChild(this.getCreditCardIcons());
        blockValidator.appendChild(this.getFormcreditCardValidator());

        this.conteiner.appendChild(blockValidator);
    }

    getCreditCardIcons() {
        if (this.creditCardList.length > 0) {
           const creditCardIcons = document.createElement('div');
           creditCardIcons.classList.add('credit-card-icons');

           for (const value of this.creditCardList) {
            const creditCardItem = document.createElement('div');
            creditCardItem.classList.add('credit-card-item',value)
            creditCardIcons.appendChild(creditCardItem);
           }

           return creditCardIcons
        }
        
    }


    getFormcreditCardValidator() {
        const formValidator = document.createElement('form');
        formValidator.classList.add('form-validator');

        const formValidatorInput = document.createElement('input');
        formValidatorInput.classList.add('form-validator__input');
        formValidator.appendChild(formValidatorInput);

        const formValidatorButton = document.createElement('button');
        formValidatorButton.classList.add('form-validator__button');
        formValidatorButton.textContent = 'Click to Validate';
        formValidator.appendChild(formValidatorButton);

        formValidator.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e);
        })

        return formValidator;
    }
}