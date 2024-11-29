import { InputTitle, Label, StyledInput } from './styles'

interface iInputProps {
    label: string
    type?: 'email' | 'password' | 'text' | 'number'
    value: string
    setValue: (value: string) => void
}

export default function Input({
    label,
    type = 'text',
    value,
    setValue,
}: iInputProps) {
    return (
        <Label htmlFor={label}>
            <StyledInput
                id={label}
                type={type}
                placeholder=" "
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min={type === 'number' ? 0 : ''}
                step={type === 'number' ? 0.001 : ''}
            />
            <InputTitle $isInputEmpty={!value}>{label}</InputTitle>
        </Label>
    )
}
