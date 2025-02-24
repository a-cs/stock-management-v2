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

export const LinkContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

export const StyledLink = styled(Link)`
    width: 100%;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 8px 0;
    opacity: 0.7;
    transition: 0.2s;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: 0.2s;
    &:hover {
        color: ${(props) => props.theme.lightGreen};
        border-color: ${(props) => props.theme.lightGreen};
    }
`
