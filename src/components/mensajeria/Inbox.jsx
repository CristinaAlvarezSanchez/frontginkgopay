import { useEffect, useState } from "react"
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"
import UserToken from "../../utils/UserToken"
import axios from "axios"
import CardMensaje from "./CardMensaje"
import styled from "styled-components"

import mas from '../../icons/mas.png'
import mashover from '../../icons/mashover.png'
import NavButton from "../ui/NavButton"
import { useNavigate } from "react-router-dom"
import ProgressBar from "../errores/ProgressBar/ProgressBar"

const baseUrl = process.env.REACT_APP_API_BASE_URL

const DivTipoMensaje = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 15px;
    align-items: center;
    width: 100%;
    padding:1.2em;
    background-color: #F6DFA7;
    margin-top: 10px;
    margin-bottom: 1em;
    :first-child{
        margin-top: 0;
    }
`
const Titulo = styled.p`
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1.5em;
    text-align: center;
`

const DivIconoNuevo = styled.div`
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.5em;
    background-image: url(${mas});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${mashover}); 
    }
    @media(min-width: 769px) {
    font-size: 1.5em;
    }
`

const Inbox = () => {

    const [arrMensajes, setArrMensajes] = useState([])
    const { user_id } = UserToken()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${baseUrl}/messages/inbox/${user_id}`)
            setArrMensajes(res.data)
        }
        fetchData()
    }, [user_id])

    return (
        <>
            <ContenedorOnLogin>
                {!arrMensajes ? <ProgressBar /> :
                    <>
                        <NavButton texto='Enviar nuevo mensaje' destino={'/mensajes/new'} />
                        <DivTipoMensaje>
                            <Titulo> MENSAJES RECIBIDOS </Titulo>
                        </DivTipoMensaje>
                        {
                            arrMensajes.filter(mensaje => mensaje.tipo === 'recibido' && mensaje.activo).map(mensaje => (
                                <>
                                    <CardMensaje key={mensaje.id} {...mensaje} user_id={user_id} />
                                </>
                            ))
                        }

                        <DivTipoMensaje>
                            <Titulo> MENSAJES ENVIADOS </Titulo>
                            <DivIconoNuevo onClick={() => { navigate('/mensajes/new') }} />
                        </DivTipoMensaje>

                        {
                            arrMensajes.filter(mensaje => mensaje.tipo === 'enviado' && mensaje.activo).map(mensaje => (
                                <>
                                    <CardMensaje key={mensaje.id} {...mensaje} user_id={user_id} />
                                </>
                            ))
                        }
                    </>
                }
            </ContenedorOnLogin>
        </>
    )

}

export default Inbox