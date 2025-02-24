import { FiCheck, FiEdit, FiX } from 'react-icons/fi'
import {
    PageContent,
    PageHeader,
    PageTitle,
    IconContainer,
} from '../../components/defaultPageStyles/styles'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Table } from '../../components/Table/style'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalEditUserPermissions from '../../components/Modals/ModalEditUserPermissions'
import Pagination from '../../components/Pagination'

export interface iUser {
    id: string
    name: string
    email: string
    is_admin: boolean
    is_allowed: boolean
}

export default function Users() {
    const pageSize = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [units, setUnits] = useState<iUser[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openEditUserPermissions, setOpenEditUserPermissions] =
        useState(false)
    const [selectedUser, setSelectedUser] = useState<iUser>()

    async function getUsers() {
        setLoading(true)
        api.get(`/users?page=${currentPage}&pageSize=${pageSize}`)
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setUnits(response.data.users)
                setTotalCount(response.data.totalCount)
            })
            .catch((error) => {
                console.log('error:', error)
                error.message = 'Não foi possivel carregar os dados da tabela.'
                ErrorHandler(error)
                setLoading(false)
                setErrorMsg(error.message)
            })
    }

    function incrementPage() {
        if (currentPage * pageSize < totalCount) {
            setCurrentPage((current) => current + 1)
            getUsers()
        }
    }

    function decrementPage() {
        if (currentPage > 1) {
            setCurrentPage((current) => current - 1)
            getUsers()
        }
    }

    function updateTransactions() {
        getUsers()
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    return (
        <>
            <ModalEditUserPermissions
                isOpen={openEditUserPermissions}
                setIsOpen={setOpenEditUserPermissions}
                updateUsers={updateTransactions}
                selectedUser={selectedUser}
            />
            <PageContent>
                <PageHeader>
                    <PageTitle>Usuários</PageTitle>
                </PageHeader>
                {errorMsg ? (
                    <ErrorMessage message={errorMsg} />
                ) : loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Permitido</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map((user: iUser) => (
                                    <tr key={user.id}>
                                        <td data-label="Nome">{user.name}</td>
                                        <td data-label="Email">{user.email}</td>
                                        <td data-label="Admin">
                                            <IconContainer
                                                $isGreen={user.is_admin}
                                            >
                                                {user.is_admin ? (
                                                    <FiCheck
                                                        size="20px"
                                                        strokeWidth="5"
                                                        color="var(--color-light-green)"
                                                    />
                                                ) : (
                                                    <FiX
                                                        size="20px"
                                                        strokeWidth="5"
                                                        color="var(--color-red)"
                                                    />
                                                )}
                                            </IconContainer>
                                        </td>
                                        <td data-label="Permitido">
                                            <IconContainer
                                                $isGreen={user.is_allowed}
                                            >
                                                {user.is_allowed ? (
                                                    <FiCheck
                                                        size="20px"
                                                        strokeWidth="5"
                                                        color="var(--color-light-green)"
                                                    />
                                                ) : (
                                                    <FiX
                                                        size="20px"
                                                        strokeWidth="5"
                                                        color="var(--color-red)"
                                                    />
                                                )}
                                            </IconContainer>
                                        </td>
                                        <td data-label="Editar">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setOpenEditUserPermissions(
                                                        true,
                                                    )
                                                }}
                                            >
                                                <FiEdit
                                                    size="20px"
                                                    strokeWidth="2"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={totalCount}
                            incrementPageFunction={incrementPage}
                            decrementPageFunction={decrementPage}
                        />
                    </>
                )}
            </PageContent>
        </>
    )
}
