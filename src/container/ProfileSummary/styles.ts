import styled from 'styled-components'

export const Container = styled.div`
    flex: 1;
    padding: 20px;
    border-left: 1px solid #ddd;
`

export const Section = styled.div`
    margin-bottom: 20px;
`

export const Title = styled.h3`
    margin-bottom: 10px;
`

export const Info = styled.div`
    font-size: 15px;
    margin-bottom: 8px;
`

export const Button = styled.button`
    background-color: #1da1f2;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;

    &:hover {
        opacity: 0.9;
    }
`

export const BioInput = styled.textarea`
    width: 100%;
    padding: 8px;
    font-size: 15px;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: vertical;
`
export const Avatar = styled.div<{ $backgound: string }>`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-image: ${({ $backgound }) => `url(${$backgound})`};
    background-position: center;
    background-size: cover;
    /* display: flex; */
    /* top: 0; */
    /* background-color: '#eee'; */
    /*back image*/
    /* align-items: 'center'; */
    /* justify-content: 'center'; */
    /* font-size: '14px'; */
    /* color: '#666'; */
    border: 2px solid rgb(86, 99, 245);
    margin-bottom: 1rem;
`

export const ButtonDisplay = styled.div`
    margin-bottom: 1rem;
    button {
        cursor: pointer;
        padding: 0.5rem;
        background-color: #3d4ce5;
        border: none;
        color: #eee;
        border-radius: 0.5rem;
    }
`
