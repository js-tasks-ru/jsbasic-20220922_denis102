import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    //this.categories = categories;

    //Формируем верстку меню
    this.elem = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
          ${categories.map(element => {return `<a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>`}).join('')}
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrRight =  this.elem.querySelector('.ribbon__arrow_right');

    //Навешиваем события
    this.arrLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350,0);
    });

    this.arrRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350,0);
    });

    this.ribbonInner.addEventListener('scroll', () => {

      let scrLeft = this.ribbonInner.scrollLeft;
      let scrRight = this.ribbonInner.scrollWidth - this.ribbonInner.clientWidth - scrLeft;
      
      if(scrLeft == 0){
        this.arrLeft.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrLeft.classList.add('ribbon__arrow_visible');
      }
      
      if(scrRight < 1){
        this.arrRight.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrRight.classList.add('ribbon__arrow_visible');
      }

    });

    this.elem.addEventListener('click',event => {

      if(event.target.classList.contains('ribbon__item')){
        event.preventDefault();
        let curActive = this.ribbonInner.querySelector('.ribbon__item_active');
        if(curActive){
          curActive.classList.remove('ribbon__item_active');
        }
        event.target.classList.add('ribbon__item_active');
        event.currentTarget.dispatchEvent(new CustomEvent('ribbon-select', {detail: event.target.dataset.id, bubbles: true}));
      }
      
    });

    
  }
}
