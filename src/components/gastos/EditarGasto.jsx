import classes from '../ui/Form.module.css'
import dayjs from "dayjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import UserToken from "../../utils/UserToken"
import DivCenterItems from '../ui/DivCenterItems'
import DivRigthItems from '../ui/DivRigthItems'
import CustomButton from '../ui/CustomButton'
import NavButton from '../ui/NavButton'
import styled from 'styled-components'
import ProgressBar from '../errores/ProgressBar/ProgressBar'
import ErrorPermisos from '../errores/ErrorPermisos'
import ContenedorOnLogin from '../ui/CabeceraContenedor/ContenedorOnLogin'

const ButtonEliminar = styled.div`
    background-color: #CD5220;
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
    font-weight: 300;
    font-size: 1em; 
    color:#1D5062;
`

const baseUrl = process.env.REACT_APP_API_BASE_URL

const EditarGasto = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const { user_id } = UserToken()
    const { idGasto } = useParams()
    const [gasto, setGasto] = useState()
    const [admin, setAdmin] = useState({})
    const [editarNombre, setEditarNombre] = useState()
    const [editarFecha, setEditarFecha] = useState()
    const [editarCantidad, setEditarCantidad] = useState()
    const [errorRes, setErrorRes] = useState()
    const [eliminar, setEliminar] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const gastoRes = await axios.get(`${baseUrl}/expenses/${idGasto}`)
            console.log(gastoRes)
            setGasto(gastoRes.data)

            const participantesRes = await axios.get(`${baseUrl}/users/group/${gastoRes.data.grupo_gasto_id}`)
            setAdmin(participantesRes.data.filter((participante => participante.tipo_usuario === 'administrador'))[0])
        }
        fetchData()

    }, [])

    const onSubmit = async (values) => {
        const gastoModificado = {
            nombre: values.nombre ? values.nombre : gasto.nombre,
            fecha: dayjs(values.fecha ? values.fecha : gasto.fecha).format('YYYY-MM-DD'),
            cantidad: values.cantidad ? values.cantidad : gasto.cantidad,
        }
        const res = await axios.put(`${baseUrl}/expenses/update/${idGasto}`, gastoModificado)
        if (res.data.fatal) {
            setErrorRes(res.data.fatal)
        } else {
            setErrorRes()
            setEditarCantidad()
            setEditarFecha()
            setEditarNombre()
        }
    }


    const onEliminar = async () => {
        const res = await axios.delete(`${baseUrl}/expenses/delete/${idGasto}`)
        if (res.data.fatal) {
            setErrorRes('no se ha podido eliminar el grupo')
        } else {
            navigate(`/grupos/${gasto.grupo_gasto_id}`)

        }
    }

    return (
        <>
            {!gasto ? <ProgressBar /> :
                (user_id === admin.id || user_id === gasto.pagador_id) ? <>

                    <ContenedorOnLogin>
                        <NavButton texto='Volver al grupo' destino={`/grupos/${gasto.grupo_gasto_id}`} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.ContainerInputEdit}>
                                <div className={classes.ContainerInput}>
                                    <div onClick={() => { setEditarNombre(!editarNombre) }} className={classes.DivEdit}></div>
                                    <input className={classes.InputEdit} type="text"
                                        defaultValue={gasto.nombre}
                                        disabled={!editarNombre ? true : false}
                                        {...register('nombre')} />
                                </div>
                                <label className={classes.LabelEdit}>Nombre</label>
                            </div>

                            <div className={classes.ContainerInputEdit}>
                                <div className={classes.ContainerInput}>
                                    <div onClick={() => { setEditarFecha(!editarFecha) }} className={classes.DivEdit}></div>
                                    <input className={classes.InputEdit} type="text"
                                        defaultValue={dayjs(gasto.fecha).format('DD/MM/YYYY')}
                                        disabled={!editarFecha ? true : false}
                                        {...register('fecha')} />
                                </div>
                                <label className={classes.LabelEdit}>Fecha</label>
                            </div>
                            <div className={classes.ContainerInputEdit}>
                                <div className={classes.ContainerInput}>
                                    <div onClick={() => { setEditarCantidad(!editarCantidad) }} className={classes.DivEdit}></div>
                                    <input className={classes.InputEdit} type="text"
                                        defaultValue={gasto.cantidad}
                                        disabled={!editarCantidad ? true : false}
                                        {...register('cantidad')} />
                                </div>
                                <label className={classes.LabelEdit}>Cantidad €</label>
                            </div>
                            <div className={classes.ContainerButtonEdit}>
                                {(editarCantidad || editarFecha || editarNombre) &&
                                    <DivRigthItems > <button className={classes.ButtonEdit} type="submit">Modificar</button></DivRigthItems>}
                            </div>
                        </form>
                        {errorRes && <p className={classes.TextoErrorBack}> {errorRes} </p>}
                        <DivCenterItems><CustomButton color='dark' destino={`/gastos/editargasto/${idGasto}/repartir/${gasto.grupo_gasto_id}`}> Editar reparto</CustomButton></DivCenterItems>

                        {!eliminar ?
                            <DivCenterItems>
                                <ButtonEliminar onClick={() => setEliminar(true)}> Eliminar gasto </ButtonEliminar>
                            </DivCenterItems>
                            :
                            <DivConfEliminar>
                                <p>¿Estas seguro de eliminar el gasto? </p>
                                <p>El borrado será definitivo</p>
                                <DivCenterItems>
                                    <ButtonEliminar onClick={() => { onEliminar() }}> Eliminar definitivamente </ButtonEliminar>
                                </DivCenterItems>
                            </DivConfEliminar>}
                    </ContenedorOnLogin>
                </>
                    :
                    <>
                        <NavButton texto='Volver a mis grupos' destino={'/grupos'} />
                        <ErrorPermisos />
                    </>}
        </>
    )
}

export default EditarGasto

/* 

PUT {{url}}/api/expenses/update/14
Content-Type: application/json

{
    "nombre": "prueba de gasto modificado con pagos", 
    "fecha": "2023-02-02", 
    "cantidad": "500.80"
}
*/