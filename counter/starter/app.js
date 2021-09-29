function getElementSafely(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`No element matches the selector provided ${selector}`);
  } else {
    return element;
  }
}

function Counter(HTMLelement, startValue) {
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

Counter.prototype.decrease = function () {
  this.value.textContent--;
  //   console.log(this);
};
Counter.prototype.reset = function () {
  this.value.textContent = this.startValue;
};
Counter.prototype.increase = function () {
  this.value.textContent++;
};

const firstCounter = new Counter(getElementSafely(".first-counter"), 100);
const secondCounter = new Counter(getElementSafely(".second-counter"), 200);
