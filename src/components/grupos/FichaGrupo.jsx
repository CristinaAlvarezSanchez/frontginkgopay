import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import GastoCard from "../ui/GastoCard"
import UserToken from "../../utils/UserToken"

import editpuntos from '../../icons/editpuntos.png'
import editpuntoshover from '../../icons/editpuntoshover.png'
import backgroundgrupo from '../../images/backgroundgrupo.png'
import CustomButton from "../ui/CustomButton"
import DivCenterItems from "../ui/DivCenterItems"
import SaldoCard from "../ui/SaldoCard"
import NavButton from "../ui/NavButton"
import ErrorPermisos from "../errores/ErrorPermisos"
import ProgressBar from "../errores/ProgressBar/ProgressBar"
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-image: url(${backgroundgrupo});
    gap: 15px;
    padding-right:2em;
    padding-left:2em; 
    border-radius: 20px;
    margin-bottom: 1.5em;
    
`
const DivIconEdit = styled.div`
    margin-top: 1.5em;
    width: 2em;
    height: 2em;
    background-image: url(${editpuntos});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${editpuntoshover});
    }
    @media(min-width: 769px) {
    width: 3em;
    height: 3em;
    }
`
const NombreGrupo = styled.p`
font-family: 'Arimo', sans-serif;
text-transform:  uppercase;
font-size: 2em;
color: white;
margin-top: 1em;
line-height: 1.5em;
@media(min-width: 769px) {
    width: 60%;
    }
`
const Administrador = styled.p`
font-family: 'Arimo', sans-serif;
font-size: 1.2em;
color: #FFCF5A;
margin: 0;
`
const ListaParticipantes = styled.p`
font-family: 'Source Sans Pro', sans-serif;
font-size: 1em;
color: white;
margin: 0;
`
const DivGasto = styled.div`
margin-top: 1.5em;
margin-bottom: 3em;
border-radius: 50px;
background-color: #FFCF5A;
opacity: 0.7;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
width: fit-content;
`
const GastoTotalTexto = styled.p`
font-family: 'Source Sans Pro', sans-serif;
font-weight: 600;
color: black;
font-size: 1.5em;
margin: 15px;
`
const MiSaldoTexto = styled.p`
font-family: 'Source Sans Pro', sans-serif;
font-weight: 400;
color: black;
font-size: 1.2em;
margin: 15px;

`
const ContainerNav = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`
const NavDivSaldos = styled.div`
width: 100%;
border-bottom: 10px solid #d2b467;
background-color: ${props => props.mostrarSaldos && '#d2b467'};
padding:7px;
padding-top: 10px; 

:hover{
    background-color: #d2b467;
}
`
const NavDivGastos = styled.div`
width: 100%;
border-bottom: 10px solid #d2b467;
background-color: ${props => !props.mostrarSaldos && '#d2b467'};
padding:7px;
padding-top: 10px; 

:hover{
    background-color: #d2b467;
}
`
const NavP = styled.p`
font-family: 'Arimo', sans-serif;
font-size: 1.5em;
text-align: center;
color: white;


`
const baseUrl = process.env.REACT_APP_API_BASE_URL

const FichaGrupo = () => {
    const { idGrupo } = useParams()
    const [grupo, setGrupo] = useState({})
    const [participantes, setParticipantes] = useState([])
    const [gastos, setGastos] = useState([])
    const [gastoTotal, setGastoTotal] = useState(0)
    const [admin, setAdmin] = useState({})
    const [saldos, setSaldos] = useState([])
    const [mostrarSaldos, setMostrarSaldos] = useState(false)
    const { user_id } = UserToken()

    const navigate = useNavigate()
    const sumaTotal = (gastos) => {
        let total = 0
        gastos.forEach(gasto => total += parseFloat(gasto.cantidad))
        return total
    }

    const calcularSaldos = (participantes, gastos, reparto) => {
        const saldosGrupo = []
        participantes.forEach(participante => {
            let totalPagos = 0
            gastos.filter(pago => pago.pagador_id === participante.id).forEach(pago => totalPagos += parseFloat(pago.cantidad))
            let totalGastos = 0
            reparto.filter(gasto => gasto.usuario_id === participante.id).forEach(gasto => totalGastos += parseFloat(gasto.cantidad) * parseFloat(gasto.participacion))
            let saldo = totalPagos - totalGastos
            saldosGrupo.push({ id: participante.id, alias: participante.alias, saldo: saldo })
        })
        setSaldos(saldosGrupo)
    }

    useEffect(() => {
        const fetchData = async () => {
            const gruposRes = await axios.get(`${baseUrl}/groups/${idGrupo}`)
            setGrupo(gruposRes.data)

            const participantesRes = await axios.get(`${baseUrl}/users/group/${idGrupo}`)
            setParticipantes(participantesRes.data)
            setAdmin(participantesRes.data.filter((participante => participante.tipo_usuario === 'administrador'))[0])

            const gastoTotalRes = await axios.get(`${baseUrl}/expenses/group/${idGrupo}`)
            setGastos(gastoTotalRes.data)
            setGastoTotal(sumaTotal(gastoTotalRes.data))

            const repartoGastoRes = await axios.get(`${baseUrl}/expenses/users/${idGrupo}`)
            calcularSaldos(participantesRes.data, gastoTotalRes.data, repartoGastoRes.data)
        }
        fetchData()
    }, [])

    return (
        <>

            {
                participantes.length === 0 ? <ProgressBar /> :
                    (participantes.findIndex((participante) => participante.id === user_id)) !== - 1
                        ?
                        <>
                            <ContenedorOnLogin>
                                <NavButton texto='Volver a mis grupos' destino={'/grupos'} />
                                <InfoDiv>
                                    {user_id === admin.id &&
                                        <DivIconEdit onClick={() => { navigate(`/grupos/nuevogrupo/participantes/${idGrupo}`) }} />}
                                    <NombreGrupo>{grupo.nombre}</NombreGrupo>
                                    <Administrador>
                                        {(participantes.filter(participante => participante.tipo_usuario === 'administrador')).map(participante => `${participante.nombre} ${participante.apellidos} `)}(admin) </Administrador>

                                    <ListaParticipantes> Participantes: {(participantes.filter(participante => participante.tipo_usuario === 'miembro')).map(participante => ` /${participante.alias} / `)}</ListaParticipantes>


                                    <DivGasto>
                                        <GastoTotalTexto>GASTOS: {gastoTotal}€ </GastoTotalTexto>
                                        <MiSaldoTexto> MI SALDO: {(saldos.filter(saldo => saldo.id === user_id)).map(saldo => `${saldo.saldo}€`)}</MiSaldoTexto>
                                    </DivGasto>
                                    <ContainerNav>
                                        <NavDivSaldos onClick={() => { setMostrarSaldos(true) }} mostrarSaldos={mostrarSaldos}>
                                            <NavP>SALDOS</NavP>
                                        </NavDivSaldos>
                                        <NavDivGastos onClick={() => { setMostrarSaldos(false) }} mostrarSaldos={mostrarSaldos}>
                                            <NavP >GASTOS</NavP>
                                        </NavDivGastos>
                                    </ContainerNav>

                                </InfoDiv>
                                {!mostrarSaldos ?
                                    gastos.map(gasto => (<GastoCard key={gasto.id} gasto={gasto} administrador={admin} />)) :
                                    saldos.map(saldo => <SaldoCard key={saldo.id} {...saldo} />)}


                                <DivCenterItems>
                                    <CustomButton color="dark" destino={`/gastos/nuevogasto/${idGrupo}`}> Añadir gasto</CustomButton>
                                </DivCenterItems>
                                </ContenedorOnLogin>
                        </>
                        :
                        <>
                            <NavButton texto='Volver a mis grupos' destino={'/grupos'} />
                            <ErrorPermisos />
                        </>
            }

        </>
    )
}

export default FichaGrupo