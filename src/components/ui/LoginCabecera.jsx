import styled from 'styled-components'
import Login from '../../icons/login.svg'

const DivContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 0.5em;


`

const LoginCabecera =()=>{
return(
<>
<DivContainer>
    <div>
<img style={{height:'2em'}} src={Login} alt="" />
</div>
<p style={{fontSize:'1.5em'}}>Sing in</p>
</DivContainer>
</>

)


}

export default LoginCabecera