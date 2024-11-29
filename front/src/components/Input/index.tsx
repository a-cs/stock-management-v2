import { InputTitle, Label, StyledInput } from './styles'

interface iInputProps {
    label: string
    type?: 'email' | 'password' | 'text'
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
            />
            <InputTitle $isInputEmpty={!value}>{label}</InputTitle>
        </Label>
    )
}
