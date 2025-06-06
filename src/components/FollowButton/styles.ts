import { styled } from 'styled-components'

export const Button = styled.button<{ $isFollowing: boolean }>`
    background-color: ${({ $isFollowing }) =>
        $isFollowing ? '#ccc' : '#1da1f2'};
    color: white;
    border: none;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        opacity: 0.8;
    }
`
