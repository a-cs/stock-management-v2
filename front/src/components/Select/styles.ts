import styled from 'styled-components'

export const StyledSelect = styled.select<{ $zIndex: number }>`
    top: 0;
    left: 0;
    width: 100%;
    padding: 0rem 0.75rem;
    font-weight: 400;
    font-size: 1.5rem;
    min-height: 2.5rem;
    max-height: 8rem;
    z-index: ${(props) => props.$zIndex};
    display: inline-block;
    position: absolute;
    border: 2px solid ${(props) => props.theme.lighterGreen};
    border-radius: 16px;
    box-shadow: none;

    &:focus-visible {
        outline: none;
        border-color: ${(props) => props.theme.darkGray};
    }
`

export const SelectTitle = styled.span<{ $isInputEmpty: boolean }>`
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

export const Spacer = styled.div`
    /* margin-bottom: 1px; */
`
