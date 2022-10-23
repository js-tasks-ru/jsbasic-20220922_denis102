/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    //Инициализируем переменные
    this.elem = document.createElement('table');
    let table = this.elem;
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    
    //Создаем шапку таблицы
    thead.innerHTML = '<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>';

    //Добавляем строки в tbody
    tbody.innerHTML = rows.map((element) => {return `<tr><td>${element.name}</td><td>${element.age}</td><td>${element.salary}</td><td>${element.city}</td><td><button>X</button></td></tr>`;}).join('');
    
    //Навешиваем обработчик события на кнопки
    table.addEventListener('click',(event) => {
      if(event.target.tagName == 'BUTTON'){
        let curTr = event.target.closest('tr');
        curTr.parentElement.removeChild(curTr);
      }
    });
  }
}
