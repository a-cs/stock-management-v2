import { Outlet } from 'react-router-dom'
import Header from '../Header'
import { LayoutContainer } from './styles'
import Footer from '../Footer'

export default function Layout() {
    return (
        <>
            <Header />
            <LayoutContainer>
                <Outlet />
            </LayoutContainer>
            <Footer />
        </>
    )
}
