const backdrop = document.querySelector(".backdrop");
const closeModalBtn = backdrop.querySelector(".close-btn");
const dateInputEl = document.querySelector(".booking__date");

const toggleModal = () => {
  console.log("vew");
  if (backdrop.classList.contains("visually-hidden")) {
    backdrop.classList.remove("visually-hidden");
  } else {
    backdrop.classList.add("visually-hidden");
  }
};

closeModalBtn.addEventListener("click", toggleModal);
dateInputEl.addEventListener("click", toggleModal);
