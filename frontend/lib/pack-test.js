require('./pack.css');

/*
This file loads/runs vanilla JS that should run before Next boots,
e.g. to decorate the body tag so that the window-height property is
set before the PageLayout tag is mounted.
*/

function getWindowHeight() {
  const { body } = document;
  const bodyClientHeight  = window.innerHeight;
  body.style.setProperty('--window-height', `${bodyClientHeight}px`);
}
window.addEventListener('resize', (ev)=>{
  getWindowHeight();
});
getWindowHeight();