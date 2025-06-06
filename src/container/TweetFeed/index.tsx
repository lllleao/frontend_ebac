import { useEffect, useState } from 'react'
import { Tweet } from '../../types'
import { tweets as initialTweets } from '../../data/tweets'
import { TweetCard } from '../../components/TweetCard'
import { v4 as uuidv4 } from 'uuid'
import { FeedContainer, Input, NewTweetArea, PostButton } from './styles'
import api from '../../utils/reqs'
import { useNavigate } from 'react-router-dom'

const TweetFeed = ({
    onFollowChange
}: {
    onFollowChange: (userId: string, isFollowing: boolean) => void
}) => {
    const [tweets, setTweets] = useState<Tweet[]>(initialTweets)
    const [newTweet, setNewTweet] = useState('')

    const navigate = useNavigate()

    const handlePostTweet = () => {
        if (!newTweet.trim()) return

        const newTweetObj: Tweet = {
            id: uuidv4(),
            user: {
                id: 'current_user',
                name: 'Você',
                username: 'seuusuario',
                avatar: 'https://i.pravatar.cc/150?img=4',
                isFollowing: false
            },
            content: newTweet.trim(),
            createdAt: new Date(),
            comments: []
        }

        setTweets([newTweetObj, ...tweets])
        setNewTweet('')
        api.post('/posts/', {
            conteudo: 'Estou muito feliz'
        })
            .then((res) => {
                console.log(res.data)
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

    const handleLike = (tweetId: string) => {
        console.log('Liked tweet:', tweetId)
    }

    const handleComment = (tweetId: string, commentText: string) => {
        setTweets((prev) =>
            prev.map((tweet) =>
                tweet.id === tweetId
                    ? {
                          ...tweet,
                          comments: [
                              ...tweet.comments,
                              {
                                  id: uuidv4(),
                                  content: commentText,
                                  createdAt: new Date(),
                                  user: {
                                      id: 'current_user',
                                      name: 'Você',
                                      username: 'seuusuario',
                                      avatar: 'https://i.pravatar.cc/150?img=4',
                                      isFollowing: false
                                  }
                              }
                          ]
                      }
                    : tweet
            )
        )
    }

    useEffect(() => {
        api.get('/posts/')
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.error(
                    'Erro ao buscar dados do usuário:',
                    error.response?.data || error.message
                )

                if (error.response?.data.code === 'token_not_valid') {
                    navigate('/')
                }
            })
    }, [])

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

            {tweets.map((tweet) => (
                <TweetCard
                    key={tweet.id}
                    tweet={tweet}
                    onFollowChange={onFollowChange}
                    onLike={handleLike}
                    onComment={handleComment}
                />
            ))}
        </FeedContainer>
    )
}

export default TweetFeed
