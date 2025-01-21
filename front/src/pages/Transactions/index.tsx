import { FiPlus } from 'react-icons/fi'
import {
    ButtonContainer,
    PageContent,
    PageHeader,
    PageTitle,
    ButtonMobile,
} from '../defaultStyles/styles'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Table } from '../../components/Table/style'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalModalCreateTransaction from '../../components/Modals/ModalCreateTransaction'

interface iUnit {
    symbol: string
}

interface iItem {
    id: number
    name: string
    units: iUnit
}

interface iTransaction {
    id: number
    item_quantity: number
    type: 'in' | 'out'
    created_at: Date
    users: {
        id: number
        name: string
    }
    items: iItem
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<iTransaction[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openCreateTransactionModal, setOpenCreateTransactionModal] =
        useState(false)

    async function getTransactions() {
        setLoading(true)
        api.get('/transactions')
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setTransactions(response.data)
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
        getTransactions()
    }, [])
    return (
        <>
            <ModalModalCreateTransaction
                isOpen={openCreateTransactionModal}
                setIsOpen={setOpenCreateTransactionModal}
                updateTransactions={getTransactions}
            />
            <PageContent>
                <PageHeader>
                    <PageTitle>Movimentações</PageTitle>
                    <ButtonContainer>
                        <Button
                            variant="accept"
                            hideOnMobile={true}
                            icon={<FiPlus size={32} />}
                            onClick={() => setOpenCreateTransactionModal(true)}
                        >
                            Criar movimentação
                        </Button>
                        <ButtonMobile
                            onClick={() => setOpenCreateTransactionModal(true)}
                        >
                            <FiPlus size="40px" />
                        </ButtonMobile>
                    </ButtonContainer>
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
                                <th>Data/Hora</th>
                                <th>Realizado por</th>
                                <th>Item</th>
                                <th>Tipo</th>
                                <th>Quantidade</th>
                                <th>Unidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction: iTransaction) => (
                                <tr key={transaction.id}>
                                    <td data-label="Id">
                                        {Number(transaction.id).toLocaleString(
                                            'pt-BR',
                                        )}
                                    </td>
                                    <td data-label="Data/Hora">
                                        {new Date(
                                            transaction.created_at,
                                        ).toLocaleDateString('pt-BR')}
                                        <br />
                                        {' às '}
                                        {new Date(
                                            transaction.created_at,
                                        ).toLocaleTimeString('pt-BR')}
                                    </td>
                                    <td data-label="Realizado por">
                                        {transaction.users.name}
                                    </td>
                                    <td data-label="Item">
                                        {transaction.items.name}
                                    </td>

                                    <td data-label="Tipo">
                                        {transaction.type === 'in'
                                            ? 'Entrada'
                                            : 'Saída'}
                                    </td>
                                    <td data-label="Quantidade">
                                        {Number(
                                            transaction.item_quantity,
                                        ).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 3,
                                        })}
                                    </td>
                                    <td data-label="Unidade">
                                        {transaction.items.units.symbol}
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
