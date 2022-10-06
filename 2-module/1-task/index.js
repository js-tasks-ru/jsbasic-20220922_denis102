function sumSalary(salaries) {

  let summ = 0;

  for(let prop in salaries){
    summ += (typeof(salaries[prop]) == 'number' && isFinite(salaries[prop])) ? salaries[prop] : 0;
  }

  return summ;
}
