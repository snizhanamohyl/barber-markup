// import { availableTimeData } from "./available-time-data";

const currentDate = document.querySelector(".current-date");
const monthWrap = document.querySelector(".calendar__month");
const navBtns = document.querySelectorAll(".calendar__nav");
const chosenYearEl = document.querySelector(".calendar__header-year");
const chosenDayEl = document.querySelector(".calendar__header-day");
const chosenDateEl = document.querySelector(".modal__chosen-date");

let date = new Date(),
  curYear,
  curMonth,
  curDay,
  curTime;

const updateDate = (date) => {
  curYear = date.getFullYear();
  curMonth = date.getMonth();
  curDay = date.getDate();
};

const todayDate = new Date();
const todayHour = todayDate.getHours();
const todayMinute = todayDate.getMinutes();

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

const updateChosenDateText = () => {
  chosenDateEl.innerText = `${days[date.getDay()]}, ${curDay} ${
    monthsCase[curMonth]
  } ${curYear} року${curTime ? `, ${curTime}` : ""}`;
};
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

  updateChosenDateText();

  monthWrap.innerHTML = calendarMarkup;
};

const onNavBtnClick = (e) => {
  calendarMarkup = "";

  curMonth += e.currentTarget.classList.contains("prev") ? -1 : 1;

  if (curMonth < 0 || curMonth > 11) {
    date = new Date(curYear, curMonth);

    updateDate(date);
    renderTimeList();
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
  renderTimeList();

  renderCalendar();
};

navBtns.forEach((btn) => btn.addEventListener("click", onNavBtnClick));
monthWrap.addEventListener("click", onCalendarClick);

renderCalendar();

// ----------------------------------------------

const nowDate = new Date();

const nowDateYear = nowDate.getFullYear();
const nowDateMonth = nowDate.getMonth();
const nowDateDay = nowDate.getDate();

const keysArray = [];

const tightness = 0.6;

for (let i = 0; i < 90; i += 1) {
  const dateStr = new Date(
    nowDateYear,
    nowDateMonth,
    nowDateDay + i
  ).toLocaleDateString("en-US");

  keysArray.push(dateStr);
}

const basicPossibleTimeList = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const availableTimeData = {};

const daysWithSameTightness = 4;

const oneDayAvailableWindows = (tightness) => {
  return basicPossibleTimeList.filter(() => Math.random() <= tightness);
};

const generateAvailableTimeData = () => {
  let counter = 0;

  for (
    let i = tightness;
    i >= 0;
    i -= tightness / (90 / daysWithSameTightness)
  ) {
    const splicedArr = [...keysArray].splice(
      counter * daysWithSameTightness,
      daysWithSameTightness
    );

    for (let j = 0; j < daysWithSameTightness; j += 1) {
      splicedArr.map(
        (key) => (availableTimeData[key] = oneDayAvailableWindows(i))
      );
    }
    counter += 1;
  }
};

generateAvailableTimeData();

// ----------------------------------------------

const timeListEl = document.querySelector(".time__list");
const timeNavBtnsEl = document.querySelectorAll(".time__nav-btn");

const isSmallScreen = window.innerWidth < 1280;

const renderTimeList = (data = basicPossibleTimeList) => {
  const availableWindows = availableTimeData[date.toLocaleDateString("en-US")];

  const isToday =
    curDay === todayDate.getDate() &&
    curMonth === todayDate.getMonth() &&
    curYear === todayDate.getFullYear();

  const dataToRender = isSmallScreen ? [...data].splice(0, 12) : data;

  const timeListMarkup = dataToRender.reduce((acc, time) => {
    const isNotAvailable = availableWindows.find(
      (availableTime) => time === availableTime
    );

    if (isToday) {
      const nowTime = todayHour + todayMinute / 60;

      const [hours, minutes] = time
        .split(":")
        .map((timeText) => Number(timeText));
      const possibleTime = hours + minutes / 60;

      return (acc += `<li class="time__item"><button class="time__btn" data-time="${time}" ${
        possibleTime < nowTime || isNotAvailable ? "disabled" : ""
      }>${time}</button></li>`);
    } else {
      console.log("not today");
      return (acc += `<li class="time__item"><button class="time__btn" data-time="${time}" ${
        isNotAvailable ? "disabled" : ""
      }>${time}</button></li>`);
    }
  }, "");

  timeListEl.innerHTML = timeListMarkup;
};

const onTimeNavClick = (e) => {
  e.currentTarget.setAttribute("disabled", true);
  let timeToRender;

  if (e.currentTarget.classList.contains("next")) {
    timeToRender = [...basicPossibleTimeList].splice(12);
    timeNavBtnsEl[0].removeAttribute("disabled");
  } else {
    timeToRender = [...basicPossibleTimeList].splice(0, 12);
    timeNavBtnsEl[1].removeAttribute("disabled");
  }

  renderTimeList(timeToRender);
};

const showHideTimeNav = () => {
  timeNavBtnsEl[0].closest(".time__nav").style.display = isSmallScreen
    ? "flex"
    : "none";
};

timeNavBtnsEl.forEach((btn) => btn.addEventListener("click", onTimeNavClick));

// const renderTimeList = () => {
//   let timeListMarkup = "";

//   const availableWindows = availableTimeData[date.toLocaleDateString("en-US")];

//   const isToday =
//     curDay === todayDate.getDate() &&
//     curMonth === todayDate.getMonth() &&
//     curYear === todayDate.getFullYear();

//   const startTime = isSmallScreen ? 10 : 10;
//   const endTime = isSmallScreen ? 10 + (21 - 10) / 2 : 21;

//   for (i = startTime; i <= endTime; i += 0.5) {
//     const timeText = Number.isInteger(i) ? `${i}:00` : `${Math.floor(i)}:30`;
//     const isNotAvailable = availableWindows.find((time) => time === timeText);

//     if (isToday) {
//       const nowTime = todayHour + todayMinute / 60;

//       timeListMarkup += `<li class="time__item"><button class="time__btn" data-time="${timeText}" ${
//         i < nowTime || isNotAvailable ? "disabled" : ""
//       }>${timeText}</button></li>`;
//     } else {
//       timeListMarkup += `<li class="time__item"><button class="time__btn" data-time="${timeText}" ${
//         isNotAvailable ? "disabled" : ""
//       }>${timeText}</button></li>`;
//     }
//   }

//   timeListEl.innerHTML = timeListMarkup;
// };

const finishBtn = backdrop.querySelector(".modal-finish");

const updateDateWithTime = () => {
  date = new Date([curYear, curMonth + 1, curDay, curTime]);
};

const onTimePick = (e) => {
  if (e.target.nodeName !== "BUTTON") return;

  curTime = e.target.dataset.time;
  updateDateWithTime();

  const oldActiveTime = timeListEl.querySelector(".active");

  oldActiveTime?.classList.remove("active");
  e.target.classList.add("active");
  finishBtn.removeAttribute("disabled");

  updateChosenDateText();
};

const dateInput = document.querySelector(".booking__date");

const onFinish = () => {
  const chosenDate = `${date.toLocaleDateString("en-US")}, ${curTime}`;

  dateInput.value = chosenDate;
  dateInput.innerText = chosenDate;
  dateInput.closest(".booking__input-wrap").classList.add("changed");
};

timeListEl.addEventListener("click", onTimePick);
finishBtn.addEventListener("click", onFinish);

showHideTimeNav();
renderTimeList();
