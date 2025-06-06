import { useState } from 'react'
import { Comment as CommentType } from '../../types'
import { Comment } from '../Comment'
import { Button, Input, Section } from './styles'

interface CommentSectionProps {
    comments: CommentType[]
    onAddComment: (text: string) => void
}

export function CommentSection({
    comments,
    onAddComment
}: CommentSectionProps) {
    const [newComment, setNewComment] = useState('')

    const handleSubmit = () => {
        if (newComment.trim()) {
            onAddComment(newComment.trim())
            setNewComment('')
        }
    }

    return (
        <Section>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
            <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
            />
            <Button onClick={handleSubmit}>Comment</Button>
        </Section>
    )
}
