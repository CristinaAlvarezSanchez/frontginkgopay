import { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"


const MensajeContainer = styled.div`
    padding: 1em;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 1px solid #F6DFA7;
    gap: 1em;
    font-weight: ${props => props.leido ? '400' : '800'} ;
    cursor: pointer;
    :hover{
        background-color:#F6DFA7; 
    }
    @media(min-width: 769px) {
    flex-direction:row;
    gap: 3em;
}
`
const DivAsunto = styled.div`
    width: 90%; 
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media(min-width: 769px) {
    width: 60%; 
}
`
const AsuntoP = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    white-space:nowrap;
`
const DivParticipantes = styled.div`
    width: 60%; 
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media(min-width: 769px) {
    width: 20%; 
}
`
const Participantes = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    white-space:nowrap;
`
const DivHora = styled.div`
    width: 60%; 
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media(min-width: 769px) {
    width: 30%; 
}
`
const Hora = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    @media(min-width: 769px) {
    text-align: right;
}
`

const baseUrl = process.env.REACT_APP_API_BASE_URL

const CardMensaje = ({ mensaje_id, tipo, hora_envio, titulo, hora_leido, user_id }) => {

    const [participantes, setParticipantes] = useState([])
    const navigate = useNavigate()

    let leido
    if (hora_leido) { leido = true }
    if (tipo === 'enviado') { leido = true }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${baseUrl}/messages/users/${mensaje_id}`)
            setParticipantes(res.data.filter(res => res.user_id !== user_id))
        }
        fetchData()
    }, [])

    const onClick = async () => {
        navigate(`/mensajes/${mensaje_id}`)
        const updateRel = {
            hora: dayjs().format('YYYY-MM-DD hh:mm:ss'),
            mensajeId: mensaje_id,
            userId: user_id
        }
        const res = await axios.put(`${baseUrl}/messages/open`, updateRel)

    }

    return (
        <>
            <MensajeContainer leido={leido} onClick={() => { onClick() }}>
                <DivParticipantes>
                    <Participantes>
                        {participantes.map(participante => (
                            `${participante.alias}`
                        ))}
                    </Participantes>
                </DivParticipantes>
                <DivAsunto>
                    <AsuntoP>Asunto: {titulo} </AsuntoP>
                </DivAsunto>
                {/* <p>{tipo}</p> */}
                <DivHora>
                    <Hora>{dayjs(hora_envio).format('DD-MM-YYYY')} - {dayjs(hora_envio).format('HH:MM')}</Hora>
                </DivHora>
            </MensajeContainer>
        </>

    )
}

export default CardMensaje