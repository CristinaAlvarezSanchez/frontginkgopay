import styled from "styled-components"

const ContainerDiv = styled.div`
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 3px solid #F6DFA7;
    min-height:6em;
`
const Label = styled.div`
width: 40%;
    color: #1D5062;
    font-family: 'Arimo', sans-serif;
    font-size: 1.3em;
    display: block;
   
`
const ContainerCantidad = styled.div`
display: flex;
min-width: 30%; 
align-items: center;
justify-content: end;
gap: 2em;
`
const Input = styled.input`
display: block;
background-color :#F6DFA7 ;
min-width:30%;
margin: 0;
`
const AddManualRepartoGasto = ({ participante, register }) => {
    return (
        <>
            <ContainerDiv>
                <ContainerCantidad>
                    <Input type="text"
                        {...register(`${participante.alias}`)} />
                    <p>€</p>
                </ContainerCantidad>
                <Label> {participante.alias}</Label>
            </ContainerDiv></>)

}

export default AddManualRepartoGasto