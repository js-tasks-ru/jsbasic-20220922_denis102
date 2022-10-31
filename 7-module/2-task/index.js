import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>
    
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
    
      </div>
    `);

    this.elem.addEventListener('click', event => {
      if(event.target.classList.contains('modal__close')){
        this.close();
      }
    });

    document.addEventListener('keydown',event => {
      if(event.code === 'Escape'){
        this.close();
      }
    });

  }

  open(){
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  setTitle(titleText){
    this.elem.querySelector('.modal__title').textContent = titleText;
  }

  setBody(node){
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  close(){
    document.body.classList.remove('is-modal-open');
    let modal = document.body.querySelector('.modal');
    if(modal){
      modal.remove();
    }
  }
}
