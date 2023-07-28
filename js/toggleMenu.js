const html = document.querySelector("html");

const mobileMenu = document.querySelector(".mob-menu");
const openMenuBtn = document.querySelector("[data-open]");
const closeMenuBtn = document.querySelector("[data-close]");

function toggleMenu() {
  mobileMenu.classList.toggle("is-open");

  const isOpen = mobileMenu.classList.contains("is-open");
  html.style.overflow = isOpen ? "hidden" : "auto";
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
