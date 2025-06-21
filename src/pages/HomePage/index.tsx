import { useState } from 'react'
import TweetFeed from '../../container/TweetFeed'
import ProfileSummary from '../../container/ProfileSummary'
import { AppContainer } from './styles'

const HomePage = () => {
    const [followers, setFollowers] = useState(0)
    const [updatePost, setUpdatePost] = useState(false)

    const handleFollowChange = (_userId: string, isFollowing: boolean) => {
        setFollowers((prev) => prev + (isFollowing ? 1 : -1))
    }

    return (
        <AppContainer>
            <TweetFeed
                updatePost={updatePost}
                onFollowChange={handleFollowChange}
            />
            <ProfileSummary
                setUpdatePost={setUpdatePost}
                updatePost={updatePost}
                followers={followers}
            />
        </AppContainer>
    )
}

export default HomePage
