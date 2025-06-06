import { useState } from 'react'
import { Button } from './styles'

interface FollowButtonProps {
    initialFollowState: boolean
    onFollowChange: (isFollowing: boolean) => void
}

export function FollowButton({
    initialFollowState,
    onFollowChange
}: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialFollowState)

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        onFollowChange(!isFollowing)
    }

    return (
        <Button $isFollowing={isFollowing} onClick={handleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    )
}
