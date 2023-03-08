import { Breakpoint } from "react-socks"
import styled from "styled-components"
import AvatarUser from "../../ui/AvatarMenu/AvatarUser"
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
    justify-content: space-between;
    padding: 3em;
    align-items: flex-end;
    @media (min-width: 769px){
    flex-direction:row;
}
`
const FooterP = styled.div`
    font-family: 'Arimo', sans-serif;   
    font-size: 1.2em;
    color:#7C8F96 ;

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
                <div>
                    <FooterP>Gingkopay: Gestión Inteligente de Pagos</FooterP>
                </div>
                <div><FooterP>Copyright © 2023 | All Rights Reserved </FooterP></div>
            </FooterDiv>

        </>
    )
}

export default ContenedorNoLogin 