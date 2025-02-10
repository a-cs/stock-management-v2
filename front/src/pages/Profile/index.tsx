import { useEffect, useState } from 'react'
import { Form } from '../../components/Form/styles'
import Input from '../../components/Input'
import { PageContent, PageHeader, PageTitle } from '../defaultStyles/styles'
import api from '../../services/api'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import ErrorMessage from '../../components/ErrorMessage'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ProfileContainer } from './styles'
import Button from '../../components/Button'
import { MdLogin } from 'react-icons/md'

export default function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    async function getMyUser() {
        setLoading(true)
        api.get('/users/me')
            .then((response) => {
                setErrorMsg('')
                setLoading(false)
                setName(response.data.name)
                setEmail(response.data.email)
            })
            .catch((error) => {
                console.log('error:', error)
                error.message = 'Não foi possivel carregar os dados do perfil.'
                ErrorHandler(error)
                setLoading(false)
                setErrorMsg(error.message)
            })
    }

    useEffect(() => {
        getMyUser()
    }, [])

    return (
        <PageContent>
            <PageHeader>
                <PageTitle>Perfil</PageTitle>
            </PageHeader>
            <ProfileContainer>
                {errorMsg ? (
                    <ErrorMessage message={errorMsg} />
                ) : loading ? (
                    <LoadingSpinner />
                ) : (
                    <Form>
                        <Input
                            label="Nome"
                            value={name}
                            setValue={setName}
                            disabled
                        />
                        <Input
                            label="Email"
                            value={email}
                            setValue={setEmail}
                            disabled
                        />
                        <Button
                            variant="accept"
                            type="button"
                            icon={<MdLogin size={32} />}
                        >
                            Alterar senha
                        </Button>
                    </Form>
                )}
            </ProfileContainer>
        </PageContent>
    )
}
