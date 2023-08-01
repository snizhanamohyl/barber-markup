const scrollToTopBtn = document.querySelector(".scroll-to-top-btn");

const ShowHideBtn = () => {
  if (document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

const scrollToTop = () => {
  document.documentElement.scrollTop = 0;
};

window.addEventListener("scroll", ShowHideBtn);
scrollToTopBtn.addEventListener("click", scrollToTop);
