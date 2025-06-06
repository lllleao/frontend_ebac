import { Img } from './style'

interface AvatarProps {
    src: string
    alt: string
    size?: number
}

export function Avatar({ src, alt, size = 40 }: AvatarProps) {
    return <Img src={src} alt={alt} $size={size} />
}
