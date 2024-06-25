import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {
    const { user } = useContext(AuthContext)

    const isAuthenticated = !!user
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
