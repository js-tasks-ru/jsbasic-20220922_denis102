function makeDiagonalRed(table) {
  for(let indx = 0; indx < table.rows.length; indx++){
    table.rows[indx].cells[indx].style.backgroundColor = 'red';
  }
}
