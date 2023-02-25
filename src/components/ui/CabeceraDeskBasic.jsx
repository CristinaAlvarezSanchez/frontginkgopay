import { Children } from 'react'
import styled from 'styled-components'
import logoginkgopay from '../../logoginkgopay.svg'

const DivCabeceraDesktop = styled.div`
    margin: 2em 0 8em ;
    display: flex;
    justify-content: space-between;
`

const CabeceraDeskBasic = ({ children }) => {

    return (
        <>
            <DivCabeceraDesktop>
                <div style={{ width: '15em' }}>
                    <img src={logoginkgopay} alt="logo Ginkgopay" />
                </div>
                {children}
            </DivCabeceraDesktop>
        </>
    )

}

export default CabeceraDeskBasic