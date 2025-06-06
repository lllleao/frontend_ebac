import { useEffect, useState } from 'react'
import TweetFeed from '../../container/TweetFeed'
import ProfileSummary from '../../container/ProfileSummary'
import { AppContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type ProfileData = {
    username: string
}

const HomePage = () => {
    const [followers, setFollowers] = useState(0)
    const [data, setData] = useState<ProfileData>()
    const navigate = useNavigate()

    const token = localStorage.getItem('access')

    const handleFollowChange = (_userId: string, isFollowing: boolean) => {
        setFollowers((prev) => prev + (isFollowing ? 1 : -1))
    }

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/user_data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setData(response.data)
                console.log(response.data, 'opa')
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
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        <AppContainer>
            <TweetFeed onFollowChange={handleFollowChange} />
            <ProfileSummary followers={followers} username={data?.username} />
        </AppContainer>
    )
}

export default HomePage
