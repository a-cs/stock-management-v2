import { ReactNode } from 'react'
import { ButtonTitle, StyledButton } from './styles'

interface iButtonProps {
    variant: 'accept' | 'refuse'
    icon: ReactNode
    children: ReactNode
    type?: 'button' | 'submit'
    onClick?: () => void
    hideOnMobile?: boolean
}
export default function Button({
    variant,
    icon,
    children,
    type = 'button',
    hideOnMobile = false,
    onClick,
}: iButtonProps) {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            $variant={variant}
            $hideOnMobile={hideOnMobile}
        >
            {icon}
            <ButtonTitle>{children}</ButtonTitle>
        </StyledButton>
    )
}
