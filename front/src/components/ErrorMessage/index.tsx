import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { ErrorContainer, Icon, Message } from './styles'

interface iErrorMessageProps {
    message: string
}

export default function ErrorMessage({ message }: iErrorMessageProps) {
    return (
        <ErrorContainer>
            <Icon>
                <AiOutlineExclamationCircle size={48} />
            </Icon>
            <Message>{message}</Message>
        </ErrorContainer>
    )
}
