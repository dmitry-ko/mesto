export default class Api {
  constructor({ baseUrl, headers }) {
    this._root = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    this._headers = headers;
  }

  getMe() {
    return fetch(this._root + 'users/me',
      {headers: this._headers})
      .then(this._checkResponse);
  }

  addCard({name, link}) {
    return fetch(this._root + 'cards ', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._root + `cards/${cardId}`, {method: 'DELETE',
      headers: this._headers})
      .then(this._checkResponse);
  }

  updateProfile(profileData) {
    return fetch(this._root + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(profileData)
    })
      .then(this._checkResponse);
  }

  likeCard(cardId, isLiked) {
    if (isLiked) return fetch(this._root + `cards/likes/${cardId}`, {method: 'PUT',
      headers: this._headers})
      .then(this._checkResponse);
    else return fetch(this._root + `cards/likes/${cardId}`, {method: 'DELETE',
      headers: this._headers})
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(this._root + 'cards',
      {headers: this._headers})
      .then(this._checkResponse);
  }

  updateAvatar({avatar}) {
    return fetch(this._root + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
