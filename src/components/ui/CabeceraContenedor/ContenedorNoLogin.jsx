import { Breakpoint } from "react-socks"
import styled from "styled-components"
import logoginkgopay from '../../../logoginkgopay.svg'
import { useNavigate } from "react-router-dom"
import LoginCabecera from "./LoginCabecera"

const ContenedorBody = styled.div`
min-height: 70vh;
`
const DivContenedor = styled.div`
display: flex;
flex-direction: column;
width: 90%;
margin: 0 auto;
@media (min-width: 769px){
width: 80%;
}
`
const DivCabecera = styled.div`
    margin-top: 2em;
    margin-bottom: 7em;
    display: flex;
    justify-content: space-between;
    align-items:center;
`
const DivLogo = styled.div`
    width: 13em;
    cursor: pointer;
    @media (min-width: 769px){
    width: 17em;
}
`
const FooterDiv = styled.div`
    width: 100%;
    margin-top: 3rem;
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    padding: 3em;
    align-items: center;
    @media (min-width: 769px){
    flex-direction:row;
    justify-content: space-between;
}
`
const FooterP = styled.div`
    font-family: 'Arimo', sans-serif;   
    font-size: 0.8em;
    color:#7C8F96 ;
    margin: 5px;
    @media (min-width: 769px){
    font-size: 1em;}
`

const ContenedorNoLogin = ({ children }) => {
    const navigate = useNavigate()
    return (
        <>
            <ContenedorBody>
                <Breakpoint customQuery='(min-width:769px)'>
                    <DivCabecera>
                        <DivLogo>
                            <img onClick={() => navigate('/')} src={logoginkgopay} alt="logo Ginkgopay" />
                        </DivLogo>
                        <LoginCabecera />
                    </DivCabecera>
                </Breakpoint>
                <DivContenedor>
                    <Breakpoint customQuery='(max-width:768px)'>
                        <DivCabecera>
                            <DivLogo>
                                <img onClick={() => navigate('/')} src={logoginkgopay} alt="logo Ginkgopay" />
                            </DivLogo>
                            <LoginCabecera />
                        </DivCabecera>
                    </Breakpoint>

                    {children}
                </DivContenedor>
            </ContenedorBody>
            <FooterDiv>

                <FooterP>Gingkopay: Gestión Inteligente de Pagos</FooterP>

                <FooterP>Copyright © 2023 | All Rights Reserved </FooterP>
            </FooterDiv>

        </>
    )
}

export default ContenedorNoLogin 