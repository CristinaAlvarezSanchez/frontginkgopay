import styled from "styled-components"
const CustomButton = ({ children, color }) => {

    const ButtonNav = styled.button`
    background-color:${color === 'dark' ? '#1D5062' : '#B5CDD6'} ;
    color: ${color === 'dark' ? 'white' : '#1D5062'} ;
    border-radius: 50px;
    border: none;
    padding: 0.8rem 2rem;
    margin: 0.5em 0 0.5em;
    font-size: 1em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    cursor: pointer;
        &:hover{
            color: white;
            background-color: ${color === 'dark' ? '#307A94' : '#889296'}
        }
    @media (min-width: 769px) {
        width: 45%;
        font-size: 1.3em;
    }
    `

    return (
        <ButtonNav>
            {children}
        </ButtonNav>
    )
}

export default CustomButton