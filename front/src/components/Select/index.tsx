import { useRef, useState } from 'react'
import { Label } from '../Input/styles'
import { SelectTitle, Spacer, StyledSelect } from './styles'

interface iSelectOption {
    value: string | number
    label: string
}

interface iInputProps {
    label: string
    value: string
    setValue: (value: any) => void
    options: iSelectOption[]
    zIndex?: number
}

export default function Select({
    label,
    value,
    setValue,
    zIndex = 1,
    options,
}: iInputProps) {
    const [size, setSize] = useState<number | undefined>()
    const ref = useRef(null)
    return (
        <>
            <Label htmlFor={label}>
                <StyledSelect
                    ref={ref}
                    id={label}
                    required
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        e.currentTarget.blur()
                    }}
                    onFocus={() =>
                        setSize(options.length > 5 ? 5 : options.length)
                    }
                    onBlur={() => setSize(undefined)}
                    $zIndex={zIndex}
                    size={size}
                >
                    {options.map((option: iSelectOption) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </StyledSelect>
                <SelectTitle $isInputEmpty={!value}>{label}</SelectTitle>
            </Label>
            <Spacer />
        </>
    )
}
