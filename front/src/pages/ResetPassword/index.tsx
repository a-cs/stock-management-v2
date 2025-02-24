import { LoginContainer, StyledLink } from '../Login/styles'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormContainer, FormTitle, Form } from '../../components/Form/styles'
import api from '../../services/api'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import { toast } from 'react-toastify'
import SpinnerIcon from '../../components/SpinnerIcon'
import { MdLockReset } from 'react-icons/md'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        try {
            setLoading(true)
            const resetToken = searchParams.get('token')
            await api.post('/users/reset-password', {
                resetToken,
                newPassword,
                confirmNewPassword,
            })
            toast.success('A senha foi alterada sucesso.')
            navigate('/login')
            setLoading(false)
        } catch (error: any) {
            ErrorHandler(error)
            setLoading(false)
        }
    }

    return (
        <LoginContainer>
            <FormContainer>
                <FormTitle>
                    <h4>Alterar senha</h4>
                </FormTitle>
                <Form onSubmit={handleSubmit}>
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
                    <Button
                        type="submit"
                        variant="accept"
                        icon={
                            loading ? (
                                <SpinnerIcon size={32} />
                            ) : (
                                <MdLockReset size={32} />
                            )
                        }
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Alterar senha'}
                    </Button>
                    <StyledLink to="/login">Voltar ao login</StyledLink>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
