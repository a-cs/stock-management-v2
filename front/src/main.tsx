import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const link = document.createElement('link')
link.type = 'text/css'
link.rel = 'stylesheet'

link.href =
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap'
document.head.appendChild(link)

document.title = 'Estoque LEM - IFCE'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
