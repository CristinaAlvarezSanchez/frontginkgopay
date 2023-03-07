import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notfound404 from '../../images/notfound404.png'

const DivContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const ImgError = styled.img`
height: 40vh;
width: 40vh;
margin:0 auto;
@media(min-width: 769px) {
    height: 60vh;
    width: 60vh;
    }
`
const TextoError = styled.p`
margin: 1em 0 ;
font-family: 'Arimo', sans-serif;
color: #CD5220;
font-size: 1.5em;
@media(min-width: 769px) {
    font-size: 3em;
    }
`
const TextoInicio = styled.p`
margin-bottom: 1em ;
font-family: 'Arimo', sans-serif;
color: #1D5062;
font-size: 1.5em;
cursor: pointer;
:hover{
    color:#CD5220
}
@media(min-width: 769px) {
    font-size: 3em;
    }
`

const Page404 = () => {

    return (
        <>
            <DivContainer>
                <TextoError>404 pagina no encontrada </TextoError>
                <Link to={'/login'}>
                    <TextoInicio>volver</TextoInicio>
                </Link>
                <divCerdo>
                    <ImgError src={notfound404} alt="" />
                </divCerdo>
            </DivContainer>
        </>
    )
}

export default Page404