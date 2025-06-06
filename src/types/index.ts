export interface User {
    id: string
    name: string
    username: string
    avatar: string
    isFollowing: boolean
}

export interface Comment {
    id: string
    user: User
    content: string
    createdAt: Date
}

export interface Tweet {
    id: string
    user: User
    content: string
    createdAt: Date
    comments: Comment[]
}
