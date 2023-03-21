export default class creditCardValidatorContloller {
    constructor(htmlController) {
        this.htmlController = htmlController;

    }

    init() {
        this.htmlController.creditCardList = ['visa', 'masterCart', 'jcb', 'discover', 'americanExpress', 'mir'];
        this.htmlController.drawUi();
    }
}