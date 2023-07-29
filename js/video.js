const video = document.querySelector(".video");
const playBtn = document.querySelector(".video__play");
const ctaBtn = document.querySelector(".video__cta");
const customControls = document.querySelector(".video__controls");

const onPlay = () => {
  video.volume = 0.2;
  video.style.opacity = 1;
  video.play();
  video.setAttribute("controls", true);
  customControls.style.display = "none";
};

playBtn.addEventListener("click", onPlay);
ctaBtn.addEventListener("click", onPlay);

video.addEventListener("ended", () => {
  video.removeAttribute("controls");
  video.style.opacity = 0;
  customControls.style.display = "flex";
});
