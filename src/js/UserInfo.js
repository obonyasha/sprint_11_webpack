class UserInfo {

  constructor(api) {
    this.userForm = document.forms.profile;
    this.userName = document.querySelector('.user-info__name');
    this.userJob = document.querySelector('.user-info__job');
    this.userAvatar = document.querySelector('.user-info__photo');
    this.nameUser = this.userForm.elements.nameUser;
    this.profile = this.userForm.elements.profile;
    this.api = api;
    // тут определите пустые переменные для хранения данных об аватаре, имени, работе
    this.useName = '';
    this.useJob = '';
    this.useAvatar = '';
  }

  apiGetUserInfo() {
    return this.api.getUserInfo()
      .then(res => {
        if (res) {
          this.uppdateLocalData(res);
        }
        return res;
      });
  }

  setUserInfo() {
    this.nameUser.value = this.useName;
    this.profile.value = this.useJob;
  }

  getUserInfoFromServer() {
    this.userName.textContent = this.useName;
    this.userJob.textContent = this.useJob;
    this.userAvatar.style.backgroundImage = `url(${this.useAvatar})`;
  };




  updateUserInfo() {
    // Метод updateUserInfo должен сообщать в точку своего вызова результат выполнения,
    // все ли хорошо. Можно вернуть результат выполнения метода api.sendUserInfo и продолжить
    // цепочку промисов

    // Перед api нужно this, иначе вы к глобальному объекту обращаетесь

    return this.api.sendUserInfo(this.nameUser.value, this.profile.value)
      .then(res => {
        if (res) {
          this.uppdateLocalData(res);
          this.getUserInfoFromServer();
        }
        return res;
      });
  }

  uppdateLocalData(res) {
    this.useName = res.name;
    this.useJob = res.about;
    this.useAvatar = res.avatar;
  }
}

