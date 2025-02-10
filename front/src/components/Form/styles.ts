import styled from 'styled-components'

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
    align-items: center;
    padding: 2rem;
    border: 2px solid ${(props) => props.theme.green};
    border-radius: 16px;
`

export const Form = styled.form`
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    text-align: center;
    gap: 2.25rem;
`
