import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

export function renderDocument(html = ""){
  const doc = (
    <html>
      <head>
        <title>Hello world test</title>
      </head>
      <body>
        <div id="__dd_next">{html}</div>
      </body>
    </html>
  )

  return renderToStaticMarkup(doc);
}