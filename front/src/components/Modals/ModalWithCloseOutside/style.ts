import { styled } from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    width: 100vw;
    background-color: rgba(200, 200, 200, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalContent = styled.div`
    background-color: #f0f0f5;
    padding: 1rem;
    border-radius: 16;
    height: 800px;
    width: 600px;
    max-height: 80vh;
    max-width: 86vw;
    color: '$gray900';
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 4px solid ${(props) => props.theme.green};
    border-radius: 16px;
    box-shadow: 4px 4px 12px 6px #8d8d8d;
`

export const ModalTitle = styled.h4`
    text-align: center;
    font-size: 2rem;
    color: ${(props) => props.theme.black};
`

export const ModalFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
`
