export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Данные не получены. Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
        throw err;
      });

  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Данные не получены. Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
        throw err;
      });
  }

  sendUserInfo(userName, profile, avatar) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: profile,
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Данные не получены. Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
        throw err;
      });
  }

  sendCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка загрузки, карточка не добавлена. Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
        throw err;
      });
  }

  likeCard(likes, cardId){
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        likes: likes
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка отправки данных. Лайк не добавлен. Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
        throw err;
      });
  }
}