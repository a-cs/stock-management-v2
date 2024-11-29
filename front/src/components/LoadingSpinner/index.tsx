import { LoadingContainer, LoadingImage, LoadingTitle } from './styles'
import loadingImg from '../../assets/loading1.gif'

export default function LoadingSpinner() {
    return (
        <LoadingContainer>
            <LoadingImage src={loadingImg} alt="loading" />
            <LoadingTitle>Loading...</LoadingTitle>
        </LoadingContainer>
    )
}
