class Popup {

    popupElement = null;
    showPopupClassName = null;
    userProfile = null;
    userFormValidator = null;
    cardFormValidator = null;

    /*  Можно лучше: В качестве параметров передавайте не переменные, а объект
    *  если вы в ходе развития проекта захотите добавить переменных, то вам придётся менять код во многих местах 
    *  https: //refactoring.guru/ru/smells/long-parameter-list 
    * Как пример:  
     const myObject = {name:"test", url : "http//:ya.ru"}
     function myFunction(param)
     {
         param.name;
         param.url;
     }
     myFunction(myObject)
    */
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