export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar =  document.querySelector(avatarSelector);
  }

  getInfo() {
    return {name: this._name.textContent,
            about: this._job.textContent,
            avatar: this._avatar.src};
  }

  getTextFields() {
    return {name: this._name.textContent,
      about: this._job.textContent};
  }

  getAvatar() {
    return {avatar: this._avatar.src};
  }

  setInfo({ name, about, avatar, _id }) {
    this._id = _id;
    this.setTextFields({ name, about });
    this.setAvatar({ avatar });
  }

  getUserId() {
    return this._id;
  }

  setTextFields({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
