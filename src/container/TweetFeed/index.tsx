import { useEffect, useState } from 'react'
import { Post } from '../../types'
import { FeedContainer, Input, NewTweetArea, PostButton } from './styles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import parseJwt from '../../utils/parseJWT'
import TweetCard from '../../components/TweetCard'

type Props = {
    onFollowChange: (userId: string, isFollowing: boolean) => void
    updatePost: boolean
}

const TweetFeed = ({ onFollowChange, updatePost }: Props) => {
    const [newTweet, setNewTweet] = useState('')
    const token = localStorage.getItem('access')
    const [update, setUpdate] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL

    const [posts, setPosts] = useState<Post[]>()
    const [postsOtherUsers, setPostsOtherUsers] = useState<Post[]>()

    const navigate = useNavigate()

    const handlePostTweet = () => {
        if (!newTweet.trim()) return
        axios
            .post(
                `${API_URL}/api/posts/`,
                {
                    conteudo: newTweet
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                setUpdate(!update)
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
    }

    useEffect(() => {
        const payload = parseJwt(token)

        axios
            .get(`${API_URL}/api/posts/?user_id=${payload.user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setPosts(res.data)
                setNewTweet('')
            })
            .catch((err) => {
                console.log(err)
            })

        axios
            .get(`${API_URL}/api/posts/?exclude_user=me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setPostsOtherUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [update, updatePost])

    return (
        <FeedContainer>
            <NewTweetArea>
                <Input
                    placeholder="What's happening?"
                    value={newTweet}
                    onChange={(e) => setNewTweet(e.target.value)}
                />
                <PostButton onClick={handlePostTweet}>Tweet</PostButton>
            </NewTweetArea>
            {posts &&
                posts.map((post) => (
                    <TweetCard
                        key={post.id}
                        tweet={post}
                        onFollowChange={onFollowChange}
                        setUpdate={setUpdate}
                        update={update}
                        isUser
                    />
                ))}
            {postsOtherUsers &&
                postsOtherUsers.map((post) => (
                    <TweetCard
                        key={post.id}
                        tweet={post}
                        onFollowChange={onFollowChange}
                        setUpdate={setUpdate}
                        update={update}
                    />
                ))}
        </FeedContainer>
    )
}

export default TweetFeed
