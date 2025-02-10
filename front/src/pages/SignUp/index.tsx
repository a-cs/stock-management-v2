import { LoginContainer, StyledLink } from '../Login/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { FormContainer, FormTitle, Form } from '../../components/Form/styles'
import { FiUserPlus } from 'react-icons/fi'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // try {
        //     await signIn({
        //         email,
        //         password,
        //     })
        navigate('/')
        // } catch (error: any) {
        //     setMessage(error.response.data.message)
        // }
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
                        variant="accept"
                        type="submit"
                        icon={<FiUserPlus size={32} />}
                    >
                        Criar
                    </Button>
                    <StyledLink to="/login">Voltar ao login</StyledLink>
                </Form>
            </FormContainer>
        </LoginContainer>
    )
}
