import { Tweet } from '../types'

export const tweets: Tweet[] = [
    {
        id: '1',
        user: {
            id: 'u1',
            name: 'João Silva',
            username: 'joaosilva',
            avatar: 'https://i.pravatar.cc/150?img=1',
            isFollowing: false
        },
        content: 'Que dia lindo hoje! ☀️ #gratidão',
        createdAt: new Date(),
        comments: []
    },
    {
        id: '2',
        user: {
            id: 'u2',
            name: 'Maria Oliveira',
            username: 'mariaoliveira',
            avatar: 'https://i.pravatar.cc/150?img=2',
            isFollowing: false
        },
        content: 'Começando um novo projeto de programação! 🚀',
        createdAt: new Date(),
        comments: []
    },
    {
        id: '3',
        user: {
            id: 'u3',
            name: 'Carlos Souza',
            username: 'carlossouza',
            avatar: 'https://i.pravatar.cc/150?img=3',
            isFollowing: false
        },
        content: 'Alguém indica um bom filme para ver no fim de semana? 🎬',
        createdAt: new Date(),
        comments: []
    }
]
