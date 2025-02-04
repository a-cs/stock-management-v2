import { FiCheck, FiX } from 'react-icons/fi'
import {
    SwitchTitle,
    HiddenInput,
    Slider,
    SwitchContainer,
    SliderContainer,
    IconButton,
    ButtonsContainer,
} from './style.ts'

interface iToogleSwitchProps {
    label: string
    value: boolean
    setValue: (value: boolean) => void
}

export default function ToggleSwitch({
    label,
    value,
    setValue,
}: iToogleSwitchProps) {
    function toogleInput() {
        setValue(!value)
    }
    return (
        <SwitchContainer>
            <SwitchTitle>{label}</SwitchTitle>
            <HiddenInput
                type="checkbox"
                checked={value}
                onChange={toogleInput}
            />
            <ButtonsContainer>
                <IconButton
                    $type={false}
                    type="button"
                    onClick={() => setValue(false)}
                >
                    <FiX size="32px" strokeWidth="5" />
                </IconButton>
                <SliderContainer $isChecked={value} onClick={toogleInput}>
                    <Slider $isChecked={value} />
                </SliderContainer>
                <IconButton
                    $type={true}
                    type="button"
                    onClick={() => setValue(true)}
                >
                    <FiCheck size="32px" strokeWidth="5" />
                </IconButton>
            </ButtonsContainer>
        </SwitchContainer>
    )
}
