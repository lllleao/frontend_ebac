import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`
export const CommentContainer = styled.div`
    animation: ${slideIn} 0.6s ease-out;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 8px;
    margin: 1rem 0;
    .icon {
        font-size: 22px;
        cursor: pointer;
    }
`

export const CommentContent = styled.div`
    background: #f0f2f5;
    padding: 8px 12px;
    border-radius: 10px;
    max-width: 400px;
`

export const Username = styled.div`
    font-weight: bold;
    font-size: 14px;
`

export const Text = styled.div`
    font-size: 14px;
    color: #555;
`
