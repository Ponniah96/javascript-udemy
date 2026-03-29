import { state } from '../modal';
import View from './View.js';
class PaginationView extends View {
  // Pagination view functionality will be implemented here

  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = state.search.page;
    const totalPages = Math.ceil(
      state.search.results.length / state.search.resultsPerPage,
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && totalPages > 1) {
      return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
        </button>
      `;
    }

    // Page 1, and there are no pages
    if (currentPage === 1 && totalPages === 1) {
      return '';
    }

    // Last page
    if (currentPage === totalPages) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (currentPage < totalPages) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
        </button>
      `;
    }
  }
}

export default new PaginationView();
