// ./pages/_document.js
import PropTypes from 'prop-types'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {

  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    const { dev, __NEXT_DATA__ } = this.props;
    const { buildId } = __NEXT_DATA__;

    let cssLinkTag;
    if(!dev) {
      const cssUrl = ["", "_assets", buildId, "main.css"].join("/")
      cssLinkTag = (
        <link href={cssUrl} rel="stylesheet" type="text/css" />
      )
    }


    return (
      <html>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-556801-4" />
          <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());
  gtag('config', 'UA-556801-4');`}} />
          <link href="https://use.typekit.net/hiq1zht.css" rel="stylesheet" type="text/css" />
          {cssLinkTag}
          <meta name="viewport" content="width=device-width" />
        </Head>
        <body className="app">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}