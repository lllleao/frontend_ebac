import { styled } from 'styled-components'

type CardCadastro = {
    $sucesso: boolean
    $userExist?: boolean
}

export const CadastroSucesso = styled.div<CardCadastro>`
    background-color: ${({ $userExist }) => ($userExist ? '#bd3232' : 'green')};
    padding: 1rem;
    color: #eee;
    font-family: sans-serif;
    border-radius: 0.3rem;
    transition: opacity 0.5s;
    opacity: ${({ $sucesso }) => ($sucesso ? 1 : 0)};
`
