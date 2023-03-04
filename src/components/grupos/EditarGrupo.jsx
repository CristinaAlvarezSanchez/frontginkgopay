import classes from '../ui/Form.module.css'
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import styled from 'styled-components'
import AddParticipanteCard from "../ui/AddParticipanteCard"
import axios from 'axios'
import { Breakpoint } from "react-socks"
import UserToken from "../../utils/UserToken"

import AddParcipanteSearchCard from '../ui/AddParticipanteSearchCard'
import CabeceraDeskBasic from '../ui/CabeceraDeskBasic'
import Contenedor from '../ui/Contenedor'
import CabeceraMovilBasic from '../ui/CabeceraMovilBasic'
import logoginkgopay from '../../logoginkgopay.svg'
import personsearch from '../../icons/personsearch.png'
import personsearchhover from '../../icons/personsearchhover.png'
import DivCenterItems from '../ui/DivCenterItems'
import NavButton from '../ui/NavButton'
import ErrorPermisos from '../errores/ErrorPermisos'
import ProgressBar from '../errores/ProgressBar/ProgressBar'


const GrupoEditado = styled.p`
text-align: left;
margin-bottom:1.5em; 
font-family: 'Arimo', sans-serif;
font-size: 1.5em;
color:#1D5062;
`
const DivBusqueda = styled.div`
    margin-bottom: 1em;
    display:flex; 
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap:1em;
`
const IconBuscar = styled.div`
    width: 3.1em;
    height: 2.5em;
    background-image: url(${personsearch});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${personsearchhover});
    }
    @media(min-width: 769px) {
    width: 3.4em;
    height:3.1em;
    }
`
const TituloBusqueda = styled.p`
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1.3em;
    margin-top: 2em;
    text-align: center;
`
const TituloCambioNombre = styled.p`
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1.3em;
    margin-top: 1em;
    text-align: center;
    @media(min-width: 769px) {
    margin-top:2em;
    }
`
const DivTituloParticipantes = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1em ;
    background-color: #F6DFA7;
`
const Titulo = styled.p`
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1.3em;
`
const ContainerCambioNombre = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    @media(min-width: 769px) {
        flex-direction: row;
        align-items: baseline;
    }

`
const ButtonEliminar = styled.div`
    background-color: #CD5220;
    color: white;
    border-radius: 50px;
    border: none;
    padding: 0.8em;
    font-size: 1.2em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    cursor: pointer;
    margin-top: 2em;
    text-align:center;
    width:90%;
    :hover{
    background-color: #ee9b53;
    }
    @media(min-width: 769px) {
        width:50%; 
    }
    `
const DivConfEliminar = styled.div`
    background-color:#e18f6e; 
    color:white; 
    padding: 0.8em; 
    margin-top: 1em;  
    text-align: center;
    `


const baseUrl = process.env.REACT_APP_API_BASE_URL

const EditarGrupo = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const { idGrupo } = useParams()
    const { user_id } = UserToken()

    const [grupo, setGrupo] = useState({})
    const [nombreGrupo, setNombreGrupo] = useState('')
    const [errorParticipante, setErrorParcipante] = useState({})
    const [errorBorrar, setErrorBorrar] = useState({})
    const [stringBus, setStringBus] = useState('')
    const [arrBusqueda, setArrBusqueda] = useState([])
    const [arrParticipantes, setArrParticipantes] = useState([])
    const [admin, setAdmin] = useState({})
    const [errorRes, setErrorRes] = useState('')
    const [eliminar, setEliminar] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const grupoRes = await axios.get(`${baseUrl}/groups/${idGrupo}`)
            setGrupo(grupoRes.data)
            setNombreGrupo(grupoRes.data.nombre)
            const participantesRes = await axios.get(`${baseUrl}/users/group/${idGrupo}`)
            setArrParticipantes(participantesRes.data)
            setAdmin(participantesRes.data.filter((participante => participante.tipo_usuario === 'administrador'))[0])
        }
        fetchData()
    }, [])

    const classError = (error) => {
        if (error) {
            return `${classes.LabelError}`
        }
    }
    const buscarUsuario = async () => {
        const res = await axios.get(`${baseUrl}/users/search/${stringBus}`)
        if (res.data.length !== 0) {
            setArrBusqueda(res.data)
        }
    }

    const addParticipanteNew = async (usuario) => {
        const indiceParticipante = arrParticipantes.findIndex(participante => participante.id === usuario.id)
        if (indiceParticipante !== -1) {
            setErrorParcipante({
                userId: usuario.id,
                mensaje: 'ya forma parte del grupo'
            })
        }
        else {
            const res = await axios.get(`${baseUrl}/groups/${idGrupo}/adduser/${usuario.id}`)
            setArrBusqueda(arrBusqueda.filter(participante => participante.id !== usuario.id))
            setArrParticipantes(res.data)
        }
    }

    const borrarUsuario = async (id) => {
        const resGastos = await axios.get(`${baseUrl}/expenses/users/${id}/group/${idGrupo}`)
        const resPagos = await axios.get(`${baseUrl}/payments/users/${id}/group/${idGrupo}`)
        if (resGastos.data.length === 0 && resPagos.data.length === 0) {
            const res = await axios.delete(`${baseUrl}/groups/${idGrupo}/userdelete/${id}`)
            if (res.affectedRows !== 0) {
                const newArray = arrParticipantes.filter(participante => participante.id !== id)
                setArrParticipantes(newArray)
                setErrorBorrar({})
            }
        } else {
            setErrorBorrar({
                userId: id,
                mensaje: 'tiene pagos y o gastos asociados al grupo. No es posible eliminar este usuario'
            })
        }
    }

    const onSubmit = async (values) => {
        const res = await axios.put(`${baseUrl}/groups/update/${grupo.id}`, values)
        if (!res.data.id) {
            setErrorRes('no se ha podido modificar el nombre')
        } else {
            setErrorRes('')
            setNombreGrupo(values.nombre)
            reset()
        }
    }

    const onEliminar = async () => {
        const res = await axios.delete(`${baseUrl}/groups/delete/${grupo.id}`)
        if (res.data.affectedRows === 0) {
            setErrorRes('no se ha podido eliminar el grupo')
        } else {
            navigate('/grupos')
        }
    }

    return (
        <>
            {arrParticipantes.length === 0 ? <ProgressBar /> :
                (user_id === admin.id) ? <>
                    <Breakpoint customQuery='(min-width:769px)'>
                        <CabeceraDeskBasic></CabeceraDeskBasic>
                    </Breakpoint>
                    <Contenedor>
                        <Breakpoint customQuery='(max-width:768px)'>
                            <CabeceraMovilBasic>
                                <img src={logoginkgopay} alt="logo Ginkgopay" />
                            </CabeceraMovilBasic>
                        </Breakpoint>
                        <NavButton texto='Volver al grupo' destino={`/grupos/${idGrupo}`} />
                        <GrupoEditado>Editando: "{nombreGrupo}"</GrupoEditado>
                        <DivTituloParticipantes><Titulo>Participantes actuales</Titulo></DivTituloParticipantes>
                        {
                            arrParticipantes.map(usuario => (
                                <AddParticipanteCard
                                    key={usuario.id}
                                    usuario={usuario}
                                    error={errorBorrar}
                                    onBorrar={borrarUsuario} />
                            ))
                        }
                        <TituloBusqueda>Busca participantes para añadir al grupo</TituloBusqueda>
                        <DivBusqueda>
                            <input type="text"
                                value={stringBus}
                                placeholder='Alias o email'
                                onChange={(e) => { setStringBus(e.target.value) }} />
                            {stringBus &&
                                <IconBuscar onClick={() => { buscarUsuario() }} />
                            }
                        </DivBusqueda>
                        {
                            arrBusqueda.map(usuario => (
                                <AddParcipanteSearchCard
                                    key={usuario.id}
                                    usuario={usuario}
                                    error={errorParticipante}
                                    onAddUsuario={addParticipanteNew} />
                            ))
                        }

                        <TituloCambioNombre>Editar el nombre del grupo</TituloCambioNombre>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ContainerCambioNombre>
                                <input type="text"
                                    placeholder={grupo.nombre}
                                    className={classError(errors.nombre)}
                                    {...register('nombre', {
                                        required: true
                                    })} />
                                <button className={classes.ButtonNoMargin} type="submit">Enviar</button>
                            </ContainerCambioNombre>
                            {(errors.nombre?.type === 'required') && <p className={classes.TextoError}>Debes incluir un nombre para el grupo</p>}
                            <div className={classes.CenterItems}>
                                <p className={classes.TextoError}> {errorRes}</p>
                            </div>
                        </form>

                        {!eliminar ?
                            <DivCenterItems>
                                <ButtonEliminar onClick={() => setEliminar(true)}> Eliminar grupo </ButtonEliminar>
                            </DivCenterItems>
                            :
                            <DivConfEliminar>
                                <p>¿Estas seguro de eliminar el grupo? </p>
                                <p>El borrado será definitivo</p>
                                <DivCenterItems>
                                    <ButtonEliminar onClick={() => { onEliminar() }}> Eliminar definitivamente </ButtonEliminar>
                                </DivCenterItems>
                            </DivConfEliminar>}
                    </Contenedor>
                </>
                    :
                    <>
                        <NavButton texto='Volver a mis grupos' destino={'/grupos'} />
                        <ErrorPermisos />
                    </>}



        </>
    )
}


export default EditarGrupo