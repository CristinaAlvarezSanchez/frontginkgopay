import classes from '../ui/Form.module.css'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from 'react'

import CustomButton from '../ui/CustomButton'
import { useLocalStorage } from 'react-use'
import ContenedorNoLogin from '../ui/CabeceraContenedor/ContenedorNoLogin'
import { useSetLoggedContext } from '../../providers/LoggedProvider'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Login = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const setIsLogged = useSetLoggedContext()
    const [token, setToken] = useLocalStorage('token')
    const [errorRes, setErrorRes] = useState('')

    const onSubmit = async (values) => {
        const res = await axios.post(`${baseUrl}/users/login`, values)
        if (res.data.fatal) {
            setErrorRes(res.data.fatal)
        } else {
            setErrorRes('')
            setToken(res.data.token)
            setIsLogged(true)
            navigate('/grupos')
        }
    }

    const classError = (error) => {
        if (error) {
            return `${classes.LabelError}`
        }
    }

    return (
        <>
            <ContenedorNoLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.ContainerForm}>
                        <label> CORREO ELECTRÓNICO</label>
                        <input type="email"
                            className={classError(errors.email)}
                            {...register('email', {
                                required: true,
                            })} />
                        {(errors.email?.type === 'required') && <p className={classes.TextoError}>Debes incluir un correo electrónico para identificarte</p>}

                        <label> CONTRASEÑA</label>
                        <input type="password"
                            className={classError(errors.password)}
                            {...register('password', {
                                required: true
                            })} />
                        {(errors.password?.type === 'required') && <p className={classes.TextoError}>Debes incluir una contraseña para acceder</p>}

                        {errorRes && <p className={classes.TextoErrorBack}> El correo electrónico y/o contraseña introducido no es válido </p>}
                        <div className={classes.CenterItems}>
                            <button type="submit">Enviar</button>
                        </div>
                    </div>
                </form>
                <div className={classes.CenterItems}>
                    <p> ¿Aún no te has registrado? </p>
                    <CustomButton color='ligth' destino={'/registro'}> Crear una cuenta</CustomButton>
                </div>

            </ContenedorNoLogin>
        </>
    )
}

export default Login