import styled from "styled-components"

const DivRigth = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`

const DivRigthItems = ({ children }) => {

    return (
        <DivRigth>{children}</DivRigth>
    )
}

export default DivRigthItems