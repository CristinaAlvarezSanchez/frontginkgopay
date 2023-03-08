import classes from '../ui/Form.module.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'
import UserToken from "../../utils/UserToken"
import ProgressBar from '../errores/ProgressBar/ProgressBar'
import NavButton from '../ui/NavButton'
import ErrorPermisos from '../errores/ErrorPermisos'
import ContenedorOnLogin from '../ui/CabeceraContenedor/ContenedorOnLogin'
import dayjs from 'dayjs'


const baseUrl = process.env.REACT_APP_API_BASE_URL

const NuevoGasto = () => {
    const { idGrupo } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { user_id } = UserToken()

    const [participantes, setParticipantes] = useState([])
    const [errorRes, setErrorRes] = useState('')
    const [permisos, setPermisos] = useState(true)

    console.log(user_id)
    useEffect(() => {
        const fetchData = async () => {
            const participantesRes = await axios.get(`${baseUrl}/users/group/${idGrupo}`)
            setParticipantes(participantesRes.data)
            const editorIndex = participantesRes.data.findIndex(participante => participante.id === user_id)
            console.log(editorIndex)
            if (editorIndex === -1) { setPermisos(false) }
        }
        fetchData()
    }, [])

    const classError = (error) => {
        if (error) {
            return `${classes.LabelError}`
        }
    }
    const onSubmit = async (values) => {
        const nuevoGasto = {
            cantidad: values.cantidad.replace(/,/, '.'),
            fecha: values.fecha,
            grupo_gasto_id: values.grupo_gasto_id,
            id: values.id,
            nombre: values.nombre,
            pagador_id: values.pagador_id
        }
        const res = await axios.post(`${baseUrl}/expenses/new`, nuevoGasto)

        if (res.data.fatal) {
            setErrorRes(res.data.fatal)
        } else {
            setErrorRes('')
            const arrReparto = []
            let asignacion
            participantes.map(participante => {
                arrReparto.push({
                    usuario_id: participante.id,
                    gasto_id: res.data.id,
                    participacion: (1 / participantes.length)
                })
            })
            arrReparto.forEach(reparto => {
                const envioData = async () => {
                    asignacion = await axios.post(`${baseUrl}/expenses/share`, reparto)
                }
                envioData()
            });
            navigate(`/gastos/nuevogasto/${res.data.id}/repartir/${idGrupo}/${user_id}`)
        }
    }
    console.log(participantes)
    return (
        <>
            {!participantes ? <ProgressBar /> :
                permisos ? <>
                    <ContenedorOnLogin>
                        <NavButton texto='Volver al grupo' destino={`/grupos/${idGrupo}`} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.ContainerForm}>

                                <label>NOMBRE</label>
                                <input type="text"
                                    className={classError(errors.nombre)}
                                    {...register('nombre', {
                                        required: true
                                    })} />
                                {(errors.nombre?.type === 'required') && <p className={classes.TextoError}>Debes incluir un nombre para el gasto</p>}


                                <label>FECHA DE GASTO</label>
                                <input type="date"
                                    className={classError(errors.fecha)}
                                    {...register('fecha', {
                                        required: true
                                    })} />
                                {(errors.fecha?.type === 'required') && <p className={classes.TextoError}>Debes incluir una fecha de pago</p>}

                                <label>CANTIDAD €</label>
                                <input
                                    className={classError(errors.cantidad)}
                                    {...register('cantidad', {
                                        required: true,
                                    })} />
                                {(errors.cantidad?.type === 'required') && <p className={classes.TextoError}>Debes indicar cuanto dinero has gastado</p>}

                                <input
                                    className={classes.Oculto}
                                    defaultValue={idGrupo}
                                    {...register('grupo_gasto_id')}
                                />

                                <label>PAGADO POR</label>
                                <select
                                    className={classError(errors.usuario_id)}
                                    {...register('usuario_id', {
                                        required: true,
                                        minLength: 1
                                    })}>
                                    <option> </option>
                                    {participantes.map(participante => <option key={participante.id} value={participante.id}>{participante.alias}</option>)}
                                </select>
                                {(errors.usuario_id?.type === 'minLength') && <p className={classes.TextoError}>Debes indicar quien ha pagado</p>}
                                <div className={classes.CenterItems}>
                                    <button type="submit">Crear gasto</button>
                                </div>
                                <div className={classes.CenterItems}>
                                    <p className={classes.TextoError}> {errorRes}</p>
                                </div>
                            </div>
                        </form>
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

export default NuevoGasto