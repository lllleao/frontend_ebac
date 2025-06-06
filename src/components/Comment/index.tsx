import { Comment as CommentType } from '../../types'
import { Avatar } from '../Avatar'
import { CommentContainer, CommentContent, Username, Text } from './styles'

interface CommentProps {
    comment: CommentType
}

export function Comment({ comment }: CommentProps) {
    return (
        <CommentContainer>
            <Avatar
                src={comment.user.avatar}
                alt={comment.user.username}
                size={30}
            />
            <CommentContent>
                <Username>@{comment.user.username}</Username>
                <Text>{comment.content}</Text>
            </CommentContent>
        </CommentContainer>
    )
}
