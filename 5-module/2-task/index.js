function toggleText() {
  
  let func = function(){
    let txt = document.querySelector('#text');
    txt.hidden = !txt.hidden;
  }

  document.querySelector('.toggle-text-button').addEventListener('click',func);
}