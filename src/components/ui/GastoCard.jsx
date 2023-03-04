import dayjs from "dayjs"
import styled from "styled-components"
import UserToken from "../../utils/UserToken"

import editgasto from '../../icons/editgasto.png'
import editgastohover from '../../icons/editgastohover.png'
import { useNavigate } from "react-router-dom"


const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5em; 
    border-bottom: 3px solid #F6DFA7;
    padding: 1em;
`
const ContainerGasto = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em; 
    width: 100%;
`
const ContainerEditar = styled.div`
display: flex;
flex-direction:column;
width: 50px;
height: 100px;
align-items: center;
`

const DivEdit = styled.div`
    width: 1.5em;
    height: 1.5em;
    background-image: url(${editgasto});
    background-size: cover;
    cursor: pointer;
    :hover{
        background-image: url(${editgastohover});
    }
`
const ContainerPrecio = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    gap: 20px;
    width: 100%;
`

const TextoNombre = styled.p`
    margin-top: 1.2em;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
    font-size: 1em;
    color: #1D5062;
    margin: 5px;
`
const TextoCantidad = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
    font-size: 1em;
    color: #1D5062;
    margin: 5px;
`
const TextoOtros = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
    font-size: 1em;
    color: #1D5062;
    margin: 5px;
`
const GastoCard = ({ administrador, gasto }) => {
    const navigate = useNavigate()
    const { user_id } = UserToken()
    return (
        <Container>
            <ContainerGasto>
                <TextoNombre>{gasto.nombre.toUpperCase()}</TextoNombre>
                <TextoOtros>Pagado por {gasto.pagador_alias}</TextoOtros>
                <ContainerPrecio>
                    <TextoCantidad>{gasto.cantidad} €</TextoCantidad>
                    <TextoOtros>{dayjs(gasto.fecha).format('DD/MM/YYYY')}</TextoOtros>
                </ContainerPrecio>
            </ContainerGasto>
            {(administrador.id === user_id || gasto.pagador_id === user_id) &&
                <ContainerEditar><DivEdit onClick={() => { navigate(`/gastos/editargasto/${gasto.id}`) }} /></ContainerEditar>
            }

        </Container>
    )

}

export default GastoCard