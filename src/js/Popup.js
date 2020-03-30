export default class Popup {
    constructor(element, nameClassCloseElement, nameClassOpenElem, showPopupClassName, userProfile, userFormValidator, cardFormValidator) {

        this.showPopupClassName = showPopupClassName;
        this.popupElement = element;
        this.userProfile = userProfile;
        this.userFormValidator = userFormValidator;
        this.cardFormValidator = cardFormValidator;
        const closeElem = document.querySelector(nameClassCloseElement);
        const openElem = document.querySelector(nameClassOpenElem);
        if (openElem) {
            openElem.addEventListener('click', this.open.bind(this));
        }
        if (closeElem) {
            closeElem.addEventListener('click', this.close.bind(this));
        }
    }

    open() {
        this.popupElement.classList.add(this.showPopupClassName);
        if (this.userProfile) {
            this.userProfile.setUserInfo();
        }
        if (this.userFormValidator) {
            this.userFormValidator.checkFormInputs();
        }
    }

    close() {
        this.popupElement.classList.remove(this.showPopupClassName);
    }
} 