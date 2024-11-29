import { LoadingContainer, LoadingImage, LoadingTitle } from './styles'
import loadingImg from '../../assets/spinning-dots.svg'

export default function LoadingSpinner() {
    return (
        <LoadingContainer>
            <LoadingImage src={loadingImg} alt="loading" />
            <LoadingTitle>Loading...</LoadingTitle>
        </LoadingContainer>
    )
}
