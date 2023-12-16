import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router/Router.tsx'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Toaster />
        <Router />
    </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
