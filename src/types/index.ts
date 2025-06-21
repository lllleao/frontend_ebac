export interface User {
    id: string
    name: string
    username: string
    avatar: string
    isFollowing: boolean
    bio: string
}

export interface Comment {
    id: string
    autor: User
    texto: string
    criado_em: Date
    post: number
}

export interface Author {
    username: string
    id: number
    avatar: string
    complet_name: string
}

export interface Post {
    id: number
    autor: Author
    conteudo: string
    comentarios: Comment[]
    criado_em: Date
}

// export interface ProfileData {
//     bio: string
//     username: string
//     followers: string
// }
