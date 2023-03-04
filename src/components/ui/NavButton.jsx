import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const StyledDiv = styled.div`
    width: 100%;
    text-align: right;
`
const Texto = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em; 
    font-weight:800;
    color: #1D5062;
    margin: 1em;
    cursor: pointer;
    :hover{
        color:#5e9bb0;
    }
`


const NavButton = ({ texto, destino }) => {

    const navigate = useNavigate()

    return (
        <>
            <StyledDiv>
                <Texto onClick={() => { navigate(destino) }}>{texto}</Texto>
            </StyledDiv>
        </>

    )



}

export default NavButton