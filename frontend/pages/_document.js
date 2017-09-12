// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

console.trace("WHERE AM I")

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <link href="https://use.typekit.net/hiq1zht.css" rel="stylesheet" type="text/css" />
          <meta name="viewport" content="width=device-width" />
        </Head>
        <body className="app">
          <Main />
          <script src="/static/weirdo.js" type="text/javascript" />
          <NextScript />
        </body>
      </html>
    )
  }
}