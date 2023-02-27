import classes from '../ui/Form.module.css'
import { useNavigate } from "react-router-dom"
import { Breakpoint } from "react-socks"
import { useForm } from "react-hook-form"

import logoginkgopay from '../../logoginkgopay.svg'
import CabeceraDeskBasic from "../ui/CabeceraDeskBasic"
import CabeceraMovilBasic from "../ui/CabeceraMovilBasic"
import Contenedor from "../ui/Contenedor"
import LoginCabecera from "../ui/LoginCabecera"
import CustomButton from '../ui/CustomButton'

const Registro = () => {

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
                <CabeceraDeskBasic><LoginCabecera destino={'/login'} /></CabeceraDeskBasic>
            </Breakpoint>
            <Contenedor>
                <Breakpoint customQuery='(max-width:768px)'>
                    <CabeceraMovilBasic>
                        <img onClick={() => navigate('/')} src={logoginkgopay} alt="logo Ginkgopay" />
                    </CabeceraMovilBasic>
                </Breakpoint>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.ContainerForm}>
                        <label>NOMBRE</label>
                        <input type="text"
                            className={classError(errors.nombre)}
                            {...register('nombre', {
                                required: true
                            })} />
                        {(errors.nombre?.type === 'required') && <p className={classes.TextoError}>Debes incluir un nombre para darte de alta</p>}

                        <label>APELLIDOS</label>
                        <input type="text"
                            className={classError(errors.apellidos)}
                            {...register('apellidos', {
                                required: true
                            })} />
                        {(errors.apellidos?.type === 'required') && <p className={classes.TextoError}>Debes incluir un apellido para darte de alta</p>}

                        <label>ALIAS</label>
                        <input type="text"
                            className={classError(errors.alias)}
                            {...register('alias', {
                                required: true,
                                maxLength: 15
                            })} />
                        {(errors.alias?.type === 'required') && <p className={classes.TextoError}>Debes incluir un alias para darte de alta</p>}
                        {(errors.alias?.type === 'maxLength') && <p className={classes.TextoError}>El alias debe tener como máximo 15 caracteres</p>}

                        <label>CORREO ELECTRÓNICO</label>
                        <input type="email"
                            className={classError(errors.email)}
                            {...register('email', {
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                            })} />
                        {(errors.email?.type === 'required') && <p className={classes.TextoError}>Debes incluir un correo electrónico para darte de alta</p>}
                        {(errors.email?.type === 'pattern') && <p className={classes.TextoError}>Debes introducir un correo electrónico válido</p>}

                        <label> CONTRASEÑA</label>
                        <input type="password"
                            className={classError(errors.password)}
                            {...register('password', {
                                required: true
                            })} />
                        {(errors.password?.type === 'required') && <p className={classes.TextoError}>Debes incluir una contraseña para darte de alta</p>}

                        <div className={classes.CenterItems}>
                            <button type="submit">Darme de alta</button>
                        </div>
                    </div>
                </form>
                <Breakpoint customQuery='(max-width:768px)'>
                    <div className={classes.CenterItems}>
                        <p> Ya tienes una cuenta </p>
                        <CustomButton color='ligth' destino={'/login'}> Accede aquí</CustomButton>
                    </div>
                </Breakpoint>
            </Contenedor>
        </>
    )
}

export default Registro
