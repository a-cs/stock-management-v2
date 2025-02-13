import {
    CurrentPageData,
    PagesActionButton,
    PaginationContainer,
} from './styles'

interface iPagination {
    currentPage: number
    pageSize: number
    totalCount: number
    decrementPageFunction: () => void
    incrementPageFunction: () => void
}

export default function Pagination({
    currentPage,
    pageSize,
    totalCount,
    decrementPageFunction,
    incrementPageFunction,
}: iPagination) {
    return (
        <PaginationContainer>
            <CurrentPageData>
                Resultado {(currentPage - 1) * pageSize + 1} -{' '}
                {currentPage * pageSize < totalCount
                    ? currentPage * pageSize
                    : totalCount}{' '}
                de {totalCount}
            </CurrentPageData>
            <PagesActionButton
                disabled={currentPage <= 1}
                onClick={decrementPageFunction}
            >
                {'<'}
            </PagesActionButton>
            <PagesActionButton
                disabled={currentPage * pageSize >= totalCount}
                onClick={incrementPageFunction}
            >
                {'>'}
            </PagesActionButton>
        </PaginationContainer>
    )
}
