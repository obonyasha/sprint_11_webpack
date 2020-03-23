class FormValidator {

    constructor(element, btnSaveForm) {
        this.validatedForm = element;
        this.btnSaveForm = btnSaveForm;
        this.setEventListeners();
    }

    checkInputValidity(elem) {
        const errorElement = document.querySelector(`#error-${elem.id}`);

        if (elem.validity.valueMissing) {
            errorElement.textContent = "Это обязательное поле";
            this.activateError(elem);
            return false;
        }
        if (elem.validity.tooShort || elem.validity.tooLong) {
            errorElement.textContent = "Должно быть от 2 до 30 символов";
            this.activateError(elem);
            return false;
        }
        this.resetError(errorElement);

        return true;
    }

    setSubmitButtonState(isValidForm) {
        if (isValidForm) {
            this.btnSaveForm.removeAttribute('disabled');
        } else (
            this.btnSaveForm.setAttribute('disabled', true)
        );
    }

    setEventListeners() {
        this.validatedForm.addEventListener('submit', this.checkFormInputs.bind(this));
        this.inputs = Array.from(this.validatedForm.elements).filter(elem => elem.id !== this.btnSaveForm.id);
        this.inputs.forEach((elem) => {
            elem.addEventListener('input', this.checkFormInputs.bind(this));
        });
    }

    checkFormInputs() {
        let isValidForm = true;
        this.inputs = Array.from(this.validatedForm.elements).filter(elem => elem.id !== this.btnSaveForm.id);
        this.inputs.forEach((elem) => {
            if (!this.checkInputValidity(elem))
                isValidForm = false;
        });
        this.setSubmitButtonState(isValidForm);
        return isValidForm;
    }

    activateError(element) {
        element.parentNode.classList.add('input-container__invalid');
    }
    resetError(element) {
        element.parentNode.classList.remove('input-container__invalid');
        element.textContent = '';
    }
}