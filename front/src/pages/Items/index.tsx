import { FiPlus } from 'react-icons/fi'
import {
    ButtonContainer,
    Button,
    PageContent,
    PageHeader,
    PageTitle,
} from './styles'

export default function Items() {
    return (
        <PageContent>
            <PageHeader>
                <PageTitle>Estoque</PageTitle>
                <ButtonContainer>
                    <Button>
                        <FiPlus />
                        Criar novo item
                    </Button>
                </ButtonContainer>
            </PageHeader>
        </PageContent>
    )
}
