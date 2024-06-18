import { styled } from 'styled-components'

export const LoginContainer = styled.div`
    width: 100%;
    min-height: 86vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FormTitle = styled.div`
    margin: 0 0 2.25rem 0;
    display: inline-block;
    text-align: center;
    font-size: 2.5rem;
    color: ${(props) => props.theme.black};
`

export const FormContainer = styled.div`
    max-width: 94%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 2px solid ${(props) => props.theme.lighterGreen};
    border-radius: 16px;
`

export const Form = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    text-align: center;
`
export const Label = styled.label`
    width: 100%;
    max-width: 350px;
    position: relative;
    display: inline-block;
    margin-bottom: 2.25rem;
`

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    font-weight: 400;
    font-size: 1.5rem;
    height: 2.25rem;
    display: inline-block;
    border: 2px solid ${(props) => props.theme.lightGray};
    border-radius: 16px;
    box-shadow: none;

    &:focus-visible {
        outline: none;
        border-color: ${(props) => props.theme.darkBlue};
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

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: ${(props) => props.theme.whiteText};
    border-radius: 24px;
    font-size: 1.5rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.lightGreen};
    border: 2px solid ${(props) => props.theme.lightGreen};
    width: 100%;
    max-width: 350px;
    font-weight: 700;
    padding: 0.8rem 1.6rem;
    margin-bottom: 1.2rem;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.lighterGreen};
        border-color: ${(props) => props.theme.lighterGreen};
    }
`
