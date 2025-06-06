import { useState } from 'react'
import { Tweet as TweetType } from '../../types'
import { Avatar } from '../Avatar'
import { FollowButton } from '../FollowButton'
import { CommentSection } from '../CommentSection'
import {
    ActionButton,
    Actions,
    Card,
    Content,
    Header,
    UserInfo
} from './styles'

interface TweetCardProps {
    tweet: TweetType
    onFollowChange: (userId: string, isFollowing: boolean) => void
    onLike: (tweetId: string) => void
    onComment: (tweetId: string, commentText: string) => void
}

export function TweetCard({
    tweet,
    onFollowChange,
    onLike,
    onComment
}: TweetCardProps) {
    const [likes, setLikes] = useState(0)

    const handleLike = () => {
        setLikes(likes + 1)
        onLike(tweet.id)
    }

    const handleAddComment = (text: string) => {
        onComment(tweet.id, text)
    }

    return (
        <Card>
            <Header>
                <UserInfo>
                    <Avatar src={tweet.user.avatar} alt={tweet.user.username} />
                    <div>
                        <strong>{tweet.user.name}</strong> @
                        {tweet.user.username}
                    </div>
                </UserInfo>
                <FollowButton
                    initialFollowState={tweet.user.isFollowing}
                    onFollowChange={(isFollowing) =>
                        onFollowChange(tweet.user.id, isFollowing)
                    }
                />
            </Header>

            <Content>{tweet.content}</Content>

            <Actions>
                <ActionButton onClick={handleLike}>❤️ {likes}</ActionButton>
            </Actions>

            <CommentSection
                comments={tweet.comments}
                onAddComment={handleAddComment}
            />
        </Card>
    )
}
