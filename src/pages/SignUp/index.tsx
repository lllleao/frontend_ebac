import { useState } from 'react'
import * as S from './styles'
import Input from '../../components/Input'
import { sanitizeInput, validatePassword } from '../../utils'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CredentialError from '../../components/CredentialError'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [completName, setCompletName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [emailEmpty, setEmailEmpty] = useState(false)
    const [completNameEmpty, setCompletNameEmpty] = useState(false)
    const [usernameEmpty, setUsernameEmpty] = useState(false)
    const [passwordEmpty, setPasswordEmpty] = useState(false)

    const [passwordError, setPasswordError] = useState(false)

    const [cardout, setCardOut] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const sanitizedEmail = sanitizeInput(email).toLowerCase()
        const sanitizedPassword = sanitizeInput(password)
        const sanitizedName = sanitizeInput(username).toLowerCase()
        const sanitizedCompletName = sanitizeInput(completName)

        if (sanitizedEmail.length === 0) {
            setEmailEmpty(true)
        } else {
            setEmailEmpty(false)
        }

        if (sanitizedName.length === 0) {
            setUsernameEmpty(true)
        } else {
            setUsernameEmpty(false)
        }

        if (sanitizedCompletName.length === 0) {
            setCompletNameEmpty(true)
        } else {
            setCompletNameEmpty(false)
        }

        if (!validatePassword(sanitizedPassword)) {
            setPasswordError(true)
            setPasswordEmpty(true)
            console.log('error')
            return ''
        } else {
            setPasswordError(false)
            setPasswordEmpty(false)
        }

        if (
            sanitizedEmail.length !== 0 &&
            sanitizedName.length !== 0 &&
            validatePassword(sanitizedPassword)
        ) {
            setCardOut(true)
            axios
                .post(`${API_URL}/api/users/`, {
                    username: sanitizedName,
                    email: sanitizedEmail,
                    password: sanitizedPassword,
                    complet_name: sanitizedCompletName
                })
                .then(() => {
                    setUserExist(false)

                    setTimeout(() => {
                        navigate('/')
                        setCardOut(false)
                    }, 1500)
                })
                .catch((err) => {
                    console.log(err.response.data.email)
                    if (err.response.data.email) {
                        if (
                            err.response.data.email[0] ===
                                'usuario with this email already exists.' ||
                            err.response.data.username[0] ===
                                'usuario with this username already exists.'
                        ) {
                            console.log('usuário já existe')
                            setUserExist(true)
                        }
                    } else if (err.response.data.username) {
                        setUserExist(true)
                    }
                })
        }
    }

    return (
        <S.Container>
            <S.Card>
                <S.Title>Create Account</S.Title>
                <form onSubmit={handleSubmit}>
                    <Input
                        typeInput="email"
                        placeholderInput="Email"
                        valueInput={email}
                        setValue={setEmail}
                        inputBorderColor={emailEmpty}
                        isNeedSpace
                    />
                    <Input
                        typeInput="text"
                        placeholderInput="Username"
                        valueInput={username}
                        setValue={setUsername}
                        inputBorderColor={usernameEmpty}
                        isNeedSpace
                    />
                    <Input
                        typeInput="text"
                        placeholderInput="Nome Completo"
                        valueInput={completName}
                        setValue={setCompletName}
                        inputBorderColor={completNameEmpty}
                    />
                    <Input
                        typeInput="password"
                        placeholderInput="Password"
                        valueInput={password}
                        setValue={setPassword}
                        inputBorderColor={passwordEmpty}
                    />
                    {passwordError ? (
                        <S.PassWordError>
                            A senha deve ter pelo menos 8 caracteres, misturando
                            pelo menos números e letras, e não pode ser uma
                            sequência numérica ou alfabética.
                        </S.PassWordError>
                    ) : (
                        ''
                    )}
                    <S.Button type="submit">Sign Up</S.Button>
                </form>
                <S.SignInLink>
                    Já tem uma conta? <a href="/">Log in</a>
                </S.SignInLink>
            </S.Card>
            <CredentialError cardout={cardout} userExist={userExist} />
        </S.Container>
    )
}

export default SignUp
