function highlight(table) {
  for(let rowIndx = 1; rowIndx < table.rows.length; rowIndx++){
    
    let curRow = table.rows[rowIndx];
    
    addAvailableUnavailableClass(curRow);
    addMaleFemaleClass(curRow);
    addInlineStyle(curRow);

  }
}

function addAvailableUnavailableClass(row){
  if(row.cells[3].hasAttribute('data-available')){
    row.classList.add(row.cells[3].dataset.available == 'true' ? 'available' : 'unavailable');
  } else {
    row.hidden = true;
  }
}

function addMaleFemaleClass(row){
  if(row.cells[2].textContent == 'm'){
    row.classList.add('male');
  } else if (row.cells[2].textContent == 'f'){
    row.classList.add('female');
  }
}

function addInlineStyle(row){
  if(+row.cells[1].textContent < 18){
    row.style.textDecoration = "line-through";
  }
}
