import { styled } from 'styled-components'

export const FeedContainer = styled.div`
    flex: 2;
    padding: 20px;
`

export const NewTweetArea = styled.div`
    margin-bottom: 20px;
`

export const Input = styled.textarea`
    width: 100%;
    height: 80px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    resize: none;
`

export const PostButton = styled.button`
    margin-top: 8px;
    background-color: #1da1f2;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`
