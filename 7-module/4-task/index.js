import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    
    this.steps = steps;
    this.segmentNum = value;
    this.leftPercents = Math.round(this.segmentNum / (this.steps - 1) * 100);

    //Создаем слайдер
    this.elem = createElement(`
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
        </div>
      </div>
    `);

    for(let i = 0; i < steps; i++){
      this.elem.querySelector('.slider__steps').appendChild(document.createElement('span'));
    }

    //Задаем начальную позицию
    this.setPosition();

    //Получаем вспомогательные переменные
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    //Добавляем обрабочтик на клик
    this.elem.addEventListener('click', event => {

      if(!event.target.classList.contains('slider__thumb')){
        this.setPosition(event.pageX);
        this.elem.dispatchEvent(new CustomEvent('slider-change', {detail: this.segmentNum, bubbles: true}));
      }

    });
    
    //Запрещаем ванильный Drag & Drop
    thumb.ondragstart = () => false;

    //Добавляем обработчик для кастомного Drag & Drop
    thumb.addEventListener('pointerdown', event => {

      this.elem.classList.add('slider_dragging');
      let sliderCoords = this.elem.getBoundingClientRect(); //Координаты слайдера

      const moveAt = (pageX) => {
        this.leftPercents = (pageX - sliderCoords.left) / sliderCoords.width * 100;
        this.segmentNum = Math.round((pageX - sliderCoords.left) / (sliderCoords.width / (this.steps - 1)));

        this.elem.querySelectorAll('.slider__steps > span')[this.segmentNum].classList.add('slider__step-active');
        thumb.style.left = `${this.leftPercents}%`;
        progress.style.width = `${this.leftPercents}%`;
        document.querySelector('.slider__value').textContent = this.segmentNum;

      }

      moveAt(event.pageX);

      const onPointerMove = (event) => {
        moveAt(event.pageX);
      }

      const onPointerUp = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        this.elem.classList.remove('slider_dragging');
        this.elem.dispatchEvent(new CustomEvent('slider-change', {detail: this.segmentNum, bubbles: true}));
      }

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });

  }

  //Изменение позиционирования ползунка слайдера
  setPosition(pageX = 0){
    let sliderCoords = this.elem.getBoundingClientRect(); //Координаты слайдера
    this.segmentNum = Math.round((pageX - sliderCoords.left) / (sliderCoords.width / (this.steps - 1)));
    this.leftPercents = Math.round(this.segmentNum / (this.steps - 1) * 100); // % от левого края
    this.elem.querySelector('.slider__value').textContent = this.segmentNum;
    this.elem.querySelectorAll('.slider__steps > span')[this.segmentNum].classList.add('slider__step-active');
    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPercents}%`;
  }

  //Гетеры и сетеры для контроля устанавливаемых значений
  set segmentNum(value){
    this._segmentNum = (isNaN(value)) ? 0 : (value > this.steps - 1) ? this.steps - 1 : (value < 0) ? 0 : value;
  }

  get segmentNum(){
    return this._segmentNum;
  }

  set leftPercents(value){
    this._leftPercents = (isNaN(value)) ? 0 : (value > 100) ? 100 : (value < 0) ? 0 : value;
  }

  get leftPercents(){
    return this._leftPercents;
  }
}
