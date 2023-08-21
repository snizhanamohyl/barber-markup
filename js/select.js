const inputs = document.querySelectorAll("input");
const selectBtns = document.querySelectorAll(".select__btn");
const dateInputBtn = document.querySelector(".booking__date");
const dateBtnWrap = document.querySelector(".time-input");

const onInputChange = (input) => {
  input.closest(".booking__input-wrap").classList.add("changed");
  checkIfDateBtnDisabled();
};

inputs.forEach((input) =>
  input.addEventListener("change", () => onInputChange(input))
);

checkIfDateBtnDisabled = () => {
  const inputsAreEmpty = [...inputs].some((input) => input.value == "");
  const inputsBtnsAreEmpty = [...selectBtns].some(
    (selectBtn) => selectBtn.value === ""
  );

  if (inputsAreEmpty || inputsBtnsAreEmpty) {
    dateBtnWrap.classList.add("disabled");
    dateInputBtn.setAttribute("disabled", true);
    return;
  }

  dateBtnWrap.classList.remove("disabled");
  dateInputBtn.removeAttribute("disabled");
};

selectBtns.forEach((selectBtn) => {
  const selectEl = selectBtn.closest(".select");
  const options = selectEl.querySelector(".options");
  const arrowIcon = selectEl.querySelector(".select__icon");

  const toggleDropdown = () => {
    const isOpen = arrowIcon.classList.contains("open");

    if (isOpen) {
      arrowIcon.classList.remove("open");
    } else {
      arrowIcon.classList.add("open");
    }

    options.style.display =
      options.style.display === "block" ? "none" : "block";
  };

  selectBtn.addEventListener("click", toggleDropdown);

  const changeOption = (e) => {
    if (e.target.nodeName !== "BUTTON") return;

    selectBtn.value = e.target.value;

    const storedValue = JSON.parse(localStorage.getItem("form-values"));
    const storedValues = storedValue ? storedValue : {};

    const btnName = e.target.closest(".select").querySelector("button").name;

    const newStoredValues = {
      ...storedValues,
      [btnName]: e.target.value,
    };

    localStorage.setItem("form-values", JSON.stringify(newStoredValues));

    e.target
      .closest(".select")
      .querySelector(".booking__input-wrap")
      .classList.remove("error");

    selectBtn.querySelector(".select__btn-text").innerText = e.target.innerText;

    selectBtn.querySelector(".default-value").style.display = "none";

    onInputChange(selectBtn);
    checkIfDateBtnDisabled();

    toggleDropdown();
  };

  options.addEventListener("click", changeOption);
});
