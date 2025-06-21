import { styled } from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #e6ecf0;
    gap: 1rem;
`

export const Card = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 15px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
    text-align: center;
    color: #1da1f2;
    margin-bottom: 20px;
`

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0d8bf2;
    }
`

export const SignInLink = styled.div`
    text-align: center;
    margin-top: 20px;

    a {
        color: #1da1f2;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`
export const PassWordError = styled.span`
    display: block;
    font-family: sans-serif;
    color: red;
    text-align: justify;
    padding: 0.5rem 0;
`
