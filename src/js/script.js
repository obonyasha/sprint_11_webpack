
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort8',
  headers: {
    authorization: '967f131c-a33f-4b54-adda-a72b03d43d19',
    'Content-Type': 'application/json'
  }
});

//создание карточки
const card = new Card(api)

//добавление карточки
const cardForm = document.forms.new;
const placesList = document.querySelector('.places-list');
const cardList = new CardList(placesList, card, api);
cardList.render();

//редактирование профиля
const userForm = document.forms.profile;
const userProfile = new UserInfo(api);

//валидация формы редактирования профайла
const btnSaveProfile = document.querySelector('.popup-user__button-profile');
const userFormValidator = new FormValidator(userForm, btnSaveProfile);

//валидация формы добавления карточки
const btnAddCard = document.querySelector('.popup__button');
const cardFormValidator = new FormValidator(cardForm, btnAddCard);

// открытие/закрытие попапа добавления карточки
const popupAddCard = document.querySelector('.popup');

// Тут очень просится объект на передачу в метод, кроме того, лучше такие длинные спагетти переносить на новую строчку каждый параметр

const popupAddCardWorker = new Popup(popupAddCard, '.popup__close', '.user-info__button', 'popup_is-opened', null, null, cardFormValidator);

// открытие/закрытие попапа редактирования профиля
const popupEditProfile = document.querySelector('.popup-user');
const popupEditProfileWorker = new Popup(popupEditProfile, '.popup-user__close', '.user-info__edit', 'popup-user_is-opened', userProfile, userFormValidator, null);

// открытие/закрытие попапа с картинкой
const popupOpenImg = document.querySelector('.popup__image');
const popupOpenImgWorker = new PopupImg(popupOpenImg, null);

//слушатель редактирования профиля
userForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // Вот здесь у вас проблема, вы вызываете метод, который вызывает асинхронный метод, поэтому пока
  // опреация выполняется, вы мало того что не знаете чем она закончилась, так у вас дальше ведь скрипт выполняется
  // поэтому окно попапа закрывается чем бы там все при обновлении данных не закончилось.
  userProfile.updateUserInfo().then(res => {
    if (res) {
      popupEditProfileWorker.close()
    }
  });  // запросили сервер, и он когда-то ответит

  // программа идет дальше и закрывает окно
  // тут нужно или банальные true/false из userProfile.updateUserInfo получить или цепочку промисов продолжить.
});

//слушатель формы добавления карточки
cardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  cardList.sendCardToServer(cardForm.elements.name.value, cardForm.elements.link.value)
    .then(res => {
      if (res) {
        popupAddCardWorker.close();
      }
    });
  cardForm.reset();
});

//лайк и удаление карточек
cardList.setListeres();

//Загрузка информации о пользователе с сервера

// За информацию о пользователе отвечает UserInfo, загружать данные надо внутри класса, а здесь поставить вызов метода этого
// класса, который все загрузит с сервера, сохранит данные внутри класса, присвоит значения инпутам и элементам странцы.
userProfile.apiGetUserInfo()
  .then(res => {
    if (res) {
      userProfile.getUserInfoFromServer(res);
    }
  });