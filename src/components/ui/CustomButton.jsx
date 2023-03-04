import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const ButtonNav = styled.button`
background-color:${props => props.color === 'dark' ? '#1D5062' : '#B5CDD6'} ;
color: ${props => props.color === 'dark' ? 'white' : '#1D5062'} ;
border-radius: 50px;
border: none;
padding: 0.8rem 2rem;
margin: 0.5em 0 0.5em;
font-size: 1.3em;
font-family: 'Arimo', sans-serif;
text-decoration: none;
width: 100%;
cursor: pointer;
    &:hover{
        color: white;
        background-color: ${props => props.color === 'dark' ? '#307A94' : '#889296'}
    }
@media (min-width: 769px) {
    width: 45%;
}
`
const CustomButton = ({ children, color, destino}) => {

    const navigate = useNavigate()

    return (
        <ButtonNav color={color} onClick={() => { navigate(destino) }}>
            {children}
        </ButtonNav>
    )
}

export default CustomButton