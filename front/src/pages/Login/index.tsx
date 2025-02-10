import { LoginContainer, StyledLink } from './styles'
import { useContext, useState } from 'react'
import { MdLogin } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormContainer, FormTitle, Form } from '../../components/Form/styles'
import SpinnerIcon from '../../components/SpinnerIcon'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        try {
            setLoading(true)
            await signIn({
                email,
                password,
            })
            navigate('/estoque')
            setLoading(false)
        } catch (error: any) {
            setMessage(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <LoginContainer>
            <FormContainer>
                <FormTitle>
                    <h4>Login</h4>
                </FormTitle>
                <Form onSubmit={handleSubmit}>
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
                    <h4>{message}</h4>
                    <Button
                        type="submit"
                        variant="accept"
                        icon={
                            loading ? (
                                <SpinnerIcon size={32} />
                            ) : (
                                <MdLogin size={32} />
                            )
                        }
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <StyledLink to="/criar-conta">
                        Criar uma nova conta
                    </StyledLink>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
