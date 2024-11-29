import styled from 'styled-components'

export const LoadingContainer = styled.div`
    margin: auto 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`

export const LoadingImage = styled.img`
    margin-bottom: 2px;
    height: 60px;

    @media (min-width: 1000px) {
        height: 80px;
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
