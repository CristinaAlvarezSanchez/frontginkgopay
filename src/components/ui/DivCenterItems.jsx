import styled from "styled-components"

const DivCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DivCenterItems = ({ children }) => {

    return (
        <DivCenter>{children}</DivCenter>
    )
}

export default DivCenterItems