import { Img } from './style'

type AvatarProps = {
    src: string
    alt: string
    size?: number
}

const Avatar = ({ src, alt, size = 40 }: AvatarProps) => {
    return <Img src={src} alt={alt} $size={size} />
}

export default Avatar
