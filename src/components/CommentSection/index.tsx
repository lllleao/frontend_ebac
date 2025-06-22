import { useEffect, useState } from 'react'
import { Comment as CommentType } from '../../types'
import { Button, Input, Section } from './styles'
import axios from 'axios'
import Comment from '../Comment'
import { dateFormat } from '../../utils'

type CommentSectionProps = {
    post: number
    update?: boolean
    setUpdate?: (value: React.SetStateAction<boolean>) => void
    post_criado_em: Date
}

const CommentSection = ({
    post,
    setUpdate,
    update,
    post_criado_em
}: CommentSectionProps) => {
    const [newComment, setNewComment] = useState('')
    const token = localStorage.getItem('access')
    const [comments, setComments] = useState<CommentType[]>()
    const API_URL = import.meta.env.VITE_API_URL

    const handleSubmit = () => {
        if (newComment.trim()) {
            setNewComment('')
            axios
                .post(
                    `${API_URL}/api/comentarios/`,
                    {
                        texto: newComment,
                        post
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                .then(() => {
                    if (setUpdate) {
                        setUpdate(!update)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/api/comentarios/?post=${post}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setComments(res.data)
            })
            .catch((error) => {
                console.error(
                    'Erro ao buscar dados do usuário:',
                    error.response?.data || error.message
                )
            })
    }, [update])

    return (
        <Section>
            {comments &&
                comments.map((comment) => (
                    <Comment
                        setUpdate={setUpdate}
                        update={update}
                        key={comment.id}
                        comment={comment}
                    />
                ))}
            <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
            />
            <div className="date-button">
                <Button onClick={handleSubmit}>Comment</Button>
                <span>{dateFormat(post_criado_em)}</span>
            </div>
        </Section>
    )
}

export default CommentSection
