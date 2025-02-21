import { FiX } from 'react-icons/fi'
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
import { TbLockCog } from 'react-icons/tb'

interface iModalChangePasswordProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export default function ModalChangePassword({
    isOpen,
    setIsOpen,
}: iModalChangePasswordProps) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.put('/users/password', {
                currentPassword,
                newPassword,
                confirmNewPassword,
            })
            toast.success('A senha foi alterada sucesso.')
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (!isOpen) {
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }
    }, [isOpen])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Alterar senha</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input
                    label="Senha atual"
                    value={currentPassword}
                    setValue={setCurrentPassword}
                    type="password"
                />
                <Input
                    label="Nova senha"
                    value={newPassword}
                    setValue={setNewPassword}
                    type="password"
                />
                <Input
                    label="Confirmar nova senha"
                    value={confirmNewPassword}
                    setValue={setConfirmNewPassword}
                    type="password"
                />
                <ModalFooter>
                    <Button
                        type="submit"
                        variant="accept"
                        icon={
                            buttonLoading ? (
                                <SpinnerIcon size={32} />
                            ) : (
                                <TbLockCog size={32} />
                            )
                        }
                        disabled={buttonLoading}
                    >
                        {buttonLoading ? 'Loading...' : 'Alterar'}
                    </Button>
                    <Button variant="refuse" icon={<FiX size={32} />}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Form>
        </ModalWithCloseOutside>
    )
}
