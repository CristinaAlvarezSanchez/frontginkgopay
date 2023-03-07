import { Breakpoint } from 'react-socks'
import styled from 'styled-components'


import AvatarUser from '../ui/AvatarMenu/AvatarUser'
import ContenedorNoLogin from '../ui/CabeceraContenedor/ContenedorNoLogin'
import CustomButton from '../ui/CustomButton'


const DivCabeceraMovil = styled.div`
margin: 6em auto 4em;
width: 90%;
`
const Claim = styled.h1`
color: white;
font-family: 'Arimo', sans-serif;
font-size: 3.5em;
margin-bottom: 0.5em;
`
const Texto = styled.p`
color: white;
font-family: 'Source Sans Pro', sans-serif;
font-size: 1.8em;
margin-bottom: 1em;
`
const Parrafo = styled.p`
color: #1D5062; 
font-family: 'Source Sans Pro', sans-serif;
font-size: 1.4em;
margin-bottom: 1em;
`
const ButtonContenedor = styled.div`
display: flex;
flex-direction: column;
margin-top: 2em;
@media (min-width: 769px){
flex-direction: row;
justify-content: space-between;
}
`

const Home = () => {

    return (
        <>
           <ContenedorNoLogin>
                <Claim>Comparte gastos</Claim>
                <Breakpoint customQuery='(max-width:768px)'>
                    <Texto>Sin preocupaciones</Texto>
                </Breakpoint>
                <Breakpoint customQuery='(min-width:769px)'>
                    <Texto>¿Te gustaría tener una manera fácil de dividir los gastos con tus amigos y familiares? </Texto>
                    <Parrafo>Con Ginkgopay podrás dividir facturas y compartir gastos en grupos de cualquier tamaño. Nunca más tendrás que preocuparte por llevar un registro manual de los gastos compartidos o por tener que recordar quién debe qué </Parrafo>
                    <Parrafo>¡Prueba Gingopay hoy totalmente gratis! </Parrafo>
                </Breakpoint>
                <ButtonContenedor>
                    <CustomButton color='dark' destino={'/login'}>Acceder</CustomButton>
                    <CustomButton color='ligth' destino={'/registro'}>Crear una cuenta</CustomButton>
                </ButtonContenedor>
            </ContenedorNoLogin>
            <AvatarUser/>
        </>
    )

}

export default Home