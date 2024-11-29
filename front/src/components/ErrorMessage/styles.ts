import styled from 'styled-components'

export const ErrorContainer = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 1rem 2rem;
    border: 2px solid ${(props) => props.theme.red};
    border-radius: 16px;
`

export const Icon = styled.div`
    color: ${(props) => props.theme.red};
`

export const Message = styled.p`
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 1rem;

    @media (min-width: 1000px) {
        font-size: 1.5rem;
    }
`
