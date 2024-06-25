import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './components/Layout'
import Categories from './pages/Categories'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import Users from './pages/Users'
import PrivateRouter from './components/PrivateRouter'

export function Router() {
    return (
        <Routes>
            <Route element={<PrivateRouter />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/estoque" element={<Home />} />
                    <Route path="/categorias" element={<Categories />} />
                    <Route path="/movimentacoes" element={<Transactions />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/admin" element={<Users />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
