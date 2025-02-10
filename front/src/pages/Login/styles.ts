import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const LoginContainer = styled.div`
    width: 100%;
    min-height: 86vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const StyledLink = styled(Link)`
    font-size: 1.25rem;
    font-weight: 500;
    opacity: 0.7;
    transition: 0.2s;
    &:hover {
        color: ${(props) => props.theme.lightGreen};
    }
`
