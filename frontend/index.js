'use strict';

const express = require('express')
const next = require('next')

process.on('uncaughtException', function(err) {
  console.log('Uncaught Exception: ' + err)
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || 3000

// Secret used to encrypt session data stored on the server
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'change-me'

const app = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

const handle = app.getRequestHandler()
let server

app.prepare()
.then(db => {
  server = express();

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  // Set vary header (good practice)
  // Note: This overrides any existing 'Vary' header but is okay in this app
  server.use(function (req, res, next) {
    res.setHeader('Vary', 'Accept-Encoding')
    next()
  })

  server.listen(process.env.PORT, err => {
    if (err) {
      throw err
    }
    console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']')
    console.log(`Posts API is at ${process.env.POSTS_API}`)
  })
})
.catch(err => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})