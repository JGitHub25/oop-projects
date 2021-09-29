function getElementSafely(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`No element matches the selector provided ${selector}`);
  } else {
    return element;
  }
}

class Counter {
  constructor(HTMLelement, startValue) {
    this.HTMLelement = HTMLelement;
    this.startValue = startValue;
    this.value = this.HTMLelement.querySelector(".value");
    this.value.textContent = this.startValue;
    this.decreaseBtn = this.HTMLelement.querySelector(".decrease");
    this.resetBtn = this.HTMLelement.querySelector(".reset");
    this.increaseBtn = this.HTMLelement.querySelector(".increase");

    this.decreaseBtn.addEventListener("click", this.decrease.bind(this));
    this.resetBtn.addEventListener("click", this.reset.bind(this));
    this.increaseBtn.addEventListener("click", this.increase.bind(this));
  }

  decrease() {
    this.value.textContent--;
  }

  reset() {
    this.value.textContent = this.startValue;
  }

  increase() {
    this.value.textContent++;
  }
}

const firstCounter = new Counter(getElementSafely(".first-counter"), 100);
const secondCounter = new Counter(getElementSafely(".second-counter"), 200);
