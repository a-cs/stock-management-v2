import styled from 'styled-components'

export const SwitchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 600px) {
        flex-direction: row;
    }
`

export const SwitchTitle = styled.label`
    font-weight: 700;
    font-size: 2rem;
    opacity: 0.67;
    color: ${(props) => props.theme.darkGray};
`
export const HiddenInput = styled.input`
    display: none;
`

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`
export const IconButton = styled.button<{ $type: boolean }>`
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0 0.4rem;
    border: 0;
    color: ${(props) => (props.$type ? props.theme.green : props.theme.red)};

    &:hover {
        cursor: pointer;
    }
`

export const SliderContainer = styled.div<{ $isChecked: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 80px;
    height: 32px;
    border-radius: 50px;
    position: relative;
    border: 2px solid
        ${(props) => (props.$isChecked ? props.theme.green : props.theme.red)};
    background-color: ${(props) =>
        props.$isChecked ? props.theme.lighterGreen : props.theme.lighterRed};
    transition: background-color 0.3s ease;
`
export const Slider = styled.span<{ $isChecked: boolean }>`
    position: absolute;
    cursor: pointer;
    border-radius: 16px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: left 0.3s ease;

    &:before {
        position: absolute;
        content: '';
        left: 4px;
        top: 2px;
        width: 24px;
        height: 24px;
        background-color: ${(props) =>
            props.$isChecked ? props.theme.green : props.theme.red};
        border-radius: 50%;
        transform: translateX(
            ${(props) => (props.$isChecked ? '44px' : '0px')}
        );
        transition: transform 0.3s ease;
    }
`
