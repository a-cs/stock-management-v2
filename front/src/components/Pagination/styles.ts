import styled from 'styled-components'

export const PaginationContainer = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 5rem;
    display: flex;
    justify-content: center;

    @media (min-width: 701px) {
        margin-bottom: 1rem;
    }
`

export const CurrentPageData = styled.span`
    font-weight: 600;
    background-color: ${(props) => props.theme.whiteText};
    color: ${(props) => props.theme.lightGreen};
    padding: 0.25rem 0.75rem;
    display: flex;
    align-items: center;
    border: 3px solid ${(props) => props.theme.lighterGray};
    border-radius: 8px 0 0 8px;
`

export const PagesActionButton = styled.button`
    font-size: 1.25rem;
    font-weight: 700;
    background-color: ${(props) => props.theme.whiteText};
    color: ${(props) => props.theme.lightGreen};
    padding: 0.25rem 0.75rem;
    border: 3px solid ${(props) => props.theme.lighterGray};
    border-left: none;
    cursor: pointer;
    transition: 0.2s;

    &:last-of-type {
        border-radius: 0 8px 8px 0;
    }

    &:not(:disabled):hover {
        background-color: ${(props) => props.theme.lightGreen};
        color: ${(props) => props.theme.whiteText};
    }

    &:disabled {
        /* background-color: ${(props) => props.theme.disabledText}; */
        color: ${(props) => props.theme.disabledText};
        cursor: not-allowed;
    }
`
