import styled from "styled-components";

const ContainerSaldo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: baseline;
    gap: 0.5em; 
    width: 100%;
    border-bottom: 3px solid #F6DFA7;
    padding: 1em;
`

const TextoAlias = styled.p`
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
    font-size: 1.5em;
    color: ${props => props.saldo >= 0 ? 'green' : 'red'};
    margin: 5px;
`
const SaldoCard = ({ alias, saldo }) => {
    return (
        <ContainerSaldo>
            <TextoAlias>{alias}</TextoAlias>
            <TextoCantidad saldo={saldo}>{saldo.toFixed(2)}€</TextoCantidad>
        </ContainerSaldo>

    )

}

export default SaldoCard