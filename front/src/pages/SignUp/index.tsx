import { LoginContainer, StyledLink } from '../Login/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormContainer, FormTitle, Form } from '../../components/Form/styles'
import { FiUserPlus } from 'react-icons/fi'
import api from '../../services/api'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import { toast } from 'react-toastify'
import SpinnerIcon from '../../components/SpinnerIcon'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        try {
            setLoading(true)
            await api.post('/users', {
                name,
                email,
                password,
            })
            toast.success('Conta criada com sucesso.')
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
                    <h4>Criar Conta</h4>
                </FormTitle>
                <Form onSubmit={handleSubmit}>
                    <Input
                        label="Nome"
                        type="text"
                        value={name}
                        setValue={setName}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />
                    <Button
                        type="submit"
                        variant="accept"
                        icon={
                            loading ? (
                                <SpinnerIcon size={32} />
                            ) : (
                                <FiUserPlus size={32} />
                            )
                        }
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Criar'}
                    </Button>
                    <StyledLink to="/login">Voltar ao login</StyledLink>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
