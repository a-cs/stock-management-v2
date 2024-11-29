import { styled } from 'styled-components'

export const PageContent = styled.div`
    flex: 1 1;
    width: 100%;
    margin: auto;
    max-width: 1110px;
    padding: 2rem 1rem;
    height: 100%;
`

export const PageHeader = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
`

export const PageTitle = styled.h2`
    align-self: center;
    font-size: 2.5rem;
    font-weight: 900;
    font-family: 'Roboto';
    color: ${(props) => props.theme.lightGreen};
`

export const ButtonContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const BaseButton = styled.button`
    background-color: ${(props) => props.theme.lightGreen};
    color: ${(props) => props.theme.whiteText};
    border-radius: 24px;
    padding: 0.5rem 1rem;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.green};
    }
`

export const ButtonMobile = styled(BaseButton)`
    border: none;
    display: flex;
    align-items: center;
    border-radius: 50%;
    padding: 1rem 1.25rem;
    font-weight: 700;
    font-size: 1.5rem;
    position: fixed;
    z-index: 1;
    bottom: 1rem;
    right: 1rem;

    @media (min-width: 1000px) {
        display: none;
    }
`

export const IconContainer = styled.div<{ $isGreen: boolean }>`
    color: ${(props) =>
        props.$isGreen ? props.theme.lightGreen : props.theme.red};
`
