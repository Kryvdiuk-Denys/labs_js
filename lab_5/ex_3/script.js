const digitSegments = {
  0: [1, 2, 3, 4, 5, 7],
  1: [2, 5],
  2: [3, 2, 6, 4, 7],
  3: [3, 2, 6, 5, 7],
  4: [1, 6, 2, 5],
  5: [3, 1, 6, 5, 7],
  6: [3, 1, 6, 4, 5, 7],
  7: [3, 2, 5],
  8: [1, 2, 3, 4, 5, 6, 7],
  9: [1, 2, 3, 5, 6, 7]
};

const numbers = [
  document.querySelector('.daysFirst'),
  document.querySelector('.daysSecond'),
  document.querySelector('.firstNumber'),
  document.querySelector('.secondNumber'),
  document.querySelector('.thirdNumber'),
  document.querySelector('.fourthNumber'),
  document.querySelector('.fifthNumber'),
  document.querySelector('.sixthNumber')
];

const secondsIndicators = document.querySelectorAll('.seconds-indicator');
const targetInput = document.getElementById('targetDateTime');
const startBtn = document.getElementById('startCountdown');
const stopBtn = document.getElementById('stopCountdown');
const resetBtn = document.getElementById('resetClock');
const statusText = document.getElementById('countdownStatus');
const birthdayInput = document.getElementById('birthdayDate');
const birthdayButton = document.getElementById('startBirthdayCountdown');
const birthdayStatus = document.getElementById('birthdayStatus');

const monthYearInput = document.getElementById('monthYearInput');
const showCalendarButton = document.getElementById('showCalendar');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const calendarView = document.getElementById('calendarView');

let calendarDate = new Date();

let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let countdownTarget = null;
let isCountdown = false;
let birthdayInterval = null;

function displayDigit(digitElement, digit) {
  const segments = digitSegments[digit] || [];

  for (let i = 1; i <= 7; i++) {
    const line = digitElement.querySelector(`.line-${i}`);
    if (!line) continue;
    line.classList.toggle('active', segments.includes(i));
  }
}

function displayTime() {
  const dd = String(days).padStart(2, '0');
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  const timeDigits = [
    parseInt(dd[0], 10),
    parseInt(dd[1], 10),
    parseInt(hh[0], 10),
    parseInt(hh[1], 10),
    parseInt(mm[0], 10),
    parseInt(mm[1], 10),
    parseInt(ss[0], 10),
    parseInt(ss[1], 10)
  ];

  timeDigits.forEach((digit, index) => displayDigit(numbers[index], digit));
}

function updateColon() {
  const show = seconds % 2 === 0;
  secondsIndicators.forEach(el => el.classList.toggle('active', show));
}

function setClockFromNow() {
  const now = new Date();
  days = 0;
  hours = now.getHours();
  minutes = now.getMinutes();
  seconds = now.getSeconds();
  displayTime();
  updateColon();
}

function setCountdownRemaining(milliseconds) {
  if (milliseconds <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    displayTime();
    updateColon();
    statusText.textContent = 'Таймер завершено!';
    isCountdown = false;
    countdownTarget = null;
    return;
  }

  let totalSeconds = Math.floor(milliseconds / 1000);
  days = Math.floor(totalSeconds / 86400);
  totalSeconds -= days * 86400;

  hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;

  if (days > 99) days = 99;

  displayTime();
  updateColon();

  statusText.textContent = `Залишилося ${days} дн., ${hours} год., ${minutes} хв., ${seconds} сек.`;
}

function getNextBirthdayFrom(birthDate) {
  const now = new Date();
  const next = new Date(birthDate);
  next.setFullYear(now.getFullYear());

  if (next <= now) {
    next.setFullYear(now.getFullYear() + 1);
  }

  return next;
}

function computeDuration(from, to) {
  if (to <= from) return {months: 0, days: 0, hours:0, minutes:0, seconds:0};

  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  let h = to.getHours() - from.getHours();
  let min = to.getMinutes() - from.getMinutes();
  let s = to.getSeconds() - from.getSeconds();

  if (s < 0) { s += 60; min -= 1; }
  if (min < 0) { min += 60; h -= 1; }
  if (h < 0) { h += 24; d -= 1; }
  if (d < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    d += prevMonth;
    m -= 1;
  }
  if (m < 0) { m += 12; y -= 1; }

  return {months: y * 12 + m, days: d, hours: h, minutes: min, seconds: s};
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  const headers = weekdayNames.map(day => `<div class="cal-cell cal-header">${day}</div>`).join('');

  let cells = '';
  const shift = (firstDay + 6) % 7;
  for (let i = 0; i < shift; i++) {
    cells += '<div class="cal-cell"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    cells += `<div class="cal-cell ${isToday ? 'today' : ''}">${day}</div>`;
  }

  calendarView.innerHTML = `
    <div class="calendar-header">${year} - ${String(month + 1).padStart(2, '0')}</div>
    <div class="calendar-grid">${headers}${cells}</div>
  `;
}

function applyMonthYear() {
  const value = monthYearInput.value;
  if (!value) return;
  const [year, month] = value.split('-').map(Number);
  calendarDate = new Date(year, month - 1, 1);
  renderCalendar(calendarDate);
}

showCalendarButton.addEventListener('click', applyMonthYear);
prevMonthButton.addEventListener('click', () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar(calendarDate);
  monthYearInput.value = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}`;
});
nextMonthButton.addEventListener('click', () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar(calendarDate);
  monthYearInput.value = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}`;
});

function timerLoop() {
  if (isCountdown && countdownTarget) {
    const diff = countdownTarget.getTime() - Date.now();
    setCountdownRemaining(diff);
  } else {
    setClockFromNow();
  }
}

birthdayButton.addEventListener('click', () => {
  if (!birthdayInput.value) {
    birthdayStatus.textContent = 'Вкажіть дату народження.';
    return;
  }

  const birth = new Date(birthdayInput.value);
  if (Number.isNaN(birth.getTime())) {
    birthdayStatus.textContent = 'Неправильний формат дати.';
    return;
  }

  const nextBirthday = getNextBirthdayFrom(birth);

  if (birthdayInterval) clearInterval(birthdayInterval);

  function updateBirthdayCountdown() {
    const now = new Date();
    const diff = nextBirthday.getTime() - now.getTime();

    if (diff <= 0) {
      birthdayStatus.textContent = 'Вітаємо! День народження настав.';
      clearInterval(birthdayInterval);
      birthdayInterval = null;
      return;
    }

    const duration = computeDuration(now, nextBirthday);
    birthdayStatus.textContent = `Через ${duration.months} міс., ${duration.days} дн., ${duration.hours} год., ${duration.minutes} хв., ${duration.seconds} сек.`;
  }

  updateBirthdayCountdown();
  birthdayInterval = setInterval(updateBirthdayCountdown, 1000);
});

startBtn.addEventListener('click', () => {
  if (!targetInput.value) {
    statusText.textContent = 'Виберіть дату і час.';
    return;
  }

  const target = new Date(targetInput.value);
  if (isNaN(target.getTime())) {
    statusText.textContent = 'Неправильний формат дати/часу.';
    return;
  }

  if (target <= new Date()) {
    statusText.textContent = 'Дата має бути у майбутньому.';
    return;
  }

  countdownTarget = target;
  isCountdown = true;
  statusText.textContent = 'Таймер запущено.';
});

stopBtn.addEventListener('click', () => {
  isCountdown = false;
  statusText.textContent = 'Таймер призупинено.';
});

resetBtn.addEventListener('click', () => {
  isCountdown = false;
  countdownTarget = null;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  displayTime();
  updateColon();
  statusText.textContent = 'Скинуто до 00:00:00.';
});


hours = 0;
minutes = 0;
seconds = 0;
displayTime();
updateColon();
statusText.textContent = 'Режим годинника.';

calendarDate = new Date();
monthYearInput.value = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}`;
renderCalendar(calendarDate);

setInterval(timerLoop, 1000);