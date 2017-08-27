import Head from 'next/head'
import Link from 'next/link'

import SiteHeader from './site-header'
import SiteNav from './site-nav'

export default ({ title, children, section }) => {
  let siteTitle = "David’s web site";
  let pageTitle;
  if(title){
    pageTitle = `${title} • ${siteTitle}`;
  } else {
    pageTitle = siteTitle;
  }


  return (
    <div className="container">
      <Head>
        <title>{pageTitle}</title>
        <link href="https://use.typekit.net/hiq1zht.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <div className="site-header">
        <Link href="/">
          <a className="logo">
            David Demaree
            <span>Maker of interwebs and fine software</span>
          </a>
        </Link>

        <SiteNav section={section} />

        <div className="site-social">SOCIAL</div>
      </div>

      <div className="site-content">
      {children}
      </div>

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          font-size: 18px;
        }

        body {
          font-family: 'halyard-text', --apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif;
          margin: 0 0 0 240px;
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
        a:hover {
          background-color: #e5e5e5;
        }

        h1, h2, h3, h4 {
          margin: 2em 0 0.5em;
        }
        h1:first-child, h2:first-child {
          margin-top: 0;
        }
        h1, h2 {
          font-size: 1.5em;
        }
        h3, h4 {
          font-size: 1em;
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

        .site-header {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          width: 240px;
          background: #000;
          color: #fff;
          padding: 1.5em;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .site-social {
          min-height: 3em;
        }

        @media (max-width: 700px) {
          body {
            margin-left: 0;
          }
          .site-header {
            position: static;
            width: auto;
          }
        }

      `}</style>
    </div>
  );
}