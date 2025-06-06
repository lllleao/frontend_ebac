import { useEffect, useState, useRef } from 'react'
import {
    Avatar,
    BioInput,
    Button,
    ButtonDisplay,
    Container,
    Info,
    Section,
    Title
} from './styles'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/reqs'

type ProfileSummaryProps = {
    followers: number
    username: string | undefined
}

const ProfileSummary = ({ followers, username }: ProfileSummaryProps) => {
    const [bio, setBio] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [bioBefore, setBioBefore] = useState('')
    const navigate = useNavigate()
    const refImage = useRef<HTMLInputElement>(null)

    const [mediaUrl, setMediaUrl] = useState('')

    const refresh = localStorage.getItem('refresh')

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        if (!(bioBefore === bio)) {
            console.log(bioBefore, bio)
            api.patch('/update_bio/', { bio })
                .then(() => {
                    // console.log(res.data.bio)
                    setBioBefore(bio)
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response?.data.code === 'token_not_valid') {
                        navigate('/')
                    }
                })
        }
        setIsEditing(false)
    }

    const handleLogout = () => {
        api.post('/logout/', { refresh })
            .then((res) => {
                console.log(res.data)
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                if (error.response?.data.code === 'token_not_valid') {
                    navigate('/')
                }
            })
    }

    const handleClickInput = () => {
        if (refImage.current) {
            refImage.current.click()
        }
    }
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp'
            ]

            if (!allowedTypes.includes(file.type)) {
                alert(
                    'Tipo de arquivo não permitido. Selecione uma imagem JPG, PNG, GIF ou WEBP.'
                )
                return
            }
            const formData = new FormData()
            formData.append('avatar', file)
            api.patch('/avatar/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res)
                    setMediaUrl(res.data.avatar_url)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            api.get('/user_data')
                .then((response) => {
                    console.log(response.data)
                    setBio(response.data.bio)
                    setBioBefore(response.data.bio)
                })
                .catch((error) => {
                    console.error(
                        'Erro ao buscar dados do usuário:',
                        error.response?.data || error.message
                    )
                    if (error.response?.data.code === 'token_not_valid') {
                        localStorage.removeItem('access')
                        localStorage.removeItem('refresh')
                        navigate('/')
                    }
                })
        }, 2000)

        api.get('/avatar/')
            .then((res) => {
                console.log(res)
                setMediaUrl(res.data.avatar_url)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [bio])

    return (
        <Container>
            <Section>
                <Avatar $backgound={mediaUrl}>
                    {/* <img src={mediaUrl} alt="" /> */}
                </Avatar>
                <ButtonDisplay>
                    <input
                        ref={refImage}
                        style={{ display: 'none' }}
                        type="file"
                        onChange={handleChangeImage}
                    />
                    <button type="button" onClick={handleClickInput}>
                        Mudar Foto
                    </button>
                </ButtonDisplay>
                <Title>Seu Perfil</Title>
                <Info>Usuário: @{username}</Info>
                <Info>Seguidores: {followers}</Info>
                <Info>Bio:</Info>

                {isEditing ? (
                    <>
                        <BioInput
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                        />
                        <Button onClick={handleSaveClick}>Salvar</Button>
                    </>
                ) : (
                    <>
                        <Info>{bio}</Info>
                        <Button onClick={handleEditClick}>Editar Bio</Button>
                    </>
                )}
                <br />
                <Button onClick={handleLogout}>Logout</Button>
            </Section>
        </Container>
    )
}

export default ProfileSummary
