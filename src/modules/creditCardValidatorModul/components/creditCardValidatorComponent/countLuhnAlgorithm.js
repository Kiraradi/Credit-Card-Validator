export default function countLuhnAlgorithm(cardNumber) {
  let checked = false;
  if (cardNumber) {
    let cardNumberArr = cardNumber.split("");

    if (cardNumberArr.length >= 13) {
      const checkDigit = Number(cardNumberArr.pop());

      cardNumberArr.reverse();

      if (
        cardNumberArr.every((el) => !isNaN(Number(el))) &&
        !isNaN(checkDigit)
      ) {
        cardNumberArr = cardNumberArr.map((el) => Number(el));
        for (let i = 1; i < cardNumberArr.length + 1; i++) {
          if (i % 2 === 1) {
            cardNumberArr[i - 1] = cardNumberArr[i - 1] * 2;
          }
        }
        cardNumberArr = cardNumberArr.map((el) => {
          if (el > 9) {
            return el - 9;
          }
          return el;
        });

        const checksum =
          cardNumberArr.reduce((acum, el) => acum + el, 0) + checkDigit;

        if (checksum % 10 === 0) {
          checked = true;
        }
      }
    }
  }

  return checked;
}
