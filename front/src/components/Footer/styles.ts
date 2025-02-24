import styled from 'styled-components'

export const FooterContainer = styled.footer`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.lighterGray};
    gap: 8px;
`

export const FooterText = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    @media (min-width: 600px) {
        font-size: 1.25rem;
    }
`

export const FooterLink = styled.a`
    color: ${(props) => props.theme.lightGreen};
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        color: ${(props) => props.theme.darkGreen};
    }
`
