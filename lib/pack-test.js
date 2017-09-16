require('./pack.css');

import Router from 'next/router'
console.log(Router);


if(typeof gtag === 'function') {
  console.log('gtag is defined');
  // const origGtag = gtag;
  // window.gtag = () => {
  //   // copy arguments
  //   var args = [].slice.call(arguments, 0);
  //   console.log("Sending a gtag with arguments", args)
  //   return gtag.apply(this, args)
  // }
}

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