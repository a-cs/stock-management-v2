import { FiEdit2, FiX } from 'react-icons/fi'
import ModalWithCloseOutside from '../ModalWithCloseOutside'
import { ModalFooter } from '../ModalWithCloseOutside/styles'
import Button from '../../Button'
import { FormTitle, Form } from '../../Form/styles'
import ToogleSwitch from '../../ToogleSwitch'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import { ErrorHandler } from '../../../helpers/ErrorHandler'
import SpinnerIcon from '../../SpinnerIcon'
import { iUser } from '../../../pages/Users'

interface iModalEditUserPermissionsProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    updateUsers: () => void
    selectedUser: iUser | undefined
}

export default function ModalEditUserPermissions({
    isOpen,
    setIsOpen,
    updateUsers,
    selectedUser,
}: iModalEditUserPermissionsProps) {
    const [isAllowed, setIsAllowed] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            setButtonLoading(true)
            await api.patch(`/users/${selectedUser?.id}`, {
                is_allowed: isAllowed,
                is_admin: isAdmin,
            })
            updateUsers()
            toast.success(
                `As permissões de ${selectedUser?.name} foram alteradas com sucesso.`,
            )
            setIsOpen(false)
            setButtonLoading(false)
        } catch (error) {
            ErrorHandler(error)
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && selectedUser) {
            setIsAllowed(selectedUser.is_allowed)
            setIsAdmin(selectedUser.is_admin)
        }
        return () => {
            setIsAllowed(false)
            setIsAdmin(false)
        }
    }, [isOpen, selectedUser])
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <FormTitle>
                <h4>Editar permissões</h4>
            </FormTitle>
            <Form onSubmit={handleSubmit}>
                <ToogleSwitch
                    label="Admin"
                    value={isAdmin}
                    setValue={setIsAdmin}
                />
                <ToogleSwitch
                    label="Permitido"
                    value={isAllowed}
                    setValue={setIsAllowed}
                />
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
