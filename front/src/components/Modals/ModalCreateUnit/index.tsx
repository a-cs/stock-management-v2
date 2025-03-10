import { FiCheck, FiX } from 'react-icons/fi'
import ModalWithCloseOutside from '../ModalWithCloseOutside'
import { ModalFooter } from '../ModalWithCloseOutside/styles'
import Button from '../../Button'
import { FormTitle, Form } from '../../Form/styles'
import Input from '../../Input'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import { ErrorHandler } from '../../../helpers/ErrorHandler'
import SpinnerIcon from '../../SpinnerIcon'

interface iModalCreateUnitProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateUnits: () => void
}

export default function ModalCreateUnit({
    isOpen,
    setIsOpen,
    updateUnits,
}: iModalCreateUnitProps) {
    const [symbol, setSymbol] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.post('/Units', { symbol })
            updateUnits()
            toast.success('A unidade foi criada com sucesso.')
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setSymbol('')
        }
    }, [isOpen])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Criar nova unidade</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input label="Unidade" value={symbol} setValue={setSymbol} />
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
            </Form>
        </ModalWithCloseOutside>
    )
}
