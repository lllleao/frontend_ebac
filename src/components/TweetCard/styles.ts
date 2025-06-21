import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`
export const DeleteIcon = styled.div`
    font-family: sans-serif;
    cursor: pointer;
`
export const Card = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    animation: ${fadeIn} 0.5s ease-in-out;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Content = styled.p`
    margin-top: 12px;
    font-size: 15px;
`

export const Actions = styled.div`
    margin-top: 12px;
    display: flex;
    gap: 12px;
`

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: #1da1f2;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`
