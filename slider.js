let list = document.querySelector(".slider__list");
let controls = document.querySelector(".arrows");
let currentIndex = 0;

const slider = (event) => {
  let target = event.target;

  if (target.classList.contains('arrows__btn')) {
    let targetValue = target.dataset.vector;

    if (targetValue === "next") {
      if (currentIndex < list.children.length - 1) {
        currentIndex += 1;
        doTransition(currentIndex);
      } else return;
    }

    if (targetValue === "prev") {
      if (currentIndex > 0) {
        currentIndex -= 1;
        doTransition(currentIndex);
      } else return;
    }
  }
};

function doTransition(index) {
  list.style.transform = `translateX(-${index * 100}%)`;
}

controls.addEventListener("click", slider);