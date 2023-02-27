import styled from 'styled-components'
import logoginkgopay from '../../logoginkgopay.svg'
import { useNavigate } from "react-router-dom"

const DivCabeceraDesktop = styled.div`
    margin: 2em 0 6em ;
    display: flex;
    justify-content: space-between;
`
const DivLogo = styled.div`
    width: 15em;
    cursor: pointer;
`

const CabeceraDeskBasic = ({ children }) => {

    const navigate = useNavigate()
    return (
        <>
            <DivCabeceraDesktop>
                <DivLogo>
                    <img onClick={() => navigate('/')} src={logoginkgopay} alt="logo Ginkgopay" />
                </DivLogo>
                {children}
            </DivCabeceraDesktop>
        </>
    )

}

export default CabeceraDeskBasic