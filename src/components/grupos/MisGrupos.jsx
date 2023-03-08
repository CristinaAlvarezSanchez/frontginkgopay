import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserToken from "../../utils/UserToken"


import GrupoCard from "../ui/GrupoCard"
import mas from '../../icons/mas.png'
import mashover from '../../icons/mashover.png'
import CustomButton from "../ui/CustomButton"
import DivCenterItems from "../ui/DivCenterItems"
import NavButton from "../ui/NavButton"
import ErrorPermisos from "../errores/ErrorPermisos"
import ProgressBar from "../errores/ProgressBar/ProgressBar"
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"


const DivTipoGrupo = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 15px;
    align-items: center;
    width: 100%;
    padding:1.2em;
    background-color: #F6DFA7;
    margin-top: 70px;
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
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MisGrupos = () => {

    const [arrGrupos, setArrGrupos] = useState([]);
    const navigate = useNavigate()
    const { user_id } = UserToken()


    useEffect(() => {
        if (user_id) {
            const fetchData = async () => {
                const res = await axios.get(`${baseUrl}/groups/user/${user_id}`)
                setArrGrupos(res.data)
            }
            fetchData()
        }
    }, [])

    return (
        <>
            {user_id ?
                <>
                    <ContenedorOnLogin>
                        <DivCenterItems>
                            {(arrGrupos.length === 0) && <p>Crea un grupo para poder empezar a compartir gastos</p>}
                        </DivCenterItems>
                        <DivTipoGrupo>
                            <Titulo>MIS GRUPOS</Titulo>
                            <DivIconoNuevo onClick={() => { navigate('/grupos/nuevogrupo') }} />
                        </DivTipoGrupo>

                        {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'administrador')).map(grupo => (
                            <GrupoCard key={grupo.id} {...grupo} />
                        ))}
                        <DivTipoGrupo>
                            <Titulo>GRUPOS COMPARTIDOS CONMIGO</Titulo>
                        </DivTipoGrupo>

                        {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'miembro' && grupo.autorizado)).map(grupo => (
                            <GrupoCard key={grupo.id} {...grupo} />
                        ))}
                        {(arrGrupos.filter(grupo => grupo.tipo_usuario === 'miembro' && !grupo.autorizado)).map(grupo => (
                            <GrupoCard key={grupo.id} {...grupo} />
                        ))}

                        <DivCenterItems>

                            <CustomButton color='dark' destino={'/grupos/nuevogrupo'} > Crear nuevo grupo</CustomButton>
                        </DivCenterItems>

                    </ContenedorOnLogin>
                </>
                :
                <>
                    <NavButton texto='Login' destino={'/login'} />
                    <ErrorPermisos />
                </>
            }

        </>
    )
}

export default MisGrupos