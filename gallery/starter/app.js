function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(HTMLelement) {
  this.pictures = HTMLelement.querySelectorAll("img");

  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImagesContainer = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.prevBtn = getElement(".prev-btn");
  this.nextBtn = getElement(".next-btn");
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
