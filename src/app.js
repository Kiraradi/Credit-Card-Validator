import creditCardValidatorContloller from "./modules/creditCardValidatorModul/components/creditCardValidatorComponent/creditCardValidatorContloller";
import creditCardValidatorHtmlContloller from "./modules/creditCardValidatorModul/components/creditCardValidatorComponent/creditCardValidatorHtmlContloller";

const conteiner = document.querySelector(".conteiner");

const htmlController = new creditCardValidatorHtmlContloller(conteiner);
const controller = new creditCardValidatorContloller(htmlController);

controller.init();
