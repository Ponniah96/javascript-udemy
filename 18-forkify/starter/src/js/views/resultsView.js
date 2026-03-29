import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _message = '';
  // render(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
