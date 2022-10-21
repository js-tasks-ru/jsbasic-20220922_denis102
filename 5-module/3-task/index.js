function initCarousel() {

  //Инициализируем переменные
  let curOffset = 0;
  let carousel = document.querySelector('.carousel__inner');
  let maxCarouselOffset = carousel.offsetWidth*3;

  //Навешиваем события движения
  let addMovement = function(event){

    let targetClasslist = event.target.classList;
  
    if(targetClasslist.contains('carousel__arrow_right')){
      changeOffset('right');
      return;
    }
  
    if(targetClasslist.contains('carousel__arrow_left')){
      changeOffset('left');
      return;
    }
    
  }

  //Меняем текущее смещение
  let changeOffset = function(side){
    
    switch (side){
      case 'right':
        curOffset -= carousel.offsetWidth;
        break;
      case 'left':
        curOffset += carousel.offsetWidth;
        break;   
    }

    carousel.style.transform = `translateX(${curOffset}px)`;
    checkOffset();

  }

  //Скрываем, либо показываем переключатели
  let checkOffset = function(){
      document.querySelector('.carousel__arrow_left').style.display = (curOffset == 0) ? 'none' : '';
      document.querySelector('.carousel__arrow_right').style.display = (curOffset == -maxCarouselOffset) ? 'none' : '';
  }

  checkOffset();
  document.querySelector('.container').addEventListener('click',addMovement);

}


