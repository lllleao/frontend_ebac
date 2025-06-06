import { styled } from 'styled-components'

export const AppContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background: #f5f8fa;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`
