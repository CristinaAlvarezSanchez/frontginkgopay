import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Breakpoint } from "react-socks"
import styled from "styled-components"
import UserToken from "../../utils/UserToken"

import CabeceraDeskBasic from "../ui/CabeceraDeskBasic"
import CabeceraMovilBasic from "../ui/CabeceraMovilBasic"

import GrupoCard from "../ui/GrupoCard"
import logoginkgopay from '../../logoginkgopay.svg'
import mas from '../../icons/mas.png'
import mashover from '../../icons/mashover.png'
import CustomButton from "../ui/CustomButton"
import DivCenterItems from "../ui/DivCenterItems"
import Contenedor from "../ui/Contenedor"


const DivTipoGrupo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left:3.2em;
    padding-right:3.2em;
    background-color: #1D5062;
    margin-top: 70px;
    :first-child{
        margin-top: 0;
    }
`
const Titulo = styled.p`
    margin-top: 1.2em;
    margin-bottom:1.2em;
    color: white;
    font-family: 'Arimo', sans-serif;
    font-size: 1.5em;
    text-align: center;
`
const DivIconoNuevo = styled.div`
    width: 2em;
    height: 2em;
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
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MisGrupos = () => {

    const [arrGrupos, setArrGrupos] = useState([]);
    const navigate = useNavigate()
    const { user_id } = UserToken()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${baseUrl}/groups/user/${user_id}`)
            setArrGrupos(res.data)
        }
        fetchData()
    }, [])


    return (
        <>
            <Breakpoint customQuery='(min-width:769px)'>
                <CabeceraDeskBasic></CabeceraDeskBasic>
            </Breakpoint>
            <Contenedor>
                <Breakpoint customQuery='(max-width:768px)'>
                    <CabeceraMovilBasic>
                        <img src={logoginkgopay} alt="logo Ginkgopay" />
                    </CabeceraMovilBasic>
                </Breakpoint>

                {((arrGrupos.filter(grupo => grupo.tipo_usuario === 'administrador')).length !== 0) &&
                    <DivTipoGrupo>
                        <Titulo>MIS GRUPOS</Titulo>
                        <DivIconoNuevo onClick={() => { navigate('/grupos/nuevogrupo') }} />
                    </DivTipoGrupo>
                }
                {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'administrador')).map(grupo => (
                    <GrupoCard key={grupo.id} {...grupo} />
                ))}


                {((arrGrupos.filter(grupo => grupo.tipo_usuario === 'miembro' && grupo.autorizado)).length !== 0) &&
                    <DivTipoGrupo>
                        <Titulo>GRUPOS COMPARTIDOS CONMIGO</Titulo>
                    </DivTipoGrupo>
                }
                {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'miembro' && grupo.autorizado)).map(grupo => (
                    <GrupoCard key={grupo.id} {...grupo} />
                ))}
                {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'miembro' && !grupo.autorizado)).map(grupo => (
                    <GrupoCard key={grupo.id} {...grupo} />
                ))}

                <DivCenterItems>
                    {(arrGrupos.length === 0) && <p>Crea un grupo para poder empezar a compartir gastos</p>}
                    <CustomButton color='dark' destino={'/grupos/nuevogrupo'} > Crear nuevo grupo</CustomButton>
                </DivCenterItems>

            </Contenedor>
        </>
    )
}

export default MisGrupos