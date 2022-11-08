const svgs = document.querySelectorAll('svg')

svgs.forEach(svg => {
  svg.addEventListener("mouseover", () => {
    svg.firstChild.setAttribute('fill', "#fb6087")
  })

  svg.addEventListener("mouseleave", () => {
    svg.firstChild.setAttribute('fill', "#8385A9")
  })
})


const flipCard = document.querySelector(".flip-card");
flip(flipCard);

const countToDate = new Date("2022-11-22");
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date();
  let timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

  flipAllCards(timeBetweenDates);

  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 86400);

  flip(document.querySelector("[data-type-days]"), days);
  flip(document.querySelector("[data-type-hours]"), hours);
  flip(document.querySelector("[data-type-minutes]"), minutes);
  flip(document.querySelector("[data-type-seconds]"), seconds);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");
  if (String(startNumber).length === 1) {
    topHalf.textContent = `0${startNumber}`;
    bottomHalf.textContent = `0${startNumber}`;
  } else {
    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
  }
  if (String(newNumber).length === 1) {
    topHalf.textContent = `0${newNumber}`;
    bottomHalf.textContent = `0${newNumber}`;
  } else {
    topFlip.textContent = newNumber;
    bottomFlip.textContent = newNumber;
  }

  topFlip.addEventListener("animationstart", (e) => {
    if (String(newNumber).length === 1) {
      topHalf.textContent = `0${newNumber}`;
    } else {
      topHalf.textContent = newNumber;
    }
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationstart", (e) => {
    if (String(newNumber).length === 1) {
        bottomHalf.textContent = `0${newNumber}`;
      } else {
        bottomHalf.textContent = newNumber;
      }
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}
