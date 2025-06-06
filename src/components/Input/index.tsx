import { InputContainer } from './styles'
type Props = {
    valueInput: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    typeInput: string
    placeholderInput: string
    inputBorderColor: boolean
}
const Input = ({
    placeholderInput,
    setValue,
    typeInput,
    valueInput,
    inputBorderColor
}: Props) => {
    return (
        <InputContainer
            type={typeInput}
            placeholder={placeholderInput}
            value={valueInput}
            onChange={(e) => setValue(e.target.value)}
            $borderColor={inputBorderColor}
        />
    )
}

export default Input
