import { InputTitle, Label, StyledInput } from './styles'

interface iInputProps {
    label: string
    type?: 'email' | 'password' | 'text' | 'number'
    disabled?: boolean
    value: string
    setValue: (value: string) => void
}

export default function Input({
    label,
    type = 'text',
    disabled = false,
    value,
    setValue,
}: iInputProps) {
    return (
        <Label htmlFor={label}>
            <StyledInput
                id={label}
                type={type}
                disabled={disabled}
                placeholder=" "
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min={type === 'number' ? 0 : ''}
                step={type === 'number' ? 0.001 : ''}
            />
            <InputTitle $isDisabled={disabled} $isInputEmpty={!value}>
                {label}
            </InputTitle>
        </Label>
    )
}
