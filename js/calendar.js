const currentDate = document.querySelector(".current-date");
const monthWrap = document.querySelector(".calendar__month");
const navBtns = document.querySelectorAll(".calendar__nav");
const chosenYearEl = document.querySelector(".calendar__header-year");
const chosenDayEl = document.querySelector(".calendar__header-day");
const chosenDateEl = document.querySelector(".modal__chosen-date");

let date = new Date(),
  curYear,
  curMonth,
  curDay;

const updateDate = (date) => {
  curYear = date.getFullYear();
  curMonth = date.getMonth();
  curDay = date.getDate();
};

const todayDate = new Date();

updateDate(date);

const months = [
  "Cічень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];
const monthsCase = [
  "Cічня",
  "Лютого",
  "Березня",
  "Квітня",
  "Травня",
  "Червня",
  "Липня",
  "Серпня",
  "Вересня",
  "Жовтня",
  "Листопада",
  "Грудня",
];
const shortenMonths = [
  "Cіч",
  "Лют",
  "Бер",
  "Квіт",
  "Трав",
  "Чер",
  "Лип",
  "Сер",
  "Вер",
  "Жов",
  "Лис",
  "Груд",
];

const days = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];
const shortenDays = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

let calendarMarkup = "";

const renderCalendar = () => {
  calendarMarkup = "";

  let firstDayOfMonth = new Date(curYear, curMonth, 1).getDay();
  let lastDateOfMonth = new Date(curYear, curMonth + 1, 0).getDate();

  for (let i = firstDayOfMonth - 1; i > 0; i -= 1) {
    calendarMarkup += `<li class="calendar__item"></li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i += 1) {
    const isCurrent =
      i === date.getDate() &&
      curMonth === date.getMonth() &&
      curYear === date.getFullYear();

    const isPast =
      i < todayDate.getDate() &&
      curMonth === todayDate.getMonth() &&
      curYear === todayDate.getFullYear();

    calendarMarkup += `<li class="calendar__item"><button value=${i} class="calendar__item-btn ${
      isCurrent ? "current" : ""
    } ${isPast ? "disabled" : ""}" ${
      isPast ? "disabled" : ""
    }>${i}</button></li>`;
  }

  currentDate.innerText = `${months[curMonth]} ${curYear}`;

  chosenYearEl.innerText = `${curYear} рік`;

  chosenDayEl.innerText = `${shortenDays[date.getDay()]}, ${
    shortenMonths[curMonth]
  } ${curDay}`;

  chosenDateEl.innerText = `${days[date.getDay()]}, ${curDay} ${
    monthsCase[curMonth]
  } ${curYear} року`;

  monthWrap.innerHTML = calendarMarkup;
};

const onNavBtnClick = (e) => {
  calendarMarkup = "";

  curMonth += e.currentTarget.classList.contains("prev") ? -1 : 1;

  if (curMonth < 0 || curMonth > 11) {
    date = new Date(curYear, curMonth);

    updateDate(date);
  }

  if (curMonth <= todayDate.getMonth() && curYear === todayDate.getFullYear()) {
    navBtns[0].classList.add("hidden");
  } else {
    navBtns[0].classList.remove("hidden");
  }

  renderCalendar();
};

const onCalendarClick = (e) => {
  if (e.target.nodeName !== "BUTTON") return;

  newDate = e.target.value;
  date = new Date(curYear, curMonth, newDate);
  updateDate(date);

  renderCalendar();
};

navBtns.forEach((btn) => btn.addEventListener("click", onNavBtnClick));
monthWrap.addEventListener("click", onCalendarClick);

renderCalendar();
