export default class Api {
  constructor({ cohort, token }) {
    this._root = `https://mesto.nomoreparties.co/v1/${cohort}/`;
    this._headersGet = { authorization: token };
    this._headersWithBody = {authorization: token,
                            'Content-Type': 'application/json'};
  }

  test() {
    fetch(this._root + 'users/me',
      {headers: this._headersGet})
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(res.status);
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  getMe() {
    return fetch(this._root + 'users/me',
      {headers: this._headersGet});
  }

  deleteCard(cardId) {
    return fetch(this._root + `cards/${cardId}`, {method: 'DELETE',
      headers: this._headersGet});
  }

  likeCard(cardId, isLiked) {
    if (isLiked) return fetch(this._root + `cards/likes/${cardId}`, {method: 'PUT',
      headers: this._headersGet});
    else return fetch(this._root + `cards/likes/${cardId}`, {method: 'DELETE',
      headers: this._headersGet});
  }

  getCards() {
    return fetch(this._root + 'cards',
      {headers: this._headersGet});
  }
}
