import { FiEdit2, FiX } from 'react-icons/fi'
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
import { iUnit } from '../../../pages/Units'

interface iModalEditUnitProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateUnits: () => void
    selectedUnit: iUnit | undefined
}

export default function ModalEditUnit({
    isOpen,
    setIsOpen,
    updateUnits,
    selectedUnit,
}: iModalEditUnitProps) {
    const [symbol, setSymbol] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.patch(`/units/${selectedUnit?.id}`, { symbol })
            updateUnits()
            toast.success('A unidade foi alterada com sucesso.')
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            console.log('error:', error)
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && selectedUnit) {
            setSymbol(selectedUnit.symbol)
        }
    }, [isOpen, selectedUnit])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Editar unidade</h4>
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
                                <FiEdit2 size={32} />
                            )
                        }
                        disabled={buttonLoading}
                    >
                        {buttonLoading ? 'Loading...' : 'Editar'}
                    </Button>
                    <Button variant="refuse" icon={<FiX size={32} />}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Form>
        </ModalWithCloseOutside>
    )
}
