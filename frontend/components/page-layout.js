import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import SiteHeader from './site-header'
import SiteNav from './site-nav'

import Router from 'next/router'


export default class PageLayout extends React.Component {

  render() {
    const { title, section, children } = this.props;

    let siteTitle = "David’s web site";
    let pageTitle;
    if(title){
      pageTitle = `${title} • ${siteTitle}`;
    } else {
      pageTitle = siteTitle;
    }

    return (
      <div className="container site">
        <Head>
          <title>{pageTitle}</title>
          <link href="https://use.typekit.net/hiq1zht.css" rel="stylesheet" type="text/css" />
          <meta name="viewport" content="width=device-width" />
        </Head>
  
        <div className="site-header site__header">
          <Link href="/">
            <a className="logo">
              David Demaree
              <span>Maker of interwebs and fine software</span>
            </a>
          </Link>
          <SiteNav section={section} />
        </div>

        <div className="site-content site__content">
          {children}

          <div className="site__footer">
            &copy;2017 David Demaree. I am a person.
          </div>
        </div>
  
        <style jsx global>{`
          :root {
            --inset-padding: 1.5rem;
            --sidebar-width: 13rem;
          }

          * { box-sizing: border-box; }
          html {
            font-size: 100%;
          }
          @media (min-width: 1300px) {
            html {
              font-size: 112.5%;
            }
          }


          body {
            font-family: 'halyard-text', --apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 0;
          }
          a:link {
            border-style: none none solid none;
            border-width: 0 0 1px 0;
            border-color: #ccc;
            color: inherit;
            text-decoration: none;
          }
          a:visited {
            border-style: none none dotted none;
            color: inherit;
          }
          a:link:hover, a:visited:hover {
            background-color: #e5e5e5;
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
            margin: 1em 0;
            color: #666;
          }
          blockquote *:first-child {
            margin-top: 0;
          }

          .container {
            margin-left: var(--sidebar-width);
            background: #fff;
          }

          .site__header {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: var(--sidebar-width);
            background: #000;
            color: #fff;
            padding: 1.5rem;
            z-index: 10;
  
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
            color: #999;
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