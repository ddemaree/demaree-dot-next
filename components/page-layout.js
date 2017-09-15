import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import SiteNav from './site-nav'
import DDIcon from './svg/dd-icon.svg'
import GitHubIcon from './svg/github-icon.svg'
import TwitterIcon from './svg/twitter-icon.svg'
import LinkedinIcon from './svg/linkedin-icon.svg'
import EmailIcon from './svg/email-icon.svg'

import Router from 'next/router'
Router.onRouteChangeStart = url => {
  document.body.classList.add('app--route-pending')
}
Router.onRouteChangeComplete = url => {
  const elem = document.querySelector('.main__inner');
  if(elem) {
    elem.scrollTop = 0;
    getWindowWidthOffset()
  }

  document.body.classList.remove('app--nav-open')
  document.body.classList.remove('app--route-pending')
}

function getWindowWidthOffset(){
  if(typeof window === 'undefined') return null;

  const { body } = document;
  const main = document.querySelector('.main__inner')
  if(main) {
    const bodyClientWidth   = body.clientWidth;
    const mainClientWidth   = parseInt(main.clientWidth);
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
    if(event.target.closest('.menu')) return true;
    
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
        <footer className="site__footer footer">
          &copy;2017 David Demaree. I am a person.
        </footer>
      )
    }

    return (
      <div className={`container site ${this.props.className}`}>
        <Head>
          <title>{pageTitle}</title>
        </Head>

        <div className="site-header site__header navigation">
          <div className="navigation__menu">
            <button className="navigation__menu__item navigation__menu__item--burger" onClick={e => {
              if(document) {
                document.body.classList.toggle('app--nav-open');
              }
            }}>
              <span className="emoji">🍔</span>
              <span className="label">Menu</span>
            </button>

            <Link href="/">
              <a className="navigation__menu__item navigation__menu__item--logo">
              <span className="emoji">🏠</span>
              <span className="label">
                <b>David Demaree</b>
                <span>’s web site</span>
              </span>
              </a>
            </Link>

            <div className="navigation__menu__item navigation__menu__item--null"></div>

          </div>
          <div className="menu">
            <button className="menu__close" onClick={e => {
              if(document) {
                document.body.classList.toggle('app--nav-open');
              }
              }}>
              <span className="emoji">🙈</span>
              <span className="label">Close</span>
            </button>
            <div className="menu__wrapper">
              <Link href="/">
                <a className="logo">
                  <div className="icon">
                    <DDIcon />
                  </div>
                  <div className="caption">
                    <b>David Demaree</b>
                    <span>Maker of interwebs and fine&nbsp;software</span>
                  </div>
                </a>
              </Link>

              <SiteNav section={section} />

              <div className="social">
                <a href="mailto:david@demaree.me?subject=sup" className="social__link social__link--email">
                  <span className="label">Email me</span>
                  <span className="icon"><EmailIcon /></span>
                </a>

                <a href="https://twitter.com/ddemaree" className="social__link social__link--twitter">
                  <span className="label">Twitter</span>
                  <span className="icon"><TwitterIcon /></span>
                </a>

                <a href="https://github.com/ddemaree" className="social__link social__link--github">
                  <span className="label">GitHub</span>
                  <span className="icon"><GitHubIcon /></span>
                </a>

                <a href="https://linkedin.com/in/ddemaree" className="social__link social__link--linkedin">
                  <span className="label">LinkedIn</span>
                  <span className="icon"><LinkedinIcon /></span>
                </a>

              </div>
            </div>
          </div>
        </div>

        <main className="main">
          <div className="main__inner">
            {children}
            {footer}
          </div>
        </main>
      </div>
    )
  } // end render()

}