import { styled } from 'styled-components'

export const InputContainer = styled.input<{ $borderColor: boolean }>`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;

    border-color: ${({ $borderColor }) => ($borderColor ? 'red' : '#ccc')};

    &:focus {
        border-color: #1da1f2;
    }
`
