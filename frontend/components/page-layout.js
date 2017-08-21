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
        <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/68698/7804572/css/fonts.css" /> 
      </Head>

      <SiteHeader />
      
      <div className="site-content">
      {children}
      </div>

      <style jsx global>{`
        :root {
          --cols: 12;
          --gutter: 2rem;
          --sidebar-span: 4;
          --mainbar-span: 8;
          --outer-padding: 8%;

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
        a:link, a:visited {
          color: inherit;
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
          background-color: #00f1;
        }
        .site-header {
          grid-column-start: 0;
          grid-column-end: span var(--sidebar-span);
        }
        .site-content {
          grid-column-start: calc(var(--sidebar-span) + 1);
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
      `}</style>
    </div>
  );
}