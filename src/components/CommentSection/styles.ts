import { styled } from 'styled-components'

export const Section = styled.div`
    margin-top: 10px;
`

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
`

export const Button = styled.button`
    margin-top: 6px;
    padding: 6px 12px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        opacity: 0.9;
    }
`
