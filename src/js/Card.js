
class Card {

    constructor() {
        this.likeCounter = document.querySelector('.place-card__like-counter');
        this.valueLikeCounter = [];
        this.api = api;
    }
    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked')
        }
    }

    remove(event, cardList) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            cardList.removeChild(event.target.parentElement.parentElement);
            event.stopPropagation();
        }
    }

    create(data) {
        const template = `<div class="place-card"> 
                            <div class="place-card__image" style="background-image: url(${data.link})"> 
                                <button class="place-card__delete-icon"></button>
                            </div>
                            <div class="place-card__description">
                                <h3 class="place-card__name">${data.name}</h3>
                                <div class="like-container">
                                    <button class="place-card__like-icon"></button>
                                </div>
                                
                            </div>
                        </div>`
        return template;
    }
}