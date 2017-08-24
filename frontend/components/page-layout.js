import Head from 'next/head'
import Link from 'next/link'

import SiteHeader from './site-header'

export default ({ title, children }) => {
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
        <link href="https://use.typekit.net/sqm7elp.css" rel="stylesheet" type="text/css" />
      </Head>

      <SiteHeader />
      
      <div className="site-content">
      {children}
      </div>

      <style jsx global>{`
        :root {
          --cols: 16;
          --gutter: 2rem;
          --sidebar-span: 5;
          --mainbar-span: 9;
          --mainbar-offset: 1;
          --outer-padding: 4%;

          /* Width of body/container is viewport minus outer padding */
          --container-width: calc(100% - (var(--outer-padding) * 2));

          /* Computed width of a single grid column: container width, minus all gutters, divided by number of grid columns */
          --column-width: calc(( 
            var(--container-width) - ( ( var(--cols) - 1) * var(--gutter) )
          ) / var(--cols));

          /* Width of the faux column */
          --fc-width: calc(
            (var(--column-width) * var(--sidebar-span)) + (var(--gutter) * (var(--sidebar-span) - 1)) + var(--outer-padding)
          );
        }

        * {
          box-sizing: border-box;
        }
        html {
          padding: calc(var(--gutter) * 2) var(--outer-padding);
        }
        body {
          font-family: 'acumin-pro', --apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif;
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

        .container {
          display: grid;
          grid-column-gap: var(--gutter);
          grid-row-gap: var(--gutter);
          grid-template-columns: repeat(var(--cols), 1fr);
        }
        body {
          margin: 0;
          padding: 0;
        }
        body:before {
          display: block;
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--fc-width);
          background-color: #fff;
          z-index: -1;
          {/* border-right: 1px solid #e0e0e0; */}
          box-shadow: 0 0 20px #eee, inset -1px 0 0 #fff;
        }
        .site-header {
          grid-column-start: 0;
          grid-column-end: span var(--sidebar-span);
        }
        .site-content {
          grid-column-start: calc(var(--sidebar-span) + var(--mainbar-offset) + 1);
          grid-column-end: span var(--mainbar-span);
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

        @media (min-width: 1200px) {
          :root {
            --outer-padding: 8%;
          }
        }

        @media (max-width: 1000px) {
          :root {
            --outer-padding: 2rem;
            --mainbar-offset: 1;
            --mainbar-span: 10;
            --sidebar-span: 4;
          }
        }
        @media (max-width: 800px) {
          :root {
            --outer-padding: 0;
          }
          html {
            padding: 0;
          }
          body:before {
            display: none;
          }
          .container {
            display: block;
          }
          .site-header, .site-content {
            padding: 2em 9%;
          }
          .site-header {
            box-shadow: 0 0 8px #ccc;
            background: #fff;
          }
        }
      `}</style>
    </div>
  );
}