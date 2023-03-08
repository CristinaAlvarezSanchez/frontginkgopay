import classes from '../ui/Form.module.css'
import ContenedorOnLogin from "../ui/CabeceraContenedor/ContenedorOnLogin"
import axios from "axios"
import styled from 'styled-components'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useLocalStorage } from 'react-use'

import UserToken from "../../utils/UserToken"
import DivCenterItems from '../ui/DivCenterItems'
import DivRigthItems from '../ui/DivRigthItems'
import CustomButton from '../ui/CustomButton'
import NavButton from '../ui/NavButton'
import ProgressBar from '../errores/ProgressBar/ProgressBar'
import ErrorPermisos from '../errores/ErrorPermisos'

const ButtonEliminar = styled.div`
    
    color: white;
    border-radius: 50px;
    border: none;
    padding: 0.8em;
    font-size: 1.2em;
    font-family: 'Arimo', sans-serif;
    text-decoration: none;
    cursor: pointer;
    margin-top: 2em;
    text-align:center;
    width:100%;
    :hover{
    background-color: #ee9b53;
    }
    @media(min-width: 769px) {
        width:45%; 
    }
    `
const DivConfEliminar = styled.div`
    background-color:#e18f6e; 
    color:white; 
    padding: 0.8em; 
    margin-top: 1em;  
    text-align: center;
    `
const Aviso = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 800;
    font-size: 1.2em; 
    color:#1D5062;
`

const baseUrl = process.env.REACT_APP_API_BASE_URL

const EditUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [token, setToken, remove] = useLocalStorage('token')


    const { user_id } = UserToken()
    const [user, setUser] = useState()

    const [editarNombre, setEditarNombre] = useState()
    const [editarApellidos, setEditarApellidos] = useState()
    const [editarAlias, setEditarAlias] = useState()
    const [editarEmail, setEditarEmail] = useState()
    const [editarPassword, setEditarPassWord] = useState()
    const [errorRes, setErrorRes] = useState()
    const [eliminar, setEliminar] = useState(false)
    const [errorEliminado, setErrorEliminado] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${baseUrl}/users/${user_id}`)
            setUser(res.data)
        }
        fetchData()

    }, [])

    const onSubmit = async (values) => {
        const userModificado = {
            nombre: values.nombre ? values.nombre : user.nombre,
            apellidos: values.apellidos ? values.apellidos : user.apellidos,
            alias: values.alias ? values.alias : user.alias,
            email: values.email ? values.email : user.email,
            password: user.password,
        }

        const res = await axios.put(`${baseUrl}/users/update/${user_id}`, userModificado)
        if (res.data.fatal) {
            setErrorRes(res.data.fatal)
        } else {
            setErrorRes()
            setEditarNombre()
            setEditarApellidos()
            setEditarEmail()
            setEditarAlias()
        }
    }

    const onComprobarEliminar = async () => {
        const res = await axios.get(`${baseUrl}/groups/user/${user_id}`)
        if (res.data.fatal) {
            setErrorRes('no se ha podido eliminar el usuario intentalo más tarde')
        } else {
            (res.data.length > 1) ?
                setErrorRes('Tienes grupos activos, debes abandonarlos para eliminar el usuario')
                : setEliminar(true)
        }
    }

    const onEliminar = async () => {
        const res = await axios.delete(`${baseUrl}/users/delete/${user_id}`)
        if (res.data.fatal) {
            setErrorRes('no se ha podido eliminar el usuario intentalo más tarde')
        } else {
            remove(token)
            navigate('/')
        }

    }

    return (

        user &&
        <ContenedorOnLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.ContainerInputEdit}>
                    <div className={classes.ContainerInput}>
                        <div onClick={() => { setEditarNombre(!editarNombre) }} className={classes.DivEdit}></div>
                        <input className={classes.InputEdit} type="text"
                            defaultValue={user.nombre}
                            disabled={!editarNombre ? true : false}
                            {...register('nombre')} />
                    </div>
                    <label className={classes.LabelEdit}>Nombre</label>
                </div>

                <div className={classes.ContainerInputEdit}>
                    <div className={classes.ContainerInput}>
                        <div onClick={() => { setEditarApellidos(!editarApellidos) }} className={classes.DivEdit}></div>
                        <input className={classes.InputEdit} type="text"
                            defaultValue={user.apellidos}
                            disabled={!editarApellidos ? true : false}
                            {...register('apellidos')} />
                    </div>
                    <label className={classes.LabelEdit}>Apellidos</label>
                </div>
                <div className={classes.ContainerInputEdit}>
                    <div className={classes.ContainerInput}>
                        <div onClick={() => { setEditarAlias(!editarAlias) }} className={classes.DivEdit}></div>
                        <input className={classes.InputEdit} type="text"
                            defaultValue={user.alias}
                            disabled={!editarAlias ? true : false}
                            {...register('alias')} />
                    </div>
                    <label className={classes.LabelEdit}>Alias</label>
                </div>
                <div className={classes.ContainerInputEdit}>
                    <div className={classes.ContainerInput}>
                        <div onClick={() => { setEditarEmail(!editarEmail) }} className={classes.DivEdit}></div>
                        <input className={classes.InputEdit} type="text"
                            defaultValue={user.email}
                            disabled={!editarEmail ? true : false}
                            {...register('email')} />
                    </div>
                    <label className={classes.LabelEdit}>Email</label>
                </div>

                <div className={classes.ContainerButtonEdit}>
                    {(editarNombre || editarApellidos || editarEmail || editarAlias || editarPassword) &&
                        <DivRigthItems > <button className={classes.ButtonEdit} type="submit">Modificar</button></DivRigthItems>}
                </div>
            </form>
            {errorRes && <p className={classes.TextoErrorBack}> {errorRes} </p>}

            {!eliminar ?
                <DivCenterItems>
                    <ButtonEliminar onClick={() => onComprobarEliminar()}> Eliminar usuario </ButtonEliminar>
                </DivCenterItems>
                :
                <DivConfEliminar>
                    <Aviso>¿Estas seguro de eliminar tu usuario? </Aviso>
                    <Aviso>El borrado será definitivo</Aviso>
                    <DivCenterItems>
                        <ButtonEliminar onClick={() => { onEliminar() }}> Eliminar definitivamente </ButtonEliminar>
                    </DivCenterItems>
                </DivConfEliminar>}


        </ContenedorOnLogin>
    )

}

export default EditUser