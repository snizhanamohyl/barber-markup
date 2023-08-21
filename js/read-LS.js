const formInputElems = document.querySelectorAll(".booking__input");

const stored = JSON.parse(localStorage.getItem("form-values"));
const storedValues = stored ? stored : {};

const checkIfDatePickerDisabled = () => {
  const inputNames = Object.keys(storedValues);

  const inputNamesExceptDate = [...inputNames].filter(
    (name) => name !== "date"
  );

  const isDisabled =
    inputNamesExceptDate.length === 0
      ? true
      : inputNamesExceptDate.some((name) => !storedValues[name]);

  if (isDisabled) return;

  const dateInput = [...formInputElems].find((input) => input.name === "date");

  dateInput.closest(".booking__input-wrap").classList.remove("disabled");
  dateInput.removeAttribute("disabled");

  if (storedValues.date) dateInput.innerText = storedValues.date;
};

checkIfDatePickerDisabled();

const enterField = () => {
  formInputElems.forEach((input) => {
    if (!storedValues[input.name]) return;

    input.value = storedValues[input.name];
    input.closest(".booking__input-wrap").classList.add("changed");

    if (input.nodeName === "INPUT") return;

    const options = input.closest(".select")?.querySelectorAll(".options__btn");

    if (options.length) {
      const chosenOption = [...options].find(
        (option) => option.value === storedValues[input.name]
      );

      input.querySelector(".select__btn-text").innerText =
        chosenOption.innerText.trim();

      input.querySelector(".default-value").style.display = "none";
    }
  });
};

enterField();
