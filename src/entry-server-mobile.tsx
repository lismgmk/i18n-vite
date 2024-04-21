import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Mobile from './Mobile'

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Mobile />
    </React.StrictMode>
  )
  return { html }
}
