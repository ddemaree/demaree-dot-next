import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import SiteHeader from './site-header'
import SiteNav from './site-nav'

import Router from 'next/router'
Router.onRouteChangeStart = url => {
  document.body.classList.add('app--route-pending')
}
Router.onRouteChangeComplete = url => {
  console.log('App changed to: ', url)
  document.body.classList.remove('app--nav-open')
  document.body.classList.remove('app--route-pending')
}

function getWindowWidthOffset(){
  if(typeof window === 'undefined') return null;

  const { body } = document;
  const main = document.getElementsByClassName('main__inner')[0];
  if(main) {
    console.log(main);
    const bodyClientWidth   = body.clientWidth;
    const mainClientWidth   = parseInt(main.clientWidth);
    console.log(body.clientWidth, main.clientWidth);
    const windowWidthOffset = (bodyClientWidth - mainClientWidth);
    body.style.setProperty('--window-width-offset', `${windowWidthOffset}px`);
  }
}
getWindowWidthOffset()

export default class PageLayout extends React.Component {

  componentDidMount() {
    document.body.addEventListener('click', this.handleMenuClick.bind(this));
    window.addEventListener('resize', getWindowWidthOffset);
    getWindowWidthOffset()
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleMenuClick.bind(this));
    window.removeEventListener('resize', getWindowWidthOffset);
  }

  handleMenuClick(event) {
    if(!document.body.classList.contains('app--nav-open')) return true;
    if(event.target.closest('.navigation')) return true;
    
    event.preventDefault();
    event.stopPropagation();
    document.body.classList.remove('app--nav-open');
  }

  render() {
    const { title, section, children } = this.props;
    const showFooter = typeof this.props.showFooter !== 'undefined' ? this.props.showFooter : true;

    let siteTitle = "David’s web site";
    let pageTitle, footer;
    if(title){
      pageTitle = `${title} • ${siteTitle}`;
    } else {
      pageTitle = siteTitle;
    }

    if(showFooter) {
      footer = (
        <div className="site__footer">
          &copy;2017 David Demaree. I am a person.
        </div>
      )
    }

    return (
      <div className="container site">
        <Head>
          <title>{pageTitle}</title>
        </Head>

        <div className="site-header site__header navigation">
          <div className="navigation__menu">
            <Link href="/">
              <a className="navigation__menu__item navigation__menu__item--logo">
                <span>🏠&nbsp;&nbsp;Home</span>
              </a>
            </Link>

            <button className="navigation__menu__item navigation__menu__item--burger" onClick={e => {
              if(document) {
                document.body.classList.toggle('app--nav-open');
              }
            }}><span>🍔&nbsp;&nbsp;Menu</span></button>
          </div>
          <div className="menu">
            <button className="menu__close" onClick={e => {
              if(document) {
                document.body.classList.toggle('app--nav-open');
              }
              }}>
              <span>🙈&nbsp;&nbsp;Close</span>
            </button>
            <div className="menu__wrapper">
              <Link href="/">
                <a className="logo">
                  David Demaree
                  <span>Maker of interwebs and fine software</span>
                </a>
              </Link>

              <SiteNav section={section} />
            </div>
          </div>
        </div>

        <main className="site-content site__content main">
          <div className="main__inner">
            {children}
            {footer}
          </div>
        </main>
  
        <style jsx global>{`
          :root {
            --inset-padding: 1.5rem;
            --sidebar-width: 13rem;
          }

          body, html, body > div, #__next, #__next > div, .container {
            height: 100%;
            overflow: hidden;
          }

          @media (max-width: 900px) {
            :root {
              --sidebar-width: 10rem;
              --window-height: 100vh;
              --window-width-offset: 0px;
            }
          }

          * { box-sizing: border-box; }
          html {
            font-size: 18px;
          }

          body {
            font-family: 'halyard-text', --apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            overflowX: hidden;
          }

          a {
            color: inherit;
          }
          p {
            font-family: 'freight-text-pro', Georgia, serif;
          }
          h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
            line-height: 1.25;
          }

          blockquote {
            border-left: 4px solid #eee;
            padding: 0 1em;
            margin: 1em 0 0 calc(1rem - 4px);
            color: #666;
          }
          blockquote *:first-child {
            margin-top: 0;
          }

          .container {
            background: #fff;
          }

          .navigation {
            pointer-events: none;
            display: inline;
          }

          .navigation__menu {
            position: fixed;
            top: 0;
            left: 0;
            right: var(--window-width-offset);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 5;
            align-items: center;
            background-color: rgba(255,255,255,0.9);
          }

          body.app--home .navigation__menu {
            background: transparent;
          }

          .menu__close,
          .navigation__menu__item {
            font-family: 'halyard-micro', sans-serif;
            font-weight: bold;
            pointer-events: auto;
            width: 120px;
            height: 3rem;
            font-size: 0.8rem;
            line-height: 1;
            -webkit-appearance: none;
            background: none;
            color: inherit;
            border: 0;
            border-width: 0;
            border-style: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
          }

          .navigation .menu {
            position: fixed;
            top: 0;
            bottom: 0;
            right: -100%;
            width: 100%;
            background: #000;
            color: #fff;
            z-index: 10;
            transition: transform 0.25s, filter 0.25s;
            display: flex;
          }

          @media (min-width: 800px) {
            .navigation .menu {
              width: 50%;
              right: -50%;
            }
          }

          body.app--nav-open .navigation .menu {
            transform: translateX(-100%);
          }

          .menu__close {
            position: absolute;
            right: 15px;
            top: 0;
            z-index: 2;
          }

          .menu__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            pointer-events: auto;
            padding: 80px 1.5em;
            flex-grow: 1;
          }

          .main {
            height: 100%;
          }

          .main__inner {
            overflow: auto;
            position: relative;
            z-index: 1;
            height: 100%;
            padding-top: 80px;
          }

          body.app--home .main__inner {
            padding-top: 0;
          }

          .main:before {
            content: '';
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            position: absolute;
            pointer-events: none;
            z-index: 6;
            opacity: 0;
            transition: opacity 0.5s;
          }

          body.app--nav-open {
            overflow: hidden;
          }

          .app--nav-open .site__content:before {
            opacity: 1;
            pointer-events: auto;
          }

          .logo:link {
            border: none;
            font-weight: bold;
            padding: 0.5em 0.5em 1em;
            margin: 0 -0.5em;
          }
          .logo:hover {
            background: transparent;
          }
  
          .logo span {
            display: block;
            color: rgba(255,255,255,0.4);
            font-weight: normal;
            font-family: 'halyard-micro';
            font-size: 0.75em;
            line-height: 1.1;
            margin: 0.25em 0 0;
          }
  
          .site-social {
            display: none;
          }

          .site__footer {
            text-align: center;
            padding-bottom: 2em;
          }

          @media (max-width: 720px) {
            .container {
              margin-left: 0;
            }
            .site-header {
              position: static;
              width: auto;
            }
            .site-nav {
              flex-direction: row !important;
            }
          }
  
        `}</style>
      </div>
    )
  } // end render()

}