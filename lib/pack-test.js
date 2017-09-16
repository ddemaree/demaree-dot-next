require('./pack.css');

import Router from 'next/router'
Router.onRouteChangeStart = (url) => {
  document.body.classList.add('app--route-pending')
}
Router.onRouteChangeComplete = (url) => {
  console.log("Dispatching event for ", url)
  try {
    const e = new CustomEvent('routeend', { url });
    window.dispatchEvent(e);
  } catch(err) {
    console.trace(err)
  }
}

Router.onRouteChangeError = (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`)
  }
}

window.addEventListener('routeend', e => {
  console.log(e.url);
});

window.addEventListener('routeend', e => {
  console.log("Tracking url ", e.url)
  gtag('config', 'UA-556801-4', {'page_path': e.url});

  const elem = document.querySelector('.main__inner');
  if(elem) {
    elem.scrollTop = 0;
    getWindowWidthOffset()
  }

  document.body.classList.remove('app--nav-open')
  document.body.classList.remove('app--route-pending')
})

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