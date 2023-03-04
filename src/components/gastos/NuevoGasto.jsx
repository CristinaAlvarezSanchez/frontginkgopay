import { useParams } from "react-router-dom"

const NuevoGasto = () => {
    const { idGrupo } = useParams()
    return (<div>
        nuevo gasto para el grupo {idGrupo}
    </div>)


}

export default NuevoGasto