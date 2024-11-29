import SpinnerSVG from '../../assets/tube-spinner.svg'

interface iIconProps {
    size: number
}

export default function SpinnerIcon({ size }: iIconProps) {
    return <img width={size} src={SpinnerSVG} alt="loading" />
}
