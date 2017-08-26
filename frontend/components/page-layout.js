import Head from 'next/head'
import Link from 'next/link'

import SiteHeader from './site-header'
import SiteNav from './site-nav'

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
        <meta name="viewport" content="width=device-width" />
      </Head>

      <SiteHeader />
      <SiteNav />

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
          padding: 0 var(--outer-padding);
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

        body {
          margin: 0;
          padding: 0;
        }

        .container {
          display: grid;
          grid-column-gap: var(--gutter);
          grid-row-gap: var(--gutter);

          grid-template-columns: 16em repeat(4, 1fr) 8em;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header header sidebar sidebar sidebar"
            "main main main main main main"
            ". footer footer footer footer footer";
        }

        .site-header {
          grid-area: header;
        }
        .site-nav {
          grid-area: sidebar;
        }
        .site-content {
          grid-area: main;
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