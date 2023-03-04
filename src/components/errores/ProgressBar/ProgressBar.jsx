import classes from '../ProgressBar/ProgressBar.module.css'

const ProgressBar = () => {
    return (
        <>
            <div className={classes.indeterminateProgressBar}>
                <div className={classes.indeterminateProgressBarProgress}></div>
            </div>
            <p>Cargando datos...</p>
        </>
    )

}

export default ProgressBar