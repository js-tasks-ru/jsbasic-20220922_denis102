function getMinMax(str) {
  let arrNumbers = str.split(' ').filter(item => !isNaN(+item)).map(item => +item);
  return {min: Math.min(...arrNumbers), max: Math.max(...arrNumbers)};
}
