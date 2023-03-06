import styled from "styled-components"

const ContainerDiv = styled.div`
width: 100%;
padding: 1em;
display: flex;
flex-direction: row;
justify-content: start;
flex-wrap: wrap;
align-items: center;
gap: 2em;
border-bottom: 3px solid #F6DFA7;
min-height:6em;
`
const DivCheckAlias = styled.div`
width: 50%;
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1em;
@media(min-width: 769px) {
    flex-direction: row;
    }
`
const DivColumnCantidades = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1em;
@media(min-width: 769px) {
    flex-direction: row;
    }
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

const CantidadesDiv = styled.div`
    color: #1D5062;
    font-family: 'Source Sans Pro', sans-serif; 
    font-weight: 300;
    font-size: 1em;
`


const AddCheckRepartoGasto = ({ participante, cantidad, onCheckParticipante }) => {
    const proporcion = parseFloat(participante.participacion).toFixed(2)
    const cantidadPagada = parseFloat(participante.participacion*cantidad).toFixed(2)

    return (
        <ContainerDiv>
            <DivCheckAlias>
                <CheckBox
                    type="checkbox"
                    value={participante.alias}
                    onChange={(e) => {
                        onCheckParticipante(e)
                    }}
                    defaultChecked={parseFloat(participante.participacion) === 0 ? false : true} />
                <AliasDiv><p>{participante.alias}</p></AliasDiv>
            </DivCheckAlias>
            <DivColumnCantidades>
                <DivColumnCantidades>
                    <p>Proporcion: </p>
                    <CantidadesDiv><p>{proporcion}</p></CantidadesDiv>
                </DivColumnCantidades>
                <DivColumnCantidades>
                    <p>Cantidad: </p>
                    <CantidadesDiv><p>{cantidadPagada}€</p></CantidadesDiv>
                </DivColumnCantidades>
            </DivColumnCantidades>

        </ContainerDiv>

    )
}

export default AddCheckRepartoGasto