import { Form, FormContainer, FormTitle, LoginContainer } from './styles'
import { useContext, useState } from 'react'
import { MdLogin } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await signIn({
                email,
                password,
            })
            navigate('/estoque')
        } catch (error: any) {
            setMessage(error.response.data.message)
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
                        variant="accept"
                        type="submit"
                        icon={<MdLogin size={32} />}
                    >
                        Login
                    </Button>
                    <Link to="/Criar-conta">Criar uma nova conta</Link>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
