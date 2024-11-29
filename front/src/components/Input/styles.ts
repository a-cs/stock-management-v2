import styled from 'styled-components'

export const Label = styled.label`
    width: 100%;
    max-width: 350px;
    position: relative;
    display: inline-block;
`

export const StyledInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    font-weight: 400;
    font-size: 1.5rem;
    height: 2.25rem;
    display: inline-block;
    border: 2px solid ${(props) => props.theme.lighterGreen};
    border-radius: 16px;
    box-shadow: none;

    &:focus-visible {
        outline: none;
        border-color: ${(props) => props.theme.darkGray};
    }
`

export const InputTitle = styled.span<{ $isInputEmpty: boolean }>`
    position: absolute;
    font-weight: ${(props) => (props.$isInputEmpty ? 400 : 700)};
    font-size: ${(props) => (props.$isInputEmpty ? '1.5rem' : '1.25rem')};
    pointer-events: none;
    left: 12px;
    top: ${(props) => (props.$isInputEmpty ? '4px' : '-28px')};
    transition: 0.2s;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    opacity: ${(props) => (props.$isInputEmpty ? '0.5' : '0.67')};
    color: ${(props) =>
        props.$isInputEmpty ? props.theme.darkBlue : props.theme.darkGray};
`
