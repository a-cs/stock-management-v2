import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { defaultTheme } from './components/styles/themes/default'
import { GlobalStyle } from './components/styles/global'
import isPropValid from '@emotion/is-prop-valid'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <AuthProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </AuthProvider>
            </StyleSheetManager>
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default App
