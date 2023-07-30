const inputs = document.querySelectorAll("input");
const selectBtns = document.querySelectorAll(".select__btn");
const dateBtnWrap = document.querySelector(".booking__date");

const onInputChange = (input) => {
  input.closest(".booking__input-wrap").classList.add("changed");
  checkIfDateBtnDisabled();
};

inputs.forEach((input) =>
  input.addEventListener("change", () => onInputChange(input))
);

checkIfDateBtnDisabled = () => {
  const isEmpty = [...inputs].some((input) => input.value == "");

  if (isEmpty || selectBtns[0].value === "") {
    dateBtnWrap.classList.add("disabled");
    dateBtnWrap.setAttribute("disabled", true);
    return;
  }

  dateBtnWrap.classList.remove("disabled");
  dateBtnWrap.removeAttribute("disabled");
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
    selectBtn.querySelector("p").innerText = e.target.innerText;
    onInputChange(selectBtn);
    checkIfDateBtnDisabled();

    toggleDropdown();
  };

  options.addEventListener("click", changeOption);
});
