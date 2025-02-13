import {
    CurrentPageData,
    PagesActionButton,
    PaginationContainer,
} from './styles'

export default function Pagination() {
    return (
        <PaginationContainer>
            <CurrentPageData>Resultado 1 - 15 de 100</CurrentPageData>
            <PagesActionButton>{'<'}</PagesActionButton>
            <PagesActionButton>{'>'}</PagesActionButton>
        </PaginationContainer>
    )
}
