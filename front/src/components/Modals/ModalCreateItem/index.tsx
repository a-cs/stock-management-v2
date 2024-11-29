import { FiCheck, FiX } from 'react-icons/fi'
import ModalWithCloseOutside from '../ModalWithCloseOutside'
import { ModalFooter, ModalTitle } from '../ModalWithCloseOutside/styles'
import Button from '../../Button'
import { FormTitle, Form } from '../../Form/styles'
import Input from '../../Input'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../../services/api'
import Select from '../../Select'
import { toast } from 'react-toastify'
import { ErrorHandler } from '../../../helpers/ErrorHandler'

interface iModalCreateItemProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateItems: () => void
}

interface iUnit {
    id: number
    symbol: string
}

export default function ModalCreateItem({
    isOpen,
    setIsOpen,
    updateItems,
}: iModalCreateItemProps) {
    const [name, setName] = useState('')
    const [unitId, setUnitId] = useState('')
    const [units, setUnits] = useState<iUnit[]>([])
    const [errorMsg, setErrorMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('submit', name, unitId)
        try {
            await api.post('/items', { name, unit_id: Number(unitId) })
            updateItems()
            toast.success('O item foi criado com sucesso.')
            setIsOpen(false)
        } catch (error) {
            console.log('error:', error)
            ErrorHandler(error)
        }
    }

    useEffect(() => {
        if (isOpen) {
            api.get('/units')
                .then((response) => {
                    setUnits(response.data)
                    setUnitId(response.data[0].id)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log('error:', error)
                    ErrorHandler(error)
                    setErrorMsg(true)
                    setLoading(false)
                })
        }
    }, [isOpen])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalTitle></ModalTitle>
            <FormTitle>
                <h4>Criar novo item</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input label="Name" value={name} setValue={setName} />
                <Select label="Unidade" value={unitId} setValue={setUnitId}>
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
                        icon={<FiCheck size={32} />}
                    >
                        Confirmar
                    </Button>
                    <Button variant="refuse" icon={<FiX size={32} />}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Form>
        </ModalWithCloseOutside>
    )
}
