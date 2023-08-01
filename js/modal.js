const backdrop = document.querySelector(".backdrop");
const closeModalBtn = backdrop.querySelector(".close-btn");
const dateInputEl = document.querySelector(".booking__date");
const dateModalContent = document.querySelector(".modal__date-content");
const timeModalContent = document.querySelector(".modal__time-content");
const chooseTimeBtn = backdrop.querySelector(".choose-time");
const prevModalBtn = backdrop.querySelector(".prev-content");
const finishModalBtn = backdrop.querySelector(".modal-finish");
const timeNavElems = document.querySelectorAll(".time__nav-btn");

const resetNavStyles = () => {
  timeNavElems[0].setAttribute("disabled", true);
  timeNavElems[1].removeAttribute("disabled");
};

const toggleModal = () => {
  if (backdrop.classList.contains("visually-hidden")) {
    backdrop.classList.remove("visually-hidden");
  } else {
    backdrop.classList.add("visually-hidden");
  }

  resetNavStyles();
};

const showTimeModalContent = () => {
  dateModalContent.classList.add("visually-hidden");
  timeModalContent.classList.remove("visually-hidden");
};

const showPrevModalContent = () => {
  dateModalContent.classList.remove("visually-hidden");
  timeModalContent.classList.add("visually-hidden");

  resetNavStyles();
};

chooseTimeBtn.addEventListener("click", showTimeModalContent);
prevModalBtn.addEventListener("click", showPrevModalContent);

finishModalBtn.addEventListener("click", toggleModal);
closeModalBtn.addEventListener("click", toggleModal);
dateInputEl.addEventListener("click", toggleModal);
