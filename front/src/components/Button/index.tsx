import { ReactNode } from 'react'
import { ButtonTitle, StyledButton } from './styles'

interface iButtonProps {
    variant: 'accept' | 'refuse'
    icon: ReactNode
    children: ReactNode
    type?: 'button' | 'submit'
    onClick?: () => void
}
export default function Button({
    variant,
    icon,
    children,
    type = 'button',
    onClick,
}: iButtonProps) {
    return (
        <StyledButton type={type} onClick={onClick} $variant={variant}>
            {icon}
            <ButtonTitle>{children}</ButtonTitle>
        </StyledButton>
    )
}
