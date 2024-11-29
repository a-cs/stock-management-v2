import { ReactNode } from 'react'
import { ButtonTitle, StyledButton } from './styles'

interface iButtonProps {
    variant: 'accept' | 'refuse'
    icon: ReactNode
    children: ReactNode
    type?: 'button' | 'submit'
    onClick?: () => void
    hideOnMobile?: boolean
    disabled?: boolean
}
export default function Button({
    variant,
    icon,
    children,
    type = 'button',
    hideOnMobile = false,
    onClick,
    disabled = false,
}: iButtonProps) {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            $variant={variant}
            $hideOnMobile={hideOnMobile}
            disabled={disabled}
        >
            {icon}
            <ButtonTitle>{children}</ButtonTitle>
        </StyledButton>
    )
}
