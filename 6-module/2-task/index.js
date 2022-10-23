import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {

    //Устанавливаем параметры
    this._productId = product.id;
    this._productCard = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${(+product.price).toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    //Навешиваем событие
    this._productCard.addEventListener('click',event => {
      if(event.target.classList.contains('card__button')){
        let eventProductAdd = new CustomEvent('product-add', {detail: this._productId, bubbles: true});
        event.currentTarget.dispatchEvent(eventProductAdd);
      }
    });
  }

  get elem(){
    return this._productCard;
  }
}