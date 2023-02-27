import styled from "styled-components"

const DivCabeceraMovil = styled.div`
margin: 6em auto 4em;
width: 90%;
`

const CabeceraMovilBasic = ({ children }) => {
    return (
        <DivCabeceraMovil>
            {children}
        </DivCabeceraMovil>
    )
}

export default CabeceraMovilBasic