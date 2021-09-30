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
  this.pictures = [...HTMLelement.querySelectorAll("img")];

  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImgName = getElement(".image-name");
  this.modalImagesContainer = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.prevBtn = getElement(".prev-btn");
  this.nextBtn = getElement(".next-btn");

  this.galleryElement = HTMLelement;
  this.openModalref = this.openModal.bind(this);
  this.galleryElement.addEventListener("click", this.openModalref);

  this.closeModalref = this.closeModal.bind(this);

  this.applyNextBtnref = this.applyNextBtn.bind(this);
  this.applyPrevBtnref = this.applyPrevBtn.bind(this);

  this.selectThumbnailRef = this.selectThumbnail.bind(this);
}

Gallery.prototype.openModal = function (e) {
  this.modal.classList.add("open");
  this.modalImg.src = e.target.src;
  this.modalImgName.textContent = e.target.title;
  this.modalImagesContainer.innerHTML = this.pictures
    .map((imgElement) => {
      return `<img
        src="${imgElement.src}"
        alt="${imgElement.alt}"
        class="${
          imgElement.dataset.id === e.target.dataset.id
            ? "modal-img selected"
            : "modal-img"
        }"
        title="${imgElement.title}"
        data-id="${imgElement.dataset.id}"
      />`;
    })
    .join("");

  //event listeners.
  this.closeBtn.addEventListener("click", this.closeModalref);
  this.nextBtn.addEventListener("click", this.applyNextBtnref);
  this.prevBtn.addEventListener("click", this.applyPrevBtnref);
  this.modalImagesContainer.addEventListener("click", this.selectThumbnailRef);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");

  this.nextBtn.removeEventListener("click", this.applyNextBtnref);
  this.prevBtn.removeEventListener("click", this.applyPrevBtnref);

  this.modalImagesContainer.removeEventListener(
    "click",
    this.selectThumbnailRef
  );
};

Gallery.prototype.applyPrevBtn = function () {
  const currentImg = this.modalImagesContainer.querySelector(".selected");
  const prevImg =
    currentImg.previousElementSibling ||
    this.modalImagesContainer.lastElementChild;
  currentImg.classList.remove("selected");
  prevImg.classList.add("selected");

  this.modalImg.src = prevImg.src;
  this.modalImgName.textContent = prevImg.title;
};

Gallery.prototype.applyNextBtn = function () {
  const currentImg = this.modalImagesContainer.querySelector(".selected");
  const nextImg =
    currentImg.nextElementSibling ||
    this.modalImagesContainer.firstElementChild;
  currentImg.classList.remove("selected");
  nextImg.classList.add("selected");

  this.modalImg.src = nextImg.src;
  this.modalImgName.textContent = nextImg.title;
};

Gallery.prototype.selectThumbnail = function (e) {
  if (e.target.src !== this.modalImg.src) {
    this.modalImg.src = e.target.src;
    this.modalImgName.textContent = e.target.title;
    const currentImg = this.modalImagesContainer.querySelector(".selected");
    currentImg.classList.remove("selected");
    e.target.classList.add("selected");
  }
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
