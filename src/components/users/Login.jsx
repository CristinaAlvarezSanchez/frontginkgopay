import classes from '../ui/Form.module.css'
import { useNavigate } from "react-router-dom"
import { Breakpoint } from "react-socks"
import { useForm } from "react-hook-form"

import CabeceraDeskBasic from "../ui/CabeceraDeskBasic"
import logoginkgopay from '../../logoginkgopay.svg'
import Contenedor from '../ui/Contenedor'
import CabeceraMovilBasic from '../ui/CabeceraMovilBasic'
import CustomButton from '../ui/CustomButton'


const Login = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = (values) => {
        console.log(values)
        reset()
    }

    const classError = (error) => {
        if (error) {
            return `${classes.LabelError}`
        }
    }

    return (
        <>
            <Breakpoint customQuery='(min-width:769px)'>
                <CabeceraDeskBasic></CabeceraDeskBasic>
            </Breakpoint>
            <Contenedor>
                <Breakpoint customQuery='(max-width:768px)'>
                    <CabeceraMovilBasic>
                        <div>
                            <img onClick={() => navigate('/')} src={logoginkgopay} alt="logo Ginkgopay" />
                        </div>
                    </CabeceraMovilBasic>
                </Breakpoint>
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

                        <div className={classes.CenterItems}>
                            <button type="submit">Enviar</button>
                        </div>

                    </div>
                </form>
                <div className={classes.CenterItems}>
                    <p> ¿Aún no te has registrado? </p>
                    <CustomButton color='ligth' destino={'/registro'}> Crear una cuenta</CustomButton>
                </div>

            </Contenedor>
        </>

    )

}

export default Login