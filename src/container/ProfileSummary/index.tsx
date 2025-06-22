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
import { User } from '../../types'
import axios from 'axios'

type ProfileSummaryProps = {
    followers: number
    setUpdatePost: (value: React.SetStateAction<boolean>) => void
    updatePost: boolean
}

const ProfileSummary = ({
    followers,
    setUpdatePost,
    updatePost
}: ProfileSummaryProps) => {
    const token = localStorage.getItem('access')

    const [bio, setBio] = useState('')
    const [data, setData] = useState<User>()
    const [isEditing, setIsEditing] = useState(false)
    const [bioBefore, setBioBefore] = useState('')
    const navigate = useNavigate()
    const refImage = useRef<HTMLInputElement>(null)
    const API_URL = import.meta.env.VITE_API_URL

    const [mediaUrl, setMediaUrl] = useState('')

    const refresh = localStorage.getItem('refresh')

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        if (!(bioBefore === bio)) {
            console.log(bioBefore, bio)
            axios
                .patch(
                    `${API_URL}/api/update_bio/`,
                    { bio },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                .then(() => {
                    setBioBefore(bio as string)
                })
                .catch((error) => {
                    console.log(error, 'erro da bio')
                    if (error.response?.data.code === 'token_not_valid') {
                        navigate('/')
                    }
                })
        }
        setIsEditing(false)
    }

    const handleLogout = () => {
        axios
            .post(
                `${API_URL}/api/logout/`,
                { refresh },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(() => {
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
            const formData = new FormData()
            formData.append('avatar', file)
            axios
                .patch(`${API_URL}/api/avatar/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setMediaUrl(res.data.avatar_url)
                    setUpdatePost(!updatePost)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`${API_URL}/api/user_data`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setData(response.data)
                    setBio(response.data.bio)
                })
                .catch((error) => {
                    console.error(
                        'Erro ao buscar dados do usuário:',
                        error.response?.data || error.message
                    )
                    if (error.response?.data.code === 'token_not_valid') {
                        navigate('/')
                    }
                })

            axios
                .get(`${API_URL}/api/avatar/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setMediaUrl(res.data.avatar_url)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 2000)
    }, [])

    return (
        <Container>
            <Section>
                <Avatar $backgound={mediaUrl} />
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
                <Info>Usuário: @{data?.username}</Info>
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
