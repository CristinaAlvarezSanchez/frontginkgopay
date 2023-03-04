import { useParams } from "react-router-dom"

const EditarGasto = () => {
    const { idGasto } = useParams()

    return (

        <p>editar gasto {idGasto}</p>
    )
}

export default EditarGasto