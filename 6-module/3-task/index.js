import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    //Создаем разметку слайдов
    let carouselSlides = slides.map(element => {return createElement(`
    <div class="carousel__slide" data-id="${element.id}">
      <img src="/assets/images/carousel/${element.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${(+element.price).toFixed(2)}</span>
        <div class="carousel__title">${element.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`).outerHTML});
    
    //Создаем разметку карусели
    this._carousel = createElement(`
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <!--Слайды-->
      <div class="carousel__inner">
        ${carouselSlides.join('')}
      </div>
    </div>`);
    
    //Инициализируем необходимые переменные
    let carousel = this._carousel;
    this.carouselSlidesCount = slides.length - 1; //количество слайдов
    this.carouselCurOffset = 0; //текущее смещение
    this.carouselCurSlide = 0; //текущий слайд

    //Навешиваем события
    carousel.addEventListener('click',event => {
      if(event.target.classList.contains('carousel__arrow_right')){
        this.changeOffset('right');
        return;
      }
      if(event.target.classList.contains('carousel__arrow_left')){
        this.changeOffset('left');
        return;
      }
      if(event.target.classList.contains('carousel__button')){
        let addEvent = new CustomEvent('product-add',{detail: event.target.closest('.carousel__slide').dataset.id,bubbles: true});
        event.currentTarget.dispatchEvent(addEvent);
      }
    });

    this.checkOffset();

  }

  get elem(){
    return this._carousel;
  }

  //Скрываем, либо показываем переключатели
  checkOffset(){

    this._carousel.querySelector('.carousel__arrow_left').style.display = (this.carouselCurSlide == 0) ? 'none' : '';
    this._carousel.querySelector('.carousel__arrow_right').style.display = (this.carouselCurSlide == this.carouselSlidesCount) ? 'none' : '';

  }

  //Меняем текущее смещение и индекс слайда
  changeOffset(side){
    
    switch (side){
      case 'right':
        this.carouselCurOffset -= this._carousel.offsetWidth;
        this.carouselCurSlide++;
        break;
      case 'left':
        this.carouselCurOffset += this._carousel.offsetWidth;
        this.carouselCurSlide--;
        break;   
    }

    this._carousel.querySelector('.carousel__inner').style.transform = `translateX(${this.carouselCurOffset}px)`;
    this.checkOffset();

  }
}
