import styled from "styled-components"
import personadd from '../../icons/personadd.png'
import personaddhover from '../../icons/personaddhover.png'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em; 
    border-bottom: 3px solid #F6DFA7;
    padding-inline-end: 1em;
    padding-inline-start: 1em; 
    background-color: #F6DFA7;
    margin-bottom: 3px;
`
const DivNombre = styled.div`
    display: flex;
    justify-content: start;
    gap: 1.5em;
    align-items: baseline;
    padding: 1em;
`
const TextoAlias = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.3em;
    color: #1D5062;
`
const TextoNombre = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    font-weight: 300;
    color: #3a6d7d;
`
const DivAddPerson = styled.div`
    width: 1.7em;
    height: 1.7em;
    background-image: url(${personadd});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${personaddhover});
    }
    @media(min-width: 769px) {
    width: 2em;
    height:2em;
    }
`

const DivError = styled.div`
    background-color: #CD5220;
    padding: 0.8em;
`
const TextoError = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1em;
    color: white;
    text-align: center;
`

const AddParcipanteSearchCard = ({ usuario, onAddUsuario, error }) => {
    return (
        <>
            <Container>
                <DivNombre>
                    <TextoAlias>{usuario.alias}</TextoAlias>
                    <TextoNombre>{usuario.nombre} {usuario.apellidos}</TextoNombre>
                </DivNombre>
                <DivAddPerson onClick={() => { onAddUsuario(usuario) }} />

            </Container>



            {error.userId === usuario.id && 
            <DivError>
                <TextoError>{usuario.alias} {error.mensaje}</TextoError>
            </DivError>}

        </>
    )
}

export default AddParcipanteSearchCard