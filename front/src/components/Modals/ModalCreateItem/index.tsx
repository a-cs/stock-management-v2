import { FiCheck, FiX } from 'react-icons/fi'
import ModalWithCloseOutside from '../ModalWithCloseOutside'
import { ModalFooter } from '../ModalWithCloseOutside/styles'
import Button from '../../Button'
import { FormTitle, Form } from '../../Form/styles'
import Input from '../../Input'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../../services/api'
import Select from '../../Select'
import { toast } from 'react-toastify'
import { ErrorHandler } from '../../../helpers/ErrorHandler'
import LoadingSpinner from '../../LoadingSpinner'
import SpinnerIcon from '../../SpinnerIcon'

interface iModalCreateItemProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateItems: () => void
}

interface iUnit {
    id: number
    symbol: string
}

export const convertUnitToOptions = (unit: iUnit) => ({
    value: unit.id,
    label: unit.symbol,
})

export default function ModalCreateItem({
    isOpen,
    setIsOpen,
    updateItems,
}: iModalCreateItemProps) {
    const [name, setName] = useState('')
    const [unitId, setUnitId] = useState('')
    const [units, setUnits] = useState<iUnit[]>([])
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.post('/items', { name, unit_id: Number(unitId) })
            updateItems()
            toast.success('O item foi criado com sucesso.')
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setLoading(true)
            setName('')
            setUnitId('')
            api.get('/units')
                .then((response) => {
                    setUnits(response.data)
                    setUnitId(response.data[0].id)
                    setLoading(false)
                })
                .catch((error) => {
                    ErrorHandler(error)
                    setIsOpen(false)
                    setLoading(false)
                })
        }
    }, [isOpen, setIsOpen])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Criar novo item</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Input label="Nome" value={name} setValue={setName} />
                        <Select
                            label="Unidade"
                            value={unitId}
                            setValue={setUnitId}
                            options={units.map(convertUnitToOptions)}
                        />
                        <ModalFooter>
                            <Button
                                type="submit"
                                variant="accept"
                                icon={
                                    buttonLoading ? (
                                        <SpinnerIcon size={32} />
                                    ) : (
                                        <FiCheck size={32} />
                                    )
                                }
                                disabled={buttonLoading}
                            >
                                {buttonLoading ? 'Loading...' : 'Confirmar'}
                            </Button>
                            <Button variant="refuse" icon={<FiX size={32} />}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </Form>
        </ModalWithCloseOutside>
    )
}
