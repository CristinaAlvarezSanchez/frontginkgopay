import styled from "styled-components"

const DivCabeceraMovil = styled.div`
margin-top: 2em;
margin-bottom: 2em;
width: 50%;
`

const CabeceraMovilBasic = ({ children }) => {
    return (
        <DivCabeceraMovil>
            {children}
        </DivCabeceraMovil>
    )
}

export default CabeceraMovilBasic