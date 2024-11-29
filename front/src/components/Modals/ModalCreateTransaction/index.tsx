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

interface iModalModalCreateTransactionProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateTransactions: () => void
}

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

export default function ModalModalCreateTransaction({
    isOpen,
    setIsOpen,
    updateTransactions,
}: iModalModalCreateTransactionProps) {
    const [quantity, setQuantity] = useState('')
    const [type, setType] = useState<'in' | 'out'>('in')
    const [itemId, setItemId] = useState('')
    const [items, setItems] = useState<iItem[]>([])
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.post('/transactions', {
                item_id: Number(itemId),
                item_quantity: Number(quantity),
                type,
            })
            updateTransactions()
            toast.success('A movimentação foi criada com sucesso.')
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            console.log('error:', error)
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setLoading(true)
            setQuantity('')
            setItemId('')
            setType('in')
            api.get('/items')
                .then((response) => {
                    setItems(response.data)
                    setItemId(response.data[0].id)
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
                <h4>Criar nova movimentação</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Select
                            label="Item"
                            value={itemId}
                            setValue={setItemId}
                        >
                            {items.map((item: iItem) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                        <Select label="Tipo" value={type} setValue={setType}>
                            <option value={'in'}>Entrada</option>
                            <option value={'out'}>Saída</option>
                        </Select>
                        <Input
                            label="Quantidade"
                            value={quantity}
                            setValue={setQuantity}
                            type="number"
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
