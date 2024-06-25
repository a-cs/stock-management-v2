import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { defaultTheme } from './components/styles/themes/default'
import { GlobalStyle } from './components/styles/global'
import isPropValid from '@emotion/is-prop-valid'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <AuthProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </AuthProvider>
            </StyleSheetManager>
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default App
