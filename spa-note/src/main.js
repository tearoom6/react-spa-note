import React from 'react'
import ReactDOM from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import getRoutes from './routes'
import { createDispatcher } from './dispatcher'
import { rehydrateState } from './actions'
import { createStores } from './stores'

const dispatcher = createDispatcher()
createStores(dispatcher)

const routes = getRoutes()
const mountNode = document.getElementById('app')
const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'))
rehydrateState(initialData)

match( { history: browserHistory, routes }, ( error, redirectLocation, renderProps ) => {
  ReactDOM.render(<Router {...renderProps} />, mountNode)
})
