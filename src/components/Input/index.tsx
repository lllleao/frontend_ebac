import { InputContainer } from './styles'

type InputProps = {
    valueInput: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    typeInput: string
    placeholderInput: string
    inputBorderColor: boolean
    isNeedSpace?: boolean
}
const Input = ({
    placeholderInput,
    setValue,
    typeInput,
    valueInput,
    inputBorderColor,
    isNeedSpace
}: InputProps) => {
    if (isNeedSpace) {
        return (
            <InputContainer
                type={typeInput}
                placeholder={placeholderInput}
                value={valueInput}
                onChange={(e) =>
                    setValue((e.target.value as string).replace(/\s+/g, ''))
                }
                $borderColor={inputBorderColor}
            />
        )
    }

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
