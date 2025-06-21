import { useEffect, useState } from 'react'
import * as S from './styles'
import Input from '../../components/Input'
import { sanitizeInput, validatePassword } from '../../utils'
import { PassWordError } from '../SignUp/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CredentialError from '../../components/CredentialError'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailEmpty, setEmailEmpty] = useState(false)
    const [passwordEmpty, setPasswordEmpty] = useState(false)

    const [cardout, setCardOut] = useState(false)

    const navigate = useNavigate()

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        const sanitizedEmail = sanitizeInput(email)
        const sanitizedPassword = sanitizeInput(password)

        if (sanitizedEmail.length === 0) {
            setEmailEmpty(true)
        } else {
            setEmailEmpty(false)
        }

        if (!validatePassword(sanitizedPassword)) {
            setPasswordEmpty(true)
            return ''
        } else {
            setPasswordEmpty(false)
        }

        if (
            sanitizedEmail.length !== 0 &&
            validatePassword(sanitizedPassword)
        ) {
            axios
                .post('http://127.0.0.1:8000/api/login', {
                    email: sanitizedEmail,
                    password: sanitizedPassword
                })
                .then(() => {
                    axios
                        .post('http://127.0.0.1:8000/api/token/', {
                            email: sanitizedEmail,
                            password: sanitizedPassword
                        })
                        .then((res) => {
                            localStorage.setItem('access', res.data.access)
                            localStorage.setItem('refresh', res.data.refresh)
                        })
                        .then(() => {
                            navigate('home')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err, 'não logou')
                    setCardOut(true)
                })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://127.0.0.1:8000/api/user_data').catch((error) => {
                console.error(
                    'Erro ao buscar dados do usuário:',
                    error.response?.data || error.message
                )
                if (error.response?.data.code === 'token_not_valid') {
                    localStorage.removeItem('access')
                    localStorage.removeItem('refresh')
                }
            })
        }, 2000)
    }, [])

    return (
        <S.Container>
            <S.Card>
                <S.Title>Login</S.Title>
                <form onSubmit={handleLogin}>
                    <Input
                        typeInput="email"
                        placeholderInput="Email"
                        valueInput={email}
                        setValue={setEmail}
                        inputBorderColor={emailEmpty}
                    />
                    <Input
                        typeInput="password"
                        placeholderInput="Password"
                        valueInput={password}
                        setValue={setPassword}
                        inputBorderColor={passwordEmpty}
                    />
                    {passwordEmpty ? (
                        <PassWordError>
                            A senha deve ter pelo menos 8 caracteres, misturando
                            pelo menos números e letras, e não pode ser uma
                            sequência numérica ou alfabética.
                        </PassWordError>
                    ) : (
                        ''
                    )}
                    <S.Button type="submit">Log in</S.Button>
                </form>
                <S.SignUpLink>
                    Não tem uma conta? <a href="/signup">Sign up</a>
                </S.SignUpLink>
            </S.Card>
            <CredentialError isSign cardout={cardout} />
        </S.Container>
    )
}

export default Login
