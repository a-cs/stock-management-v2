import { styled } from 'styled-components'

export const PageContent = styled.div`
    flex: 1 1;
    width: 100%;
    margin: auto;
    max-width: 1110px;
    padding: 2rem 1rem;
    height: 100%;
`

export const PageHeader = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
`

export const PageTitle = styled.h2`
    align-self: center;
    font-size: 2.5rem;
    font-weight: 900;
    font-family: 'Roboto';
    color: ${(props) => props.theme.lightGreen};
`

export const ButtonContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

export const Button = styled.button`
    background-color: ${(props) => props.theme.lightGreen};
    color: ${(props) => props.theme.whiteText};
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    padding: 0.5rem 1rem;
    display: none;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.lighterGreen};
    }

    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 12px;
    }
`
