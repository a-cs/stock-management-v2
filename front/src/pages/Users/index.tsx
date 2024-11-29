import { FiCheck, FiEdit, FiX } from 'react-icons/fi'
import {
    PageContent,
    PageHeader,
    PageTitle,
    IconContainer,
} from '../defaultStyles/styles'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Table } from '../../components/Table/style'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalCreateUnit from '../../components/Modals/ModalCreateUnit'

interface iUser {
    id: string
    name: string
    email: string
    is_admin: boolean
    is_allowed: boolean
}

export default function Users() {
    const [units, setUnits] = useState<iUser[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)

    async function getUnits() {
        setLoading(true)
        api.get('/users')
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setUnits(response.data)
            })
            .catch((error) => {
                console.log('error:', error)
                error.message = 'Não foi possivel carregar os dados da tabela.'
                ErrorHandler(error)
                setLoading(false)
                setErrorMsg(error.message)
            })
    }

    useEffect(() => {
        getUnits()
    }, [])
    return (
        <>
            <ModalCreateUnit
                isOpen={openCreateUnitModal}
                setIsOpen={setOpenCreateUnitModal}
                updateUnits={getUnits}
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
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                                    <td data-label="Id">
                                        {Number(user.id).toLocaleString(
                                            'pt-BR',
                                        )}
                                    </td>
                                    <td data-label="Nome">{user.name}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Admin">
                                        <IconContainer $isGreen={user.is_admin}>
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
                                            // onClick={() => {
                                            // 	setEditItemId(item.id)
                                            // 	toggleEditItemModal()
                                            // }}
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
                )}
            </PageContent>
        </>
    )
}
