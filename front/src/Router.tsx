import { Route, Routes } from 'react-router-dom'
import Items from './pages/Items'
import Login from './pages/Login'
import Layout from './components/Layout'
import Units from './pages/Units'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import Users from './pages/Users'
import PrivateRouter from './components/PrivateRouter'
import SignUp from './pages/SignUp'

export function Router() {
    return (
        <Routes>
            <Route element={<PrivateRouter />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Items />} />
                    <Route path="/estoque" element={<Items />} />
                    <Route path="/unidades" element={<Units />} />
                    <Route path="/movimentacoes" element={<Transactions />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/admin" element={<Users />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<SignUp />} />
        </Routes>
    )
}
