import { Breakpoint } from "react-socks"
import UserToken from "../../../utils/UserToken"
import axios from "axios"
import styled from "styled-components"
import AvatarUser from "../../ui/AvatarMenu/AvatarUser"
import logoginkgopay from '../../../logoginkgopay.svg'
import { useNavigate } from "react-router-dom"
import { Badge } from "@mui/material"
import { useEffect, useState } from "react"

const ContenedorBody = styled.div`
min-height: 70vh;
`
const DivContenedor = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin: 0 auto;
@media (min-width: 769px){
width: 80%;
}
`
const DivCabecera = styled.div`
    margin-top: 2em;
    margin-bottom: 2em;
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
const DivAvatarAvisos = styled.div`
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    align-items: center;
    @media (min-width: 769px){
    gap: 2em;
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
const baseUrl = process.env.REACT_APP_API_BASE_URL

const ContenedorOnLogin = ({ children }) => {
    const navigate = useNavigate()
    const { user_id } = UserToken()
    const [noLeidos, setNoLeidos] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${baseUrl}/messages/inbox/${user_id}`)
            const mensajesNoLeidos = (res.data.filter(mensaje =>
                mensaje.tipo === 'recibido' &&
                mensaje.activo &&
                !mensaje.hora_leido
            ))
            setNoLeidos(mensajesNoLeidos.length)
        }
        fetchData()
    }, [user_id])

    return (
        <>
            <ContenedorBody>
                <Breakpoint customQuery='(min-width:769px)'>
                    <DivCabecera>
                        <DivLogo>
                            <img onClick={() => navigate('/grupos')} src={logoginkgopay} alt="logo Ginkgopay" />
                        </DivLogo>
                        <DivAvatarAvisos>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                badgeContent={noLeidos} color="primary"
                            >
                                <AvatarUser />
                            </Badge>
                        </DivAvatarAvisos>
                    </DivCabecera>
                </Breakpoint>
                <DivContenedor>
                    <Breakpoint customQuery='(max-width:768px)'>
                        <DivCabecera>
                            <DivLogo>
                                <img onClick={() => navigate('/grupos')} src={logoginkgopay} alt="logo Ginkgopay" />
                            </DivLogo>
                            <DivAvatarAvisos>
                                <Badge badgeContent={noLeidos} color="primary">
                                    <AvatarUser />
                                </Badge>
                            </DivAvatarAvisos>
                        </DivCabecera>
                    </Breakpoint>

                    {children}
                </DivContenedor>
            </ContenedorBody>
            <FooterDiv><FooterP>Gingkopay: Gestión Inteligente de Pagos</FooterP>
                <FooterP>Copyright © 2023 | All Rights Reserved </FooterP></FooterDiv>

        </>
    )
}

export default ContenedorOnLogin 