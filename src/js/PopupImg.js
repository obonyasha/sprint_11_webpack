class PopupImg {
    popupImg = null;
    nameLinkImg = null;
    constructor(element, linkNameValue) {
        this.popupImg = element;
        this.nameLinkImg = linkNameValue;
        document.addEventListener('click', this.openImg.bind(this));
        const closeElemImg = document.querySelector('.popup__image_close');
        if (closeElemImg) {
            closeElemImg.addEventListener('click', this.closeImg.bind(this));
        }

    }
    openImg(event) {
        if (event.target.classList.contains('place-card__image')) {
            const imgBig = document.querySelector('.popup__image_open');
            const urlImage = event.target.style.backgroundImage;
            imgBig.src = urlImage.slice(5, -2);
            this.popupImg.classList.add('popup__image_is-opened');
        }
    }
    closeImg() {
        this.popupImg.classList.remove('popup__image_is-opened');
    }
}