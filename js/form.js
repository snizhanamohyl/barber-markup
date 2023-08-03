const inputElems = document.querySelectorAll(".booking__input");
const bookingForm = document.querySelector(".booking__form");

const onNameChange = (e) => {
  const nameValue = e.target.value;

  const nameRegex =
    /^[a-zA-ZА-Яа-яіїє ]+([ \-\']{0,1}[a-zA-ZА-Яа-яіїє ]+){0,2}/g;

  const isValid = nameValue.match(nameRegex)[0] === nameValue;

  if (isValid) {
    e.target.closest(".booking__input-wrap").classList.remove("error");
  } else {
    e.target.closest(".booking__input-wrap").classList.add("error");
    e.target
      .closest(".booking__input-wrap")
      .querySelector(".error-msg").innerText = "ім'я введено некоректно";
  }
};

const normalizeNumber = (e) => {
  const x = e.target.value
    .slice(5)
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);

  const normalizedNumber =
    "+38(0" + x[1] + (x[2] ? ")-" + x[2] : "") + (x[3] ? "-" + x[3] : "");

  e.target.value = normalizedNumber;
};

const onPhoneChange = (e) => {
  if (e.target.value.length !== 17) {
    e.target.closest(".booking__input-wrap").classList.add("error");
    e.target
      .closest(".booking__input-wrap")
      .querySelector(".error-msg").innerText = "некоректний номер";
  } else {
    e.target.closest(".booking__input-wrap").classList.remove("error");
  }
};

const onPhoneInputFocus = (e) => {
  if (e.target.value !== "") return;

  e.target.value = "+38(0";
};

const successModal = document.querySelector(".modal__success");

const onSubmit = (e) => {
  e.preventDefault();

  let isError = false;

  inputElems.forEach((input) => {
    const inputWrap = input.closest(".booking__input-wrap");

    if (input.value === "") {
      inputWrap.classList.add("error");
      inputWrap.querySelector(".error-msg").innerText = "обов'язкове поле";
      isError = true;
      return;
    }

    if (inputWrap.classList.contains("error")) isError = true;
  });

  if (isError) return;

  const submitData = {};

  inputElems.forEach((input) => {
    submitData[input.name] = input.value;
    input.closest(".booking__input-wrap").classList.remove("changed");
  });

  console.log("submitData", submitData);

  bookingForm.reset();

  [...inputElems].splice(2).forEach((input) => {
    input.value = "";

    const defaultValueWrap = input
      .closest(".booking__input-wrap")
      .querySelector(".default-value");

    input
      .closest(".booking__input-wrap")
      .querySelector(".select__btn-text").innerText = "";

    if (defaultValueWrap) defaultValueWrap.style.display = "block";
  });

  toggleModal();
  successModal.style.display = "block";
  document.querySelector(".modal__form").classList.add("visually-hidden");
  return submitData;
};

inputElems[0].addEventListener("change", onNameChange);

inputElems[1].addEventListener("input", normalizeNumber);
inputElems[1].addEventListener("change", onPhoneChange);
inputElems[1].addEventListener("focus", onPhoneInputFocus);

bookingForm.addEventListener("submit", onSubmit);
