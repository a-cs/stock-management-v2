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
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import ModalCreateUnit from '../../components/Modals/ModalCreateUnit'

interface iUnit {
    id: number
    symbol: string
}

export default function Units() {
    const [units, setUnits] = useState<iUnit[]>([])
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [openCreateUnitModal, setOpenCreateUnitModal] = useState(false)

    async function getUnits() {
        setLoading(true)
        api.get('/units')
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
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Unidade</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.map((unit: iUnit) => (
                                <tr key={unit.id}>
                                    <td data-label="Id">
                                        {Number(unit.id).toLocaleString(
                                            'pt-BR',
                                        )}
                                    </td>
                                    <td data-label="Unidade">{unit.symbol}</td>
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
