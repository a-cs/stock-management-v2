import { FiEdit, FiPlus } from 'react-icons/fi'
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
import ModalCreateItem from '../../components/Modals/ModalCreateItem'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'

interface iUnit {
    id: number
    symbol: string
}

interface iItem {
    id: number
    name: string
    units: iUnit
    minimal_stock_alarm: string
    total_stock: string
}

export default function Items() {
    const [items, setItems] = useState<iItem[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openItemModal, setOpenItemModal] = useState(false)

    async function getItems() {
        setLoading(true)
        api.get('/items')
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setItems(response.data)
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
        getItems()
    }, [])
    return (
        <>
            <ModalCreateItem
                isOpen={openItemModal}
                setIsOpen={setOpenItemModal}
                updateItems={getItems}
            />
            <PageContent>
                <PageHeader>
                    <PageTitle>Estoque</PageTitle>
                    <ButtonContainer>
                        <Button
                            variant="accept"
                            hideOnMobile={true}
                            icon={<FiPlus size={32} />}
                            onClick={() => setOpenItemModal(true)}
                        >
                            Criar item
                        </Button>
                        <ButtonMobile onClick={() => setOpenItemModal(true)}>
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
                                <th>Nome</th>
                                <th>Estoque mínimo</th>
                                <th>Estoque total</th>
                                <th>Unidade</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: iItem) => (
                                <tr
                                    key={item.id}
                                    className={
                                        Number(item.total_stock) <
                                        Number(item.minimal_stock_alarm)
                                            ? 'LowStock'
                                            : ''
                                    }
                                >
                                    <td data-label="Id">
                                        {Number(item.id).toLocaleString(
                                            'pt-BR',
                                        )}
                                    </td>
                                    <td data-label="Nome">{item.name}</td>

                                    <td data-label="Estoque mínimo">
                                        {Number(
                                            item.minimal_stock_alarm,
                                        ).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 3,
                                        })}
                                    </td>
                                    <td data-label="Estoque total">
                                        {Number(
                                            item.total_stock,
                                        ).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 3,
                                        })}
                                    </td>
                                    <td data-label="Unidade">
                                        {item.units.symbol}
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
