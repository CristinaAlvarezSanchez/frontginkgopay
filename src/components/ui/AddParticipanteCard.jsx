import styled from "styled-components"
import UserToken from "../../utils/UserToken"
import deleteicon from '../../icons/deleteicon.png'
import deleteiconhover from '../../icons/deleteiconhover.png'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em; 
    border-bottom: 3px solid #F6DFA7;
    padding: 1em;
`

const TextoNombre = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.3em;
    color: #1D5062;
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
const DivEliminar = styled.div`
    width: 1.7em;
    height: 1.7em;
    background-image: url(${deleteicon});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${deleteiconhover});
    }
    @media(min-width: 769px) {
    width: 2em;
    height:2em;
    }
`

const AddParticipanteCard = ({ usuario, onBorrar, error }) => {

    const {user_id} = UserToken()

    return (
        <>
            <Container>
                <TextoNombre> {usuario.alias}</TextoNombre>
                {usuario.id !== user_id &&
                    <DivEliminar onClick={() => { onBorrar(usuario.id) }} />}
            </Container>
            {error.userId === usuario.id && <>
                <DivError>
                    <TextoError>{usuario.alias} {error.mensaje}</TextoError>
                </DivError>
            </>}
        </>
    )

}

export default AddParticipanteCard