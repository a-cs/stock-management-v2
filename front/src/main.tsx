import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const iconLink = document.createElement('link')
iconLink.rel = 'icon'
iconLink.href = '/ifce.svg'
document.head.appendChild(iconLink)

document.title = 'Estoque LEM - IFCE'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
