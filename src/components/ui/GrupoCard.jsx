import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"
import UserToken from "../../utils/UserToken"

import edit from '../../icons/edit.png'
import validar from '../../icons/validar.png'


const DivContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-around;
    padding: 0.5em ;
    border-bottom: 3px solid ${props => props.autorizado ? '#F6DFA7' : '#CD5220'};
    cursor: ${props => ((props.autorizado && !props.confAutorizar) || (!props.autorizado && !props.confAutorizar)) && 'pointer'} ;
    :first-child{
        border-top: 1px solid ${props => props.autorizado ? '#1D5062' : '#CD5220'};
    }
    :hover{
        background-color: ${props => ((props.autorizado && !props.confAutorizar) || (!props.autorizado && !props.confAutorizar)) && '#F6DFA7'} 
    }
`
const DivTexto = styled.div`
    width: 80%;
    font-size: 0.8em;
    margin-top: 1em;
    margin-bottom:1em;
    @media(min-width: 769px) {
    font-size: 1em;
    }
`
const DivIcono = styled.div`
    width: 1.5em;
    height: 1.5em;
    background-image: url(${edit});
    background-size: cover;
    @media(min-width: 769px) {
    font-size: 1.5em;
    }
`
const DivIconoAutorizar = styled.div`
    width: 1.7em;
    height: 1.7em;
    background-image: url(${validar});
    background-size: cover;
    @media(min-width: 769px) {
    font-size: 1.5em;
    }
`
const DivAutorizar = styled.div`
    width: 100%;
    padding: 0.2em;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`
const TextAutorizar = styled.p`
    font-size: 1em;
    color: #CD5220 ;
`
const ButtonAut = styled.button`
    background-color: ${props => props.color === 'red' ? '#aa390c' : '#418a48'};
    border-radius: 50px; 
    border: none;
    padding: 0.8rem 2rem;
    margin: 0.5em 0 0.5em;
    font-size: 1.3em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    width: 50%;
    color:  white;
    cursor: pointer;
    &:hover{
        color: white;
        background-color: ${props => props.color === 'red' ? '#5f1e05' : '#204824'}
    }
    @media (min-width: 769px) {
    width: 45%;
    font-size: 1.3em;
}
`
const baseUrl = process.env.REACT_APP_API_BASE_URL

const GrupoCard = (grupo) => {

    const navigate = useNavigate()

    const {user_id} = UserToken()
    const [confAutorizar, setConfAutorizar] = useState(false)
    const [autorizado, setAutorizado] = useState(grupo.autorizado)
    const [errorRes, setErrorRes] = useState('')

    const handleClick = (autorizacion) => {
        if (autorizacion) {
            navigate(`/grupos/${grupo.id}`)
        }
        else {
            setConfAutorizar(!confAutorizar)
        }
    }
    const autorizarGrupo = async (id) => {
        const res = await axios.get(`${baseUrl}/groups/${id}/authorization/${user_id}`)
        console.log(res)
        if (res.data.changedRows === 1) {
            setAutorizado(true)
            setConfAutorizar(!confAutorizar)
        } else {
            setErrorRes('Ha habido un error por favor intentalo de nuevo más tarde')
            console.log(errorRes)
            setConfAutorizar(!confAutorizar)
        }
    }

    return (
        <>
            <DivContainer
                onClick={() => { handleClick(grupo.autorizado) }}
                autorizado={autorizado}
                confAutorizar={confAutorizar}>
                <DivTexto autorizado={autorizado}>
                    <p>{grupo.nombre_grupo} </p>
                    {(!autorizado && !confAutorizar) && <TextAutorizar>Valida tu participación en el grupo</TextAutorizar>}

                </DivTexto>
                {autorizado ? <DivIcono /> : <DivIconoAutorizar />}

            </DivContainer>
            {confAutorizar &&
                <DivAutorizar> {
                    (!autorizado && confAutorizar) &&
                    <>
                        <ButtonAut onClick={() => { autorizarGrupo(grupo.id) }} >Autorizar</ButtonAut>
                        <ButtonAut onClick={() => { setConfAutorizar(!confAutorizar) }} color='red'>Ignorar</ButtonAut>
                    </>}
                </DivAutorizar>}
        </>
    )
}

export default GrupoCard