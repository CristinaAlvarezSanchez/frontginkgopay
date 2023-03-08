import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import dayjs from "dayjs"
import UserToken from "../../utils/UserToken"
import ProgressBar from "../errores/ProgressBar/ProgressBar"
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"
import NavButton from "../ui/NavButton"

const DivMensaje = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const DivAsunto = styled.div`  
    margin-bottom: 2em;
    margin-top: 2em;
`
const AsuntoP = styled.p`
    margin-left: 0.5em;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.5em;
    font-weight: 800; 
`
const DivParticipante = styled.div`
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media(min-width: 769px) {
    flex-direction: row; 
}
`
const ParticipanteP = styled.p`
    margin-left: 0.5em;
    margin-top: 0.5em;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.5em;
    font-weight: 300; 
`

const DivEnviadoa = styled.div`
margin-left: 0.8em;
`
const EnviadoaP = styled.p`
    margin-top: 0.5em;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    font-weight: 400; 
`
const DivTexto = styled.div`
    border : 2px solid #F6DFA7 ;
    margin-bottom: 1em;
    padding: 0.5em;
    min-height: 300px;
`
const TextoP = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    font-weight: 400; 
    line-height: 2em;
`
const Eliminar = styled.p`
    font-family: 'Arimo', sans-serif;
    color: #CD5220; 
    text-align: right;
    font-size: 1em;
    margin-left: 1em;
    cursor: pointer;
    :hover{
        color: #1D5062;
    }
`
const baseUrl = process.env.REACT_APP_API_BASE_URL

const VerMensaje = () => {

    const { mensajeId } = useParams()
    const [mensaje, setMensaje] = useState()
    const [participantes, setParticipantes] = useState([])
    const { user_id } = UserToken()
    const [horaEnvio, setHoraEnvio] = useState()
    const [tipo, setTipo] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const mensajeRes = await axios.get(`${baseUrl}/messages/${mensajeId}`)
            setMensaje(mensajeRes.data)
            const participantesRes = await axios.get(`${baseUrl}/messages/users/${mensajeId}`)
            setParticipantes(participantesRes.data)
            const UserRel = participantesRes.data.filter(participante => participante.user_id === user_id)
            setHoraEnvio(UserRel[0].hora_envio)
            setTipo(UserRel[0].tipo)
        }
        fetchData()
    }, [mensajeId, user_id])

    const onEliminar = async () => {
        const res = await axios.get(`${baseUrl}/messages/users/${mensaje.id}`)
        const mensajesActivos = (res.data.filter(mensaje => mensaje.activo))
        if (mensajesActivos.length === 1) {
            await axios.delete(`${baseUrl}/messages/delete/${mensaje.id}`)

        } else {
            await axios.get(`${baseUrl}/messages/trash/${mensaje.id}/${user_id}`)
        }
        navigate('/mensajes/inbox')
    }

    return (

        <>
            <ContenedorOnLogin>
                {!mensaje ? <ProgressBar /> :
                    <>
                        <NavButton texto='Volver a la bandeja de entrada' destino={'/mensajes/inbox'} />
                        <DivMensaje>
                            <DivAsunto>
                                <AsuntoP>ASUNTO: {mensaje.titulo}</AsuntoP>
                            </DivAsunto>
                            <DivEnviadoa>
                                <EnviadoaP>{(tipo === 'enviado') ? 'Enviado a' : 'Recibido de'}</EnviadoaP>
                            </DivEnviadoa>
                            <DivParticipante>
                                <ParticipanteP>{participantes.filter(res => res.user_id !== user_id).map(participante => (`/ ${participante.alias} /`))}
                                </ParticipanteP>

                                <ParticipanteP>{dayjs(horaEnvio).format('DD-MM-YYYY')} - {dayjs(horaEnvio).format('HH:MM')}</ParticipanteP>
                            </DivParticipante>
                            <DivTexto>
                                <TextoP>{mensaje.texto}</TextoP>
                            </DivTexto>
                        </DivMensaje>
                        <Eliminar onClick={() => { onEliminar() }}>Eliminar</Eliminar>
                    </>
                }
            </ContenedorOnLogin>
        </>

    )

}

export default VerMensaje 