/* @flow */

import express from 'express'
import path from 'path'
import createSSR from './createSSR'
import { WebApp } from 'meteor/webapp'
import createDebug from 'debug'
import Fiber from 'fibers'

const shutdownDebug = createDebug('crater:shutdown')

import '../universal/collections/Counts'

const app = express()

app.use((req: Object, res: Object, next: Function) => {
  if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
    res.status(404).end()
  } else {
    next()
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.resolve(__dirname, 'static')))
}

// server-side rendering
app.get('*', (req: Object, res: Object, next: Function) => {
  // let Meteor handle sockjs requests so that DDP works
  if (/^\/sockjs/.test(req.path)) {
    next()
    return
  }
  Fiber((): void => createSSR(req, res)).run()
})

WebApp.rawConnectHandlers.use(app)
WebApp.onListening(() => {
  console.log(`App is listening on http://0.0.0.0:${process.env.PORT || '80'}`) // eslint-disable-line no-console
})

function shutdown() {
  shutdownDebug('got signal, shutting down')
  WebApp.httpServer.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

