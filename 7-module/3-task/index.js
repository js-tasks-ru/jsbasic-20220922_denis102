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

    this.moveSlider();

    //Навешиваем события
    this.elem.addEventListener('click', event => {

      let elemCoords = event.currentTarget.getBoundingClientRect(); //Координаты слайдера
      this.segmentNum = Math.round((event.clientX - elemCoords.left) / (elemCoords.width / (this.steps - 1))); //Номер сегмента
      this.leftPercents = Math.round(this.segmentNum / (this.steps - 1) * 100); // % от левого края

      this.moveSlider();

      this.elem.dispatchEvent(new CustomEvent('slider-change', {detail: this.segmentNum, bubbles: true}));
    });

  }

  //Изменение позиционирования ползунка слайдера
  moveSlider(){
    this.elem.querySelector('.slider__value').textContent = this.segmentNum;
    this.elem.querySelectorAll('.slider__steps > span')[this.segmentNum].classList.add('slider__step-active');
    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPercents}%`;
  }
}
