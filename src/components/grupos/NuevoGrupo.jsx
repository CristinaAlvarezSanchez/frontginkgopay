import classes from '../ui/Form.module.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import UserToken from "../../utils/UserToken"

import CustomButton from '../ui/CustomButton'
import ContenedorOnLogin from '../ui/CabeceraContenedor/ContenedorOnLogin'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const NuevoGrupo = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [errorRes, setErrorRes] = useState('')
    const { user_id } = UserToken()

    const onSubmit = async (values) => {
        const res = await axios.post(`${baseUrl}/groups/new/${user_id}`, values)
        if (!res.data.id) {
            setErrorRes('no se ha creado ningún grupo nuevo')
        } else {
            setErrorRes('')
            navigate(`/grupos/nuevogrupo/participantes/${res.data.id}`)
        }
    }
    const classError = (error) => {
        if (error) {
            return `${classes.LabelError}`
        }
    }
    return (
        <>
        
            <ContenedorOnLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.ContainerForm}>
                        <label>NOMBRE DEL GRUPO</label>
                        <input type="text"
                            className={classError(errors.nombre)}
                            {...register('nombre', {
                                required: true
                            })} />
                        {(errors.nombre?.type === 'required') && <p className={classes.TextoError}>Debes incluir un nombre para el grupo</p>}
                        <div className={classes.CenterItems}>
                            <button type="submit">Crear nuevo grupo</button>
                        </div>
                    </div>
                    <div className={classes.CenterItems}>
                        <p className={classes.TextoError}> {errorRes}</p>
                    </div>
                </form>
                <div className={classes.CenterItems}>
                    <p> ¿Quieres ver todos tus grupos? </p>
                    <CustomButton color='ligth' destino={'/grupos'}> Ver mis grupos</CustomButton>
                </div>
            </ContenedorOnLogin>
        </>
    )

}

export default NuevoGrupo