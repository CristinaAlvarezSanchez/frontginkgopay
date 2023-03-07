import styled from "styled-components"

import errorpig from '../../images/errorpig.png'
import DivCenterItems from "../ui/DivCenterItems"

const DivImagenError = styled.div`
width: 300px;
background-size: cover;
background-image: url(${errorpig}); 
height: 300px;
margin: 2em;
`

const ErrorPermisos =()=>{

    return(
        
        <DivCenterItems><DivImagenError> </DivImagenError>
        <p>No tienes permisos para acceder aquí</p></DivCenterItems>
        
    )


}

export default ErrorPermisos 