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
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalCreateUnit from '../../components/Modals/ModalCreateUnit'
import ModalEditUnit from '../../components/Modals/ModalEditUnit'
import Pagination from '../../components/Pagination'

export interface iUnit {
    id: number
    symbol: string
}

export default function Units() {
    const pageSize = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [units, setUnits] = useState<iUnit[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)
    const [openEditUnitModal, setOpenEditUnitModal] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState<iUnit>()

    async function getUnits() {
        setLoading(true)
        api.get(`/units/paginated?page=${currentPage}&pageSize=${pageSize}`)
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setUnits(response.data.units)
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
            getUnits()
        }
    }

    function decrementPage() {
        if (currentPage > 1) {
            setCurrentPage((current) => current - 1)
            getUnits()
        }
    }

    function updateUnits() {
        getUnits()
    }

    useEffect(() => {
        getUnits()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    return (
        <>
            <ModalCreateUnit
                isOpen={openCreateUnitModal}
                setIsOpen={setOpenCreateUnitModal}
                updateUnits={updateUnits}
            />
            <ModalEditUnit
                isOpen={openEditUnitModal}
                setIsOpen={setOpenEditUnitModal}
                updateUnits={getUnits}
                selectedUnit={selectedUnit}
            />
            <PageContent>
                <PageHeader>
                    <PageTitle>Unidades</PageTitle>
                    <ButtonContainer>
                        <Button
                            variant="accept"
                            hideOnMobile={true}
                            icon={<FiPlus size={32} />}
                            onClick={() => setOpenCreateUnitModal(true)}
                        >
                            Criar unidade
                        </Button>
                        <ButtonMobile
                            onClick={() => setOpenCreateUnitModal(true)}
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
                                    <th>Unidade</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map((unit: iUnit) => (
                                    <tr key={unit.id}>
                                        <td data-label="Unidade">
                                            {unit.symbol}
                                        </td>
                                        <td data-label="Editar">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedUnit(unit)
                                                    setOpenEditUnitModal(true)
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
