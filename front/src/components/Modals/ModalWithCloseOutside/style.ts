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
    height: 800;
    width: 600;
    max-height: 80vh;
    max-width: 86vw;
    color: '$gray900';
    display: flex;
    justify-content: center;
    align-items: center;
`
