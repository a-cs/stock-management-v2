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
import { iItem } from '../../../pages/Items'

interface iModalEditItemProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateItems: () => void
    selectedItem: iItem | undefined
}

interface iUnit {
    id: number
    symbol: string
}

export default function ModalEditItem({
    isOpen,
    setIsOpen,
    updateItems,
    selectedItem,
}: iModalEditItemProps) {
    const [name, setName] = useState('')
    const [minimalStock, setMinimalStock] = useState('0')
    const [unitId, setUnitId] = useState('')
    const [units, setUnits] = useState<iUnit[]>([])
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.patch(`/items/${selectedItem?.id}`, {
                name,
                unit_id: Number(unitId),
                minimal_stock_alarm: Number(minimalStock),
            })
            updateItems()
            toast.success(`O item "${name}" foi editado com sucesso.`)
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            console.log('error:', error)
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        if (isOpen && selectedItem) {
            setName(selectedItem?.name)
            setUnitId(String(selectedItem?.unit_id))
            setMinimalStock(String(selectedItem.minimal_stock_alarm))
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
    }, [isOpen, setIsOpen, selectedItem])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Editar item</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Input label="Nome" value={name} setValue={setName} />
                        <Input
                            type="number"
                            label="Estoque mínimo"
                            value={minimalStock}
                            setValue={setMinimalStock}
                        />
                        <Select
                            label="Unidade"
                            value={unitId}
                            setValue={setUnitId}
                        >
                            {units.map((unit: iUnit) => (
                                <option value={unit.id} key={unit.id}>
                                    {unit.symbol}
                                </option>
                            ))}
                        </Select>
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
