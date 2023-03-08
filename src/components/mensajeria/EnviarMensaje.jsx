import classes from '../ui/Form.module.css'
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"
import axios from "axios"
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import UserToken from "../../utils/UserToken"
import { useForm } from 'react-hook-form'
import DivCenterItems from '../ui/DivCenterItems'
import NavButton from '../ui/NavButton'
import { useNavigate } from 'react-router-dom'

const DivCheckAlias = styled.div`
min-height: 4em;
margin-top: 1em;
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
gap: 1em;
margin-left: 1em;
`

const CheckBox = styled.input`
margin: 0;
width: 1.7em;
height: 1.7em;
`
const AliasDiv = styled.div`
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1em;
`

const baseUrl = process.env.REACT_APP_API_BASE_URL

const EnviarMensaje = () => {

    const { user_id } = UserToken()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const [arrGrupos, setArrGrupos] = useState([]);
    const [arrParticipantes, setArrParticipantes] = useState([])
    const [arrDestinatarios, setArrDestinatarios] = useState([])
    const [errorDestinatario, setErrorDestinatario] = useState([])

    useEffect(() => {
        if (user_id) {
            const fetchData = async () => {
                const res = await axios.get(`${baseUrl}/groups/user/${user_id}`)
                setArrGrupos(res.data)
            }
            fetchData()
        }
    }, [])

    const onSeleccionarGrupo = async (e) => {
        const idGrupo = e.target.value
        const participantesRes = await axios.get(`${baseUrl}/users/group/${idGrupo}`)
        setArrParticipantes(participantesRes.data.filter(participante => participante.id !== user_id))
    }

    const onCheckParticipante = (e) => {
        console.log(e.target.checked)
        console.log(e.target.value)
        const arrDestinatariosCopy = [...arrDestinatarios]
        if (e.target.checked) {
            arrDestinatariosCopy.push(e.target.value)
        } else {
            const indiceDestinatario = arrDestinatarios.findIndex(destinatario => e.target.value)
            arrDestinatariosCopy.splice(indiceDestinatario, 1)
        }
        setArrDestinatarios(arrDestinatariosCopy)
    }

    const onEnviar = async (values) => {
        if (arrDestinatarios.length === 0) { setErrorDestinatario('No has seleccionado ningún destinatario') }
        else {
            const nuevoMensaje = await axios.post(`${baseUrl}/messages/create`, values)
            const mensajeEnviado = {
                userId: user_id,
                mensajeId: nuevoMensaje.data.id,
                tipo: 'enviado'
            }
            await axios.post(`${baseUrl}/messages/send`, mensajeEnviado)
            arrDestinatarios.forEach(destinatarioId => {
                const mensajeRecibido = {
                    userId: destinatarioId,
                    mensajeId: nuevoMensaje.data.id,
                    tipo: 'recibido'
                }
                const asociarMensaje = async () => {
                    await axios.post(`${baseUrl}/messages/send`, mensajeRecibido)
                }
                asociarMensaje()
            });
            navigate('/mensajes/inbox')
        }
        console.log(values)
    }

    return (
        <>
            <ContenedorOnLogin>
                <NavButton texto='Volver a la bandeja de entrada' destino={'/mensajes/inbox'} />
                <div className={classes.ContainerEmail}>
                    <div>
                        <label>GRUPO</label>
                        <select onChange={(e) => { onSeleccionarGrupo(e) }}>
                            <option>Selecciona una grupo</option>
                            {arrGrupos.map(grupo => (
                                <option value={grupo.id}> {grupo.nombre_grupo}  </option>
                            ))}
                        </select>
                    </div>
                    <div >
                        <label>PARA</label>
                        {arrParticipantes &&
                            <DivCheckAlias>
                                {arrParticipantes.map(participante => (
                                    <>
                                        <CheckBox
                                            type="checkbox"
                                            value={participante.id}
                                            onChange={(e) => { onCheckParticipante(e) }} />
                                        <AliasDiv><p>{participante.alias}</p></AliasDiv>
                                    </>
                                ))}

                            </DivCheckAlias>
                        }

                    </div>
                </div>
                <form onSubmit={handleSubmit(onEnviar)}>
                    <div className={classes.ContainerForm}>
                        <label>ASUNTO</label>
                        <input type="text"
                            {...register('titulo', {
                                required: true
                            })} />
                        {(errors.titulo?.type === 'required') && <p className={classes.TextoError}>Debes incluir un asunto para enviar el mensaje</p>}

                        <label> MENSAJE </label>
                        <textarea
                            {...register('texto', {
                                required: true
                            })} />
                        {(errors.texto?.type === 'required') && <p className={classes.TextoError}>No puedes enviar un mensaje vacío</p>}
                        {errorDestinatario && <p className={classes.TextoError}>{errorDestinatario}</p>}
                        <DivCenterItems>
                            <button type='submit'>Enviar</button>
                        </DivCenterItems>

                    </div>
                </form>

            </ContenedorOnLogin>
        </>
    )
}

export default EnviarMensaje