const sliders = document.querySelectorAll(".slider__wrap");

sliders.forEach((slider) => {
  const sliderFirstCard = slider.querySelector("li");
  let navBtns = slider.closest("section").querySelectorAll(".arrows-nav-btn");
  let cardWidth = sliderFirstCard.clientWidth + 32;

  if (navBtns.length === 0) {
    navBtns = slider.querySelectorAll(".gallery__btn");
    cardWidth = sliderFirstCard.clientWidth;
  }

  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const sliderScrollWidth = slider.scrollWidth - slider.clientWidth;

  const disableBtns = () => {
    navBtns[0].disabled = slider.scrollLeft === 0 ? true : false;
    navBtns[1].disabled =
      slider.scrollLeft === sliderScrollWidth ? true : false;
  };

  const onNavBtnClick = (e) => {
    const isScrollToLeft = e.currentTarget.classList.contains("left");

    slider.scrollLeft += isScrollToLeft ? -cardWidth : cardWidth;
    setTimeout(() => disableBtns(), 330);
  };

  const autoSlide = () => {
    if (slider.scrollLeft === sliderScrollWidth) return;

    positionDiff = Math.abs(positionDiff);

    const valDiff = cardWidth - positionDiff;

    if (slider.scrollLeft > prevScrollLeft) {
      return (slider.scrollLeft +=
        positionDiff > cardWidth / 3 ? valDiff : -positionDiff);
    } else {
      return (slider.scrollLeft -=
        positionDiff > cardWidth / 3 ? valDiff : -positionDiff);
    }
    //   console.log("🚀 ~ file: slider.js:30 ~ autoSlide ~ valDiff:", valDiff);
  };

  navBtns.forEach((btn) => btn.addEventListener("click", onNavBtnClick));

  const onDragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
  };

  const onDragEnd = () => {
    isDragStart = false;
    slider.classList.remove("isDragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };

  const onDrag = (e) => {
    if (!isDragStart) return;
    e.preventDefault();

    slider.classList.add("isDragging");
    isDragging = true;

    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    disableBtns();
  };

  slider.addEventListener("mousedown", onDragStart);
  slider.addEventListener("touchstart", onDragStart);

  slider.addEventListener("mousemove", onDrag);
  slider.addEventListener("touchmove", onDrag);

  slider.addEventListener("mouseup", onDragEnd);
  slider.addEventListener("touchend", onDragEnd);

  slider.addEventListener("mouseleave", onDragEnd);
});
