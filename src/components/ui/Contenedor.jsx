import styled from "styled-components"

const DivContenedor = styled.div`
display: flex;
flex-direction: column;
width: 90%;
margin: 0 auto;
@media (min-width: 769px){
width: 80%;
}
`
const Contenedor = ({ children }) => {
    return (
        <DivContenedor>{children}</DivContenedor>
    )
}

export default Contenedor 