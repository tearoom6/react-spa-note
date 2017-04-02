import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import getRoutes from './routes'
import { dehydrateState, getStores, createStores } from './stores'
import { createDispatcher } from './dispatcher'

import Html from './helper/Html'
import flattenComponents from './helper/flattenComponents'

const app = new express()

app.use((req, res, next) => {
  match({ routes: getRoutes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message)
    }

    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (!renderProps) {
      return next()
    }

    if (renderProps) {
      const dispatcher = createDispatcher()
      createStores(dispatcher)
      const renderOnServer = () => {
        const component = <RouterContext {...renderProps} />
        const initialData = dehydrateState()
        return res.send(
          '<!doctype html>\n' +
          renderToStaticMarkup(<Html component={component} initialData={initialData} />))
      }
      const components = flattenComponents(renderProps.components)

      if (!components.length) {
        return renderOnServer()
      }

      Promise.all(components.map((component) => component.prefetch(renderProps))).then(() => {
        renderOnServer()
      })
    }
  })
})

app.use(express.static('public'))

app.listen(8081)
