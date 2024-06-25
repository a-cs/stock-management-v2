import {
    Button,
    Form,
    FormContainer,
    FormTitle,
    Input,
    InputTitle,
    Label,
    LoginContainer,
} from './styles'
import { useContext, useState } from 'react'
import { MdLogin } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

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
                    <Label htmlFor="email">
                        <Input
                            id="email"
                            type="email"
                            placeholder=" "
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputTitle $isInputEmpty={!email}>Email</InputTitle>
                    </Label>
                    <Label htmlFor="password">
                        <Input
                            id="password"
                            type="password"
                            placeholder=" "
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputTitle $isInputEmpty={!password}>Senha</InputTitle>
                    </Label>
                    <h4>{message}</h4>
                    <Button type="submit" id="loginBtn">
                        <MdLogin size={32} /> <div className="space" />
                        <div>Fazer login</div>
                        <div className="space" />
                    </Button>
                    <Link to="/Criar-conta">Criar uma nova conta</Link>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
