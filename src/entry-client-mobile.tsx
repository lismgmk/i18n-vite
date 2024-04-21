import React from 'react'
import ReactDOM from 'react-dom/client'
import Mobile from './Mobile'
import './index.css'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Mobile />
  </React.StrictMode>
)
