import { styled } from 'styled-components'

export const Img = styled.img<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;
    object-fit: cover;
`
