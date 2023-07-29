const addresses = {
  "barber-1":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.080469215124!2d30.508185475505318!3d50.495460084123366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d201be77cd09%3A0xb36dbebe8b84863a!2z0LLRg9C70LjRhtGPINCe0LvQtdC60YHQsNC90LTRgNCwINCQ0YDRhdC40L_QtdC90LrQsCwgNCwg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1690543880223!5m2!1suk!2sua",
  "barber-2":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2536.816486615698!2d30.500097775507015!3d50.5189812824284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d23f80a545e5%3A0x489df2c453e25f7a!2z0J7QsdC-0LvQvtC90YHRjNC60LjQuSDQv9GA0L7RgdC_0LXQutGCLCAzNtCULCDQmtC40ZfQsiwgMDQyMTQ!5e0!3m2!1suk!2sua!4v1690664508067!5m2!1suk!2sua",
  "barber-3":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.9042226074766!2d30.64088657549999!3d50.424256089250804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c510ad646365%3A0x14632c7637e75de!2z0KXQsNGA0LrRltCy0YHRjNC60LUg0YjQvtGB0LUsIDU2LCDQmtC40ZfQsiwgMDIwMDA!5e0!3m2!1suk!2sua!4v1690664657014!5m2!1suk!2sua",
};

const addressBtns = document.querySelectorAll(".contacts__item-title");
const map = document.querySelector(".map");

const onBtnClick = (e) => {
  addressBtns.forEach((btn) => btn.classList.remove("active"));

  const chosenBarber = e.target.dataset.address;
  e.target.classList.add("active");

  map.setAttribute("src", addresses[chosenBarber]);
};

addressBtns.forEach((btn) => btn.addEventListener("click", onBtnClick));
