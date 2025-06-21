import { CadastroSucesso } from './styles'

type Props = {
    userExist?: boolean
    cardout: boolean
    isSign?: boolean
}

const CredentialError = ({ cardout, userExist, isSign }: Props) => {
    if (isSign) {
        return (
            <CadastroSucesso $userExist $sucesso={cardout}>
                LOGIN OU SENHA INCORRETO
            </CadastroSucesso>
        )
    }

    return (
        <CadastroSucesso $userExist={userExist} $sucesso={cardout}>
            {userExist ? 'USUÁRIO JÁ CADASTRADO' : 'CADASTRO REALIZADO'}
        </CadastroSucesso>
    )
}

export default CredentialError
