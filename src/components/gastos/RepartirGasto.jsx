import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import UserToken from "../../utils/UserToken"
import { Breakpoint } from 'react-socks'
import CabeceraDeskBasic from '../ui/CabeceraDeskBasic'
import CabeceraMovilBasic from '../ui/CabeceraMovilBasic'
import Contenedor from '../ui/Contenedor'
import NavButton from '../ui/NavButton'
import logoginkgopay from '../../logoginkgopay.svg'
import styled from 'styled-components'
import AddCheckRepartoGasto from '../ui/AddCheckRepartoGasto'
import DivCenterItems from '../ui/DivCenterItems'
import DivRigthItems from '../ui/DivRigthItems'
import AddManualRepartoGasto from '../ui/AddManualRepartoGasto'
import ProgressBar from "../errores/ProgressBar/ProgressBar"
import ErrorPermisos from "../errores/ErrorPermisos"

const GastoEditado = styled.p`
text-transform:  uppercase;
text-align: left;
margin-bottom:1.5em; 
font-family: 'Arimo', sans-serif;
font-size: 1.5em;
color:#1D5062;
`

const DivTituloEditandoGasto = styled.div`
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

const ButtonConfirmar = styled.button`
    background-color: ${props => props.color === 'dark' ? '#1D5062' : '#B5CDD6'} ;
    color: ${props => props.color === 'dark' ? 'white' : '#1D5062'} ;
    border-radius: 50px;
    border: none;
    padding: 0.8em;
    font-size: 1em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    cursor: pointer;
    margin-top: 2em;
    text-align:center;
    width:70%;
    :hover{
        color: white;
        background-color: ${props => props.color === 'dark' ? '#307A94' : '#889296'}
    }
    @media(min-width: 769px) {
    width:60%;}
`

const ButtonValidar = styled.button`
    background-color: #65BF6E;
    border-radius: 50px;
    border: none;
    padding: 0.5em;
    font-size: 1em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    cursor: pointer;
    text-align:center;
    width:100%;
    :hover{
        color: white;
        background-color: #3C6040;
    }
`
const Aviso = styled.p`
    color: #CD5220;
    font-family: 'Arimo', sans-serif;
    font-size: 1.3em;
    text-align:center; 
    margin-top: 1.5em;
`
const ModoNav = styled.div`
    width: 100%;
    text-align: right;
    padding-left: 3em;
    padding-bottom: 1em;
    cursor: pointer;
    `
const TextModo = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em; 
    font-weight:800;
    color: #CD5220;
    :hover{
        color: #1D5062;
    }
    `
const baseUrl = process.env.REACT_APP_API_BASE_URL

const RepartirGasto = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { user_id } = UserToken()
    const { idGasto, idGrupo, idCreador } = useParams()

    const [gasto, setGasto] = useState({})
    const [reparto, setReparto] = useState([])
    const [admin, setAdmin] = useState({})
    const [cantidad, setCantidad] = useState(0)
    const [modoAvanzado, setModoAvanzado] = useState(false)
    const [modoAvanzadoOk, setModoAvanzadoOk] = useState(false)
    const [errorSuma, setErrorSuma] = useState()
    const [cambio, setCambio] = useState()

    console.log(gasto)
    useEffect(() => {
        const fetchData = async () => {

            const gastoRes = await axios.get(`${baseUrl}/expenses/${idGasto}`)
            setGasto(gastoRes.data)
            setCantidad(gastoRes.data.cantidad)
            console.log(gastoRes)

            const participantesRes = await axios.get(`${baseUrl}/users/group/${gastoRes.data.grupo_gasto_id}`)
            setAdmin(participantesRes.data.filter((participante => participante.tipo_usuario === 'administrador'))[0])

            const repartoRes = await axios.get(`${baseUrl}/expenses/infoshare/${idGasto}`)
            repartoRes.data.map(reparto => {
                if (parseFloat(reparto.participacion) !== 0) {
                    reparto.activo = true
                }
                else {
                    reparto.activo = false
                }
            })
            setReparto(repartoRes.data)
        }
        fetchData()
    }, [])

    const onCheckParticipante = (e) => {
        setCambio()
        const indiceParticipante = reparto.findIndex((reparto => reparto.alias === e.target.value))

        if (!e.target.checked) {
            const repartoCopy = [...reparto];
            const activos = repartoCopy.filter(reparto => reparto.activo)
            repartoCopy.forEach(reparto => {
                if (reparto.activo) {
                    reparto.participacion = 1 / (activos.length - 1)
                }
            })
            const repartoActualizado = {
                ...reparto[indiceParticipante],
                participacion: 0,
                activo: false
            }
            repartoCopy[indiceParticipante] = repartoActualizado
            setReparto(repartoCopy)
        } else {
            const repartoCopy = [...reparto];
            const activos = repartoCopy.filter(reparto => reparto.activo)
            repartoCopy.forEach(reparto => {
                if (reparto.activo) {
                    reparto.participacion = 1 / (activos.length + 1)
                }
            })
            const repartoActualizado = {
                ...reparto[indiceParticipante],
                participacion: 1 / (activos.length + 1),
                activo: true
            }
            repartoCopy[indiceParticipante] = repartoActualizado
            setReparto(repartoCopy)
        }

    }

    const confirmarReparto = () => {
        let suma = 0
        reparto.forEach(reparto => suma += parseFloat(reparto.participacion * cantidad))
        if (suma === parseFloat(cantidad)) {
            setErrorSuma()
            let nuevaAsignacion
            reparto.forEach(reparto => {
                const actualizarData = async () => {
                    nuevaAsignacion = await axios.put(`${baseUrl}/expenses/updateshare`, reparto)
                    nuevaAsignacion.data.length > 0 ? navigate(`/grupos/${idGrupo}`) : setCambio('ha habido un error')
                }
                actualizarData()
            })

        } else {
            setErrorSuma('Las cantidades repartidas no coinciden con el total del gasto, revisa la información facilitada')
        }
    }

    const onEditarCantidad = (values) => {
        let suma = 0
        for (let clave in values) {
            if (values[clave]) { suma += parseFloat(values[clave]) }
        }
        if (suma === parseFloat(cantidad)) {
            setErrorSuma()
            const repartoCopy = [...reparto]
            for (let clave in values) {
                const indiceParticipante = reparto.findIndex((reparto => reparto.alias === clave))
                if (repartoCopy[indiceParticipante] && values[clave]) {
                    const repartoActualizado = {
                        ...reparto[indiceParticipante],
                        participacion: parseFloat(values[clave]) / cantidad,
                    }
                    repartoCopy[indiceParticipante] = repartoActualizado
                    setReparto(repartoCopy)
                }
                else if (repartoCopy[indiceParticipante]) {
                    const repartoActualizado = {
                        ...reparto[indiceParticipante],
                        participacion: 0,
                        activo: false
                    }
                    repartoCopy[indiceParticipante] = repartoActualizado
                    setReparto(repartoCopy)
                }
                setModoAvanzadoOk(true)
            }
        } else {
            setErrorSuma('Las cantidades repartidas no coinciden con el total del gasto, revisa la información facilitada')
        }

    }

    const cambioTipoReparto = () => {
        setModoAvanzado(!modoAvanzado)
        setErrorSuma()
        setModoAvanzadoOk()
        setCambio()
    }

    return (

        <>
            {(!reparto & !gasto) ? <ProgressBar /> :
                (toString(user_id) === toString(idCreador) || toString(user_id) === toString(admin.id) || toString(user_id) === toString(gasto.pagador_id)) ? <>

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
                        <GastoEditado>Reparto: {gasto.nombre}</GastoEditado>
                        <ModoNav onClick={() => { cambioTipoReparto() }}> <TextModo>{modoAvanzado ? 'REPARTO NORMAL' : 'REPARTO AVANZADO'}</TextModo></ModoNav>
                        <DivTituloEditandoGasto><Titulo>Reparto: {!modoAvanzado ? 'PROPORCIONAL' : 'MANUAL'}</Titulo>
                            <p>TOTAL: {cantidad}€</p></DivTituloEditandoGasto>

                        {!modoAvanzado &&
                            reparto.map(participante =>
                                <AddCheckRepartoGasto
                                    key={participante.usuario_id}
                                    participante={participante}
                                    cantidad={cantidad}
                                    onCheckParticipante={onCheckParticipante} />)}


                        {modoAvanzado &&
                            <form onSubmit={(handleSubmit(onEditarCantidad))}>

                                {reparto.map(participante =>
                                    <AddManualRepartoGasto participante={participante} register={register} />
                                )}
                                {errorSuma &&
                                    <DivCenterItems>
                                        <Aviso>{errorSuma}</Aviso>
                                    </DivCenterItems>}
                                <ButtonValidar type="submit">Comprobar</ButtonValidar>
                            </form>
                        }



                        {cambio &&
                            <DivCenterItems>
                                <Aviso>{cambio}</Aviso>
                            </DivCenterItems>}
                        {(errorSuma && !modoAvanzado) &&
                            <DivCenterItems>
                                <Aviso>{errorSuma}</Aviso>
                            </DivCenterItems>}

                        <DivCenterItems>

                            {(modoAvanzadoOk || !modoAvanzado) && <ButtonConfirmar color='dark' onClick={() => { confirmarReparto() }}> CONFIRMAR </ButtonConfirmar>}
                        </DivCenterItems>

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

export default RepartirGasto