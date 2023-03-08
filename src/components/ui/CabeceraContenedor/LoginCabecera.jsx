import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Login from '../../../icons/login.svg'

const DivContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 0.2em;
cursor: pointer;
&:hover{
        color: white;
    }
`
const Loginp = styled.p`
    font-family: 'Arimo', sans-serif;   
    font-size: 1em;
`

const LoginCabecera = () => {
    const navigate = useNavigate()

    return (
        <DivContainer onClick={() => { navigate('/login') }}>
            <div>
                <img style={{ height: '2em' }} src={Login} alt="" />
            </div>
            <Loginp>Sing in</Loginp>
        </DivContainer>
    )


}

export default LoginCabecera