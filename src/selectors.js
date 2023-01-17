import GetElement from "./getElement.js";

const formSection = GetElement(".form");
const thankYouCard = GetElement(".thank_you_card");
const continueBtn = GetElement(".thank_you_card button");

const cvcOnCard = GetElement("#cvc_on_card");
const creditCardNumber = GetElement("#credit_card_number");
const nameOnCard = GetElement("#name_on_card");
const dateOnCard = GetElement("#date_on_card");

const form = GetElement("form");
const inputName = GetElement("#name");
const inputCardNumber = GetElement("#cardNumber");
const inputMonth = GetElement("#month");
const inputYear = GetElement("#year");
const inputCvc = GetElement("#cvc");

const errorMessage = document.querySelectorAll(".error_message");
const errorMessageForCard = GetElement(".message_for_card");
const errorMessageForCVC = GetElement(".message_for_cvc");
const errorMessageForDate = GetElement(".message_for_date");
const nameEl = GetElement(".name");
const cardNumberEl = GetElement(".card_number");
const expDateEl = GetElement(".exp_date");
const cvcEL = GetElement(".cvc");

export {
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
};
