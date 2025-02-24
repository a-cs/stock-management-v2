import { LoginContainer, StyledLink } from '../Login/styles'
import { useState } from 'react'
import { MdLockReset } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormContainer, FormTitle, Form } from '../../components/Form/styles'
import SpinnerIcon from '../../components/SpinnerIcon'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import api from '../../services/api'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        try {
            setLoading(true)
            const { data } = await api.post('/users/forgot-password', {
                email,
            })
            toast.success(data.message)
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
                    <h4>Esqueci a senha</h4>
                </FormTitle>
                <Form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        setValue={setEmail}
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
                        {loading ? 'Loading...' : 'Resetar senha'}
                    </Button>
                    <StyledLink to="/login">Voltar ao login</StyledLink>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
