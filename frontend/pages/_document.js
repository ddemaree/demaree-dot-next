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
    const { __NEXT_DATA__ } = this.props;
    console.log(__NEXT_DATA__);
    const { dev, buildId } = __NEXT_DATA__;
    
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
          <link href="https://use.typekit.net/hiq1zht.css" rel="stylesheet" type="text/css" />
          {/* <link href="//localhost:4000/_next/webpack/main.js.css" rel="stylesheet" type="text/css" /> */}
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