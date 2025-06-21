import axios from 'axios'
import { Comment as CommentType } from '../../types'
import Avatar from '../Avatar'
import { CommentContainer, CommentContent, Username, Text } from './styles'

type CommentProps = {
    comment: CommentType
    update?: boolean
    setUpdate?: (value: React.SetStateAction<boolean>) => void
}

const Comment = ({ comment, setUpdate, update }: CommentProps) => {
    const token = localStorage.getItem('access')

    const handleDeleteComment = () => {
        axios
            .delete(`http://localhost:8000/api/comentarios/${comment.id}/`, {
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
            <span
                onClick={handleDeleteComment}
                className="material-symbols-outlined icon"
            >
                delete
            </span>
        </CommentContainer>
    )
}

export default Comment
