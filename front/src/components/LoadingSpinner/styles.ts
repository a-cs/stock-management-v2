import styled from 'styled-components'

export const LoadingContainer = styled.div`
    margin: auto 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`

export const LoadingImage = styled.img`
    height: 100px;

    @media (min-width: 1000px) {
        height: 120px;
    }
`

export const LoadingTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.lightGreen};

    @media (min-width: 1000px) {
        font-size: 2rem;
    }
`
