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
    border: 2px solid ${(props) => props.theme.green};
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
    gap: 2.25rem;
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
    padding: 0.5rem 1rem;
    margin-bottom: 0.75rem;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.green};
        border-color: ${(props) => props.theme.green};
    }
`
