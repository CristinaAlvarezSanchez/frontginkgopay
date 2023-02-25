import { Breakpoint } from 'react-socks'
import styled from 'styled-components'

import logoginkgopay from '../../logoginkgopay.svg'
import CabeceraDeskBasic from '../ui/CabeceraDeskBasic'
import CustomButton from '../ui/CustomButton'
import LoginCabecera from '../ui/LoginCabecera'

const DivContenedor = styled.div`
display: flex;
flex-direction: column;
width: 70%;
margin: 0 auto;
`
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
            <Breakpoint customQuery='(min-width:769px)'>
                <CabeceraDeskBasic><LoginCabecera /></CabeceraDeskBasic>
            </Breakpoint>
            <DivContenedor>
                <Breakpoint customQuery='(max-width:768px)'>
                    <DivCabeceraMovil>
                        <img src={logoginkgopay} alt="logo Ginkgopay" />
                    </DivCabeceraMovil>
                </Breakpoint>
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
                    <CustomButton color='dark'>Acceder</CustomButton>
                    <CustomButton color='ligth'>Crear una cuenta</CustomButton>
                </ButtonContenedor>
            </DivContenedor>
        </>
    )

}

export default Home