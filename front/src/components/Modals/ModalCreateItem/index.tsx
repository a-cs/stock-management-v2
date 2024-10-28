import { FiCheck, FiX } from 'react-icons/fi'
import ModalWithCloseOutside from '../ModalWithCloseOutside'
import { ModalFooter, ModalTitle } from '../ModalWithCloseOutside/style'
import Button from '../../Button'

interface iModalCreateItemProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export default function ModalCreateItem({
    isOpen,
    setIsOpen,
}: iModalCreateItemProps) {
    return (
        <ModalWithCloseOutside isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalTitle>Criar novo item</ModalTitle>
            <ModalFooter>
                <Button variant="accept" icon={<FiCheck size={32} />}>
                    Confirmar
                </Button>
                <Button variant="refuse" icon={<FiX size={32} />}>
                    Cancelar
                </Button>
            </ModalFooter>
        </ModalWithCloseOutside>
    )
}
