import {
  formSection,
  thankYouCard,
  continueBtn,
  cvcOnCard,
  creditCardNumber,
  nameOnCard,
  dateOnCard,
  form,
  inputCardNumber,
  inputName,
  inputMonth,
  inputYear,
  inputCvc,
  errorMessage,
  errorMessageForCard,
  errorMessageForCVC,
  errorMessageForDate,
  nameEl,
  cardNumberEl,
  expDateEl,
  cvcEL,
} from "./selectors.js";

/* Animation properties */
const alertFadeIn = [{ opacity: "0" }, { opacity: "1" }];
const alertTiming = { duration: 400, iterations: 1, fill: "forwards" };

continueBtn.addEventListener("click", () => {
  formSection.animate(alertFadeIn, alertTiming);
  thankYouCard.animate(alertFadeIn, alertTiming);
  formSection.classList.remove("hide");
  form.style.display = "flex";
});

/* Regex */
const validCreditCardNumber = /^\d{4}(?:[\s]?\d{4}){3}$/;
const validCVC = /^\d{3,4}$/;
const validYear = /^2[3-8]$/;
const validMonth = /^0[0-9]|1[0-2]$/;
const allNumbers = /^\d+$/;

form.addEventListener("submit", validateCard);

function validateCard(e) {
  e.preventDefault();

  /* A function to show error messages if all the conditions in it pass */
  showErrorMessage();

  const someValuesEmpty =
    !!inputName.value +
    !!inputCardNumber.value +
    !!inputMonth.value +
    !!inputYear.value +
    !!inputCvc.value;

  if (someValuesEmpty < 5) {
    return;
  }

  const numbers = inputCardNumber.value;

  cvcOnCard.textContent = inputCvc.value;
  creditCardNumber.textContent = numbers
    .replace(/\D/g, "")
    .match(/.{1,4}/g)
    .join(" ");

  nameOnCard.textContent = inputName.value;
  dateOnCard.textContent = `${inputMonth.value}/${inputYear.value}`;

  const validCard = validateCardNumber(numbers);

  if (!validCard) {
    cardNumberEl.classList.add("error");
    errorMessageForCard.textContent = "Card number is invalid";
    return;
  }
  cardNumberEl.classList.remove("error");
  errorMessageForCard.textContent = "Wrong format, numbers only";

  /* A function to hide error messages if all the conditions in it pass */
  hideErrorMessage();
  addCardDetails();
  e.target.reset();

  /* animate elements */
  errorMessage.forEach((message) => {
    message.animate(alertFadeIn, alertTiming);
  });

  formSection.animate(alertFadeIn, alertTiming);
  thankYouCard.animate(alertFadeIn, alertTiming);
}

/* This is an event listener that is listening for an input event on the inputName element. */
inputName.addEventListener("input", (e) => {
  if (e.target.value) {
    nameEl.classList.remove("error");
  }

  nameOnCard.textContent = !e.target.value ? "Jane Appleseed" : e.target.value;
});

/* This is an event listener that is listening for an input event on the inputCardNumber element. */
inputCardNumber.addEventListener("input", (e) => {
  if (e.target.value) {
    cardNumberEl.classList.remove("error");
  }

  /* A ternary operator. If the value of the input is empty, it will display 0000 0000 0000 0000. If
  the value is not empty, it will replace all non-digit characters with an empty string, then match
  the string with a regular expression that will match every 4 characters and join them with a
  space. */
  creditCardNumber.textContent = !e.target.value
    ? "0000 0000 0000 0000"
    : e.target.value
        .replace(/\D/g, "")
        .match(/.{1,4}/g)
        .join(" ");

  switch (true) {
    case !validCreditCardNumber.test(e.target.value) &&
      allNumbers.test(e.target.value):
      errorMessageForCard.textContent =
        "Wrong format, number must be 16 digits";
      break;

    default:
      errorMessageForCard.textContent = "Wrong format, numbers only";
      break;
  }
});

/* This is an event listener that is listening for an input event on the inputMonth element. */
inputMonth.addEventListener("input", (e) => {
  dateOnCard.textContent = `
  ${!e.target.value ? "00" : e.target.value}/
  ${!inputYear.value ? "00" : inputYear.value}`;

  switch (true) {
    case !validMonth.test(e.target.value) && allNumbers.test(e.target.value):
      errorMessageForDate.textContent = "Wrong month format";
      break;

    default:
      errorMessageForDate.textContent = "Can't be blank";
      break;
  }

  if (e.target.value) {
    expDateEl.classList.remove("month_empty");
    expDateEl.classList.remove("error");
  }
});

/* This is an event listener that is listening for an input event on the inputYear element. */
inputYear.addEventListener("input", (e) => {
  dateOnCard.textContent = `${!inputMonth.value ? "00" : inputMonth.value}/${
    !e.target.value ? "00" : e.target.value
  }`;

  switch (true) {
    case !validYear.test(e.target.value) && allNumbers.test(e.target.value):
      errorMessageForDate.textContent = "Wrong year format";
      break;

    default:
      errorMessageForDate.textContent = "Can't be blank";
      break;
  }

  if (e.target.value) {
    expDateEl.classList.remove("year_empty");
    expDateEl.classList.remove("error");
  }
});

/* This is an event listener that is listening for an input event on the inputCVC element. */
inputCvc.addEventListener("input", (e) => {
  if (e.target.value) {
    cvcEL.classList.remove("error");
  }
  cvcOnCard.textContent = !e.target.value ? "000" : e.target.value;

  switch (true) {
    case !validCVC.test(e.target.value) && allNumbers.test(e.target.value):
      errorMessageForCVC.textContent = "Must be 3 digits";
      break;

    default:
      errorMessageForCVC.textContent = "Can't be blank";
      break;
  }
});

/**
 * "If the sum of the digits in the odd positions is a multiple of 10, the number is valid."
 *
 * The Luhn algorithm is a simple checksum formula used to validate a variety of identification
 * numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers in the
 * United States, Canadian Social Insurance Numbers, and Israel ID Numbers
 * @param cardNumber - The credit card number to validate.
 * @returns a boolean value.
 */
function validateCardNumber(cardNumber) {
  // Remove all non-digit characters
  cardNumber = cardNumber.replace(/\D/g, "");

  // The Luhn algorithm:
  let sum = 0,
    digit,
    addend,
    timesTwo = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    digit = +cardNumber[i];
    if (timesTwo) {
      addend = digit * 2;
      if (addend > 9) {
        addend -= 9;
      }
    } else {
      addend = digit;
    }
    sum += addend;
    timesTwo = !timesTwo;
  }

  // If the total is a multiple of 10, the number is valid
  return sum % 10 === 0;
}

function showErrorMessage() {
  if (!inputName.value) {
    nameEl.classList.add("error");
  }

  if (!inputCardNumber.value) {
    cardNumberEl.classList.add("error");
  }

  if (!inputMonth.value || !inputYear.value) {
    expDateEl.classList.add("error");
  }

  if (!inputMonth.value) {
    expDateEl.classList.add("month_empty");
  }

  if (!inputYear.value) {
    expDateEl.classList.add("year_empty");
  }

  if (!inputCvc.value) {
    cvcEL.classList.add("error");
  }
}

function hideErrorMessage() {
  expDateEl.classList.remove("error");
  expDateEl.classList.remove("month_empty");
  expDateEl.classList.remove("year_empty");
  nameEl.classList.remove("error");
  cardNumberEl.classList.remove("error");
  cvcEL.classList.remove("error");
}

function addCardDetails() {
  formSection.classList.add("hide");
  form.style.display = "none";
}

function resetForm() {
  formSection.classList.add("hide");
  form.style.display = "none";
}
