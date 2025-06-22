import axios from 'axios'
import { Comment as CommentType } from '../../types'
import Avatar from '../Avatar'
import { CommentContainer, CommentContent, Username, Text } from './styles'
import { useEffect, useState } from 'react'

type CommentProps = {
    comment: CommentType
    update?: boolean
    setUpdate?: (value: React.SetStateAction<boolean>) => void
}

const Comment = ({ comment, setUpdate, update }: CommentProps) => {
    const token = localStorage.getItem('access')
    const [isUser, setIsUser] = useState<boolean>()
    const API_URL = import.meta.env.VITE_API_URL

    const handleDeleteComment = () => {
        axios
            .delete(`${API_URL}/api/comentarios/${comment.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                if (setUpdate) {
                    setUpdate(!update)
                }
            })
            .catch((error) => {
                console.error(
                    'Erro ao buscar dados do usuário:',
                    error.response?.data || error.message
                )
            })
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/api/user_data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.data.username === comment.autor.username) {
                    setIsUser(true)
                } else {
                    setIsUser(false)
                }
            })
            .catch(() => {})
    }, [])

    return (
        <CommentContainer>
            <Avatar
                src={comment.autor.avatar}
                alt={comment.autor.username}
                size={30}
            />
            <CommentContent>
                <Username>@{comment.autor.username}</Username>
                <Text>{comment.texto}</Text>
            </CommentContent>
            {isUser ? (
                <span
                    onClick={handleDeleteComment}
                    className="material-symbols-outlined icon"
                >
                    delete
                </span>
            ) : (
                <div />
            )}
        </CommentContainer>
    )
}

export default Comment
