import styled from 'styled-components'

export const StyledButton = styled.button<{
    $variant: 'accept' | 'refuse'
    $hideOnMobile: boolean
}>`
    width: 300px;
    display: ${(props) => (props.$hideOnMobile ? 'none' : 'flex')};
    @media (min-width: 1000px) {
        display: flex;
    }
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: ${(props) =>
        props.$variant === 'accept' ? props.theme.lightGreen : '#f0f0f5'};
    color: ${(props) =>
        props.$variant === 'accept' ? props.theme.whiteText : props.theme.red};
    border: 2px solid;
    border-color: ${(props) =>
        props.$variant === 'accept' ? props.theme.lightGreen : props.theme.red};
    border-radius: 24px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) =>
            props.$variant === 'accept'
                ? props.theme.lighterGreen
                : props.theme.red};
        color: ${(props) => props.theme.whiteText};
    }
`

export const ButtonTitle = styled.b`
    width: 100%;
    text-align: center;
`
