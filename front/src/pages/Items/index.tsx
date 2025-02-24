import { FiEdit, FiPlus } from 'react-icons/fi'
import {
    ButtonContainer,
    PageContent,
    PageHeader,
    PageTitle,
    ButtonMobile,
} from '../../components/defaultPageStyles/styles'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Table } from '../../components/Table/style'
import ModalCreateItem from '../../components/Modals/ModalCreateItem'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalEditItem from '../../components/Modals/ModalEdittem'
import Pagination from '../../components/Pagination'

export interface iItem {
    id: number
    name: string
    unit_id: number
    symbol: string
    minimal_stock_alarm: string
    total_stock: string
}

export default function Items() {
    const pageSize = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [items, setItems] = useState<iItem[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openCreateItemModal, setOpenCreateItemModal] = useState(false)
    const [openEditItemModal, setOpenEditItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<iItem>()

    async function getItems() {
        setLoading(true)
        api.get(`/items/paginated?page=${currentPage}&pageSize=${pageSize}`)
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setItems(response.data.items)
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
            getItems()
        }
    }

    function decrementPage() {
        if (currentPage > 1) {
            setCurrentPage((current) => current - 1)
            getItems()
        }
    }

    function updateItems() {
        if (currentPage !== 1) {
            setCurrentPage(1)
        } else {
            getItems()
        }
    }

    useEffect(() => {
        getItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    return (
        <>
            <ModalCreateItem
                isOpen={openCreateItemModal}
                setIsOpen={setOpenCreateItemModal}
                updateItems={updateItems}
            />
            <ModalEditItem
                isOpen={openEditItemModal}
                setIsOpen={setOpenEditItemModal}
                updateItems={updateItems}
                selectedItem={selectedItem}
            />
            <PageContent>
                <PageHeader>
                    <PageTitle>Estoque</PageTitle>
                    <ButtonContainer>
                        <Button
                            variant="accept"
                            hideOnMobile={true}
                            icon={<FiPlus size={32} />}
                            onClick={() => setOpenCreateItemModal(true)}
                        >
                            Criar item
                        </Button>
                        <ButtonMobile
                            onClick={() => setOpenCreateItemModal(true)}
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
                    <>
                        <Table>
                            <thead>
                                <tr>
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
                                            {item.symbol}
                                        </td>
                                        <td data-label="Editar">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedItem(item)
                                                    setOpenEditItemModal(true)
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
