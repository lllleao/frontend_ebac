import { useState } from 'react'
import { Post } from '../../types'
import Avatar from '../Avatar'
import FollowButton from '../FollowButton'
import {
    ActionButton,
    Actions,
    Card,
    Content,
    DeleteIcon,
    Header,
    UserInfo
} from './styles'
import axios from 'axios'
import CommentSection from '../CommentSection'

type TweetCardProps = {
    tweet: Post
    onFollowChange?: (userId: string, isFollowing: boolean) => void
    isUser?: boolean
    update?: boolean
    setUpdate?: (value: React.SetStateAction<boolean>) => void
}

const TweetCard = ({
    tweet,
    onFollowChange,
    isUser,
    setUpdate,
    update
}: TweetCardProps) => {
    const [likes, setLikes] = useState(0)
    const token = localStorage.getItem('access')
    const API_URL = import.meta.env.VITE_API_URL

    const handleLike = () => {
        if (likes === 0) {
            setLikes(1)
        } else {
            setLikes(0)
        }
    }

    const handleDeletePost = () => {
        axios
            .delete(`${API_URL}/api/posts/${tweet.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                if (setUpdate) {
                    setUpdate(!update)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (isUser) {
        return (
            <Card>
                <Header>
                    <UserInfo>
                        <Avatar
                            src={tweet.autor.avatar}
                            alt={tweet.autor.username}
                        />
                        <div>
                            <strong>{tweet.autor.complet_name}</strong> @
                            {tweet.autor.username}
                        </div>
                    </UserInfo>
                    <DeleteIcon onClick={handleDeletePost}>X</DeleteIcon>
                </Header>

                <Content>{tweet.conteudo}</Content>

                <Actions>
                    <ActionButton onClick={handleLike}>❤️ {likes}</ActionButton>
                </Actions>

                <CommentSection
                    post={tweet.id}
                    setUpdate={setUpdate}
                    update={update}
                    post_criado_em={tweet.criado_em}
                />
            </Card>
        )
    }

    return (
        <Card>
            <Header>
                <UserInfo>
                    <Avatar
                        src={tweet.autor.avatar}
                        alt={tweet.autor.username}
                    />
                    <div>
                        <strong>{tweet.autor.complet_name}</strong> @
                        {tweet.autor.username}
                    </div>
                </UserInfo>
                <FollowButton
                    initialFollowState={false}
                    onFollowChange={(isFollowing) => {
                        if (onFollowChange) {
                            onFollowChange(String(tweet.autor.id), isFollowing)
                        }
                    }}
                />
            </Header>

            <Content>{tweet.conteudo}</Content>

            <Actions>
                <ActionButton onClick={handleLike}>❤️ {likes}</ActionButton>
            </Actions>

            <CommentSection
                setUpdate={setUpdate}
                update={update}
                post={tweet.id}
                post_criado_em={tweet.criado_em}
            />
        </Card>
    )
}

export default TweetCard
