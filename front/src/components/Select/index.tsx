import { ReactNode } from 'react'
import { Label } from '../Input/styles'
import { SelectTitle, StyledSelect } from './styles'

interface iInputProps {
    label: string
    value: string
    setValue: (value: any) => void
    children: ReactNode
}

export default function Select({
    label,
    value,
    setValue,
    children,
}: iInputProps) {
    return (
        <Label htmlFor={label}>
            <StyledSelect
                id={label}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {children}
            </StyledSelect>
            <SelectTitle $isInputEmpty={!value}>{label}</SelectTitle>
        </Label>
    )
}
