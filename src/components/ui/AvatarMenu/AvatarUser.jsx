import classes from '../AvatarMenu/AvatarMenu.module.css'
import styled from "styled-components"
import avatar from '../../../images/avatar.png'
import { useLocalStorage } from 'react-use'
import { Link, useNavigate } from 'react-router-dom'

const DivAvatar = styled.div`
    border-radius: 50px;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    @media (min-width: 769px){
        height: 4rem;
        width: 4rem;
}
`
const ImgAvatar = styled.div`
    border-radius: 50px;
    background-image: url(${avatar});
    background-size: cover;
    height: 100%;
    width: 100%;
    border: 5px solid #FDE8B7;
`
const ItemMenu = styled.p`
    font-family: 'Arimo', sans-serif;
    font-size: 1em; 
    margin-top: 0.8em;
    margin-bottom: 0.8em;
    cursor: pointer;
    color: #1D5062;
    text-decoration: none;
    :hover{
        color:#CD5220 ;
    }
`
const ItemLogout = styled.p`
    font-family: 'Arimo', sans-serif;
    font-size: 1em; 
    margin-top: 1.4em;
    margin-bottom: 0.8em;
    cursor: pointer;
    color: #CD5220;
    :hover{
        color:#1D5062 ;
    }
`


const AvatarUser = () => {

    const [token, setToken, remove] = useLocalStorage('token')
    const navigate = useNavigate()

    const onLogOut = () => {
        remove(token)
        navigate('/login')
    }

    return (
        <div className={classes.dropdown}>
            <div className={classes.dropdownTrigger}>
                <DivAvatar>
                    <ImgAvatar />
                </DivAvatar>
            </div>
            <div className={classes.dropdownContent}>
                <div className={classes.dropdownBody}>
                    <Link to={'/editarperfil'}>
                        <ItemMenu>Editar perfil</ItemMenu>
                    </Link>
                    <Link to={'/grupos'}>
                        <ItemMenu>Mis grupos</ItemMenu>
                    </Link>
                    <ItemLogout onClick={() => { onLogOut() }}>Logout</ItemLogout>
                </div>
            </div>
        </div>
    )

}

export default AvatarUser