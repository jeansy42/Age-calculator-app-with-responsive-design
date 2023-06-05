"use strict";
let fillField = true,
  okday = true,
  okmonth = true,
  okyear = true;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDay() + 1;
const dayInput = document.getElementById("idday");
const monthInput = document.getElementById("idmonth");
const yearInput = document.getElementById("idyear");
const spday = document.querySelector(".spday");
const spmonth = document.querySelector(".spmonth");
const spyear = document.querySelector(".spyear");
const allSpan = document.querySelectorAll("span");
const lyear = document.querySelector(".lyear");
const lmonth = document.querySelector(".lmonth");
const lday = document.querySelector(".lday");
const lsday = document.querySelector(".lsday");
const lsmonth = document.querySelector(".lsmonth");
const lsyear = document.querySelector(".lsyear");
const subbtn = document.querySelector(".svg-button");
const btnContainer = document.querySelector(".btn-container");
const allinput = document.querySelectorAll("[type=number]");
const allLabHid = document.querySelectorAll(".hidden");
const allLabShow = document.querySelectorAll(".show");
const observer = new MutationObserver((mutationList, observer) => {
  for (const m of mutationList) {
    if (m.type === "childList") {
      for (const b of allSpan) {
        if (b.textContent !== "--") {
          b.style.animation = "none";
          void b.offsetWidth;
          b.style.animation = "show 2s forwards";
        }
      }
    }
  }
});
const options = { childList: true };
for (const span of allSpan) {
  observer.observe(span, options);
}
const giveAge = (day, month, year) => {
  let resttime;
  const currentDate = new Date();
  const birthDate = new Date(`${year}-${month}-${day}`);
  const lifeTime = currentDate - birthDate;
  const mlsYear = 1000 * 60 * 60 * 24 * 365.25;
  const mlsMounth = mlsYear / 12;
  const mlsDay = 1000 * 60 * 60 * 24;
  const yearsLived = Math.floor(lifeTime / mlsYear);
  resttime = lifeTime % mlsYear;
  const monthLived = Math.floor(resttime / mlsMounth);
  resttime %= mlsMounth;
  const daysLived = Math.floor(resttime / mlsDay);
  return [daysLived, monthLived, yearsLived];
};
const showAge = () => {
  const result = giveAge(dayInput.value, monthInput.value, yearInput.value);
  spday.textContent = result[0];
  spmonth.textContent = result[1];
  spyear.textContent = result[2];
  for (let input of allinput) input.value = "";
};
const verifyFill = () => {
  for (let i = 0; i < allinput.length; i++) {
    if (allinput[i].value === "") {
      fillField = false;
    }
  }
  return fillField;
};
const verifyYear = () => {
  if (
    parseInt(yearInput.value) > currentYear ||
    parseInt(yearInput.value) < 1000
  )
    okyear = false;
  return okyear;
};
const verifyMonth = () => {
  if (
    (parseInt(yearInput.value) == currentYear &&
      currentMonth < parseInt(monthInput.value)) ||
    parseInt(monthInput.value) < 1 ||
    parseInt(monthInput.value) > 12
  )
    okmonth = false;
  return okmonth;
};
const verifyDay = () => {
  if (
    parseInt(yearInput.value) == currentYear &&
    currentMonth == parseInt(monthInput.value) &&
    currentDay < parseInt(dayInput.value)
  )
    okday = false;
  else if (
    ((parseInt(monthInput.value) === 4 ||
      parseInt(monthInput.value) === 6 ||
      parseInt(monthInput.value) === 9 ||
      parseInt(monthInput.value) === 11) &&
      parseInt(dayInput.value) > 30) ||
    parseInt(dayInput.value) > 31 ||
    parseInt(dayInput.value) < 1
  )
    okday = false;
  else if (parseInt(monthInput.value) === 2) {
    if (
      !(
        (parseInt(yearInput.value) % 4 === 0 &&
          parseInt(yearInput.value) % 100 !== 0) ||
        parseInt(yearInput.value) % 400 === 0
      ) &&
      parseInt(dayInput.value) > 28
    )
      okday = false;
    else if (parseInt(dayInput.value) > 29) okday = false;
  }
  return okday;
};
const exeVerify = () => {
  for (const c of allSpan) c.textContent = "--";

  if (!verifyFill()) {
    for (let i = 0; i < allinput.length; i++) {
      if (allinput[i].value === "") {
        allLabHid[i].textContent = "This field is required";
        allLabShow[i].classList.add("red");
      }
    }
  }
  if (!verifyYear()) {
    parseInt(yearInput.value) < 1000
      ? (lyear.textContent = "Must be a valid year")
      : (lyear.textContent = "Must be in the past");

    lsyear.classList.add("red");
  }
  if (!verifyMonth()) {
    lmonth.textContent = "Must be a valid month";
    lsmonth.classList.add("red");
  }
  if (!verifyDay()) {
    lday.textContent = "Must be a valid day   ";
    lsday.classList.add("red");
  }
};

subbtn.addEventListener("click", (e) => {
  e.preventDefault();
  for (let l of allLabHid) {
    l.textContent = "";
  }
  for (const s of allLabShow) {
    if (s.classList.contains("red")) s.classList.remove("red");
  }
  verifyFill() && verifyYear() && verifyMonth() && verifyDay()
    ? showAge()
    : exeVerify();
  fillField = true;
  okyear = true;
  okmonth = true;
  okday = true;
});
btnContainer.addEventListener("click", () => {
  subbtn.click();
});
for (const i of allinput) {
  const arrayinput = Array.from(allinput);
  let index = arrayinput.indexOf(i);
  if (index != 2) {
    i.addEventListener("input", () => {
      if (i.value.length > 2) i.value = i.value.slice(0, 2);
    });
  } else {
    i.addEventListener("input", () => {
      if (i.value.length > 4) i.value = i.value.slice(0, 4);
    });
  }
}
