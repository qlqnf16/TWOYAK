import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as arrow } from '../../../assets/images/arrow.svg'
import { Line } from '../../UI/SharedStyles'

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Arrow = styled(arrow)`
  margin-left: 0.5rem;
  opacity: 0.6;
  ${props => props.opened && 'transform: rotate(180deg)'}
`

const LineWithSmallMargin = styled(Line)`
  margin: 0.9rem 0.5rem;
`

const Item = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--twoyak-black);
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.5rem;
  margin-left: 1rem;
`;

const Duration = styled(Item)`
  opacity: 0.6;
  font-size: 0.75rem;
  font-weight: normal;
`;

const CurrentModalDrug = ({ drug }) => {
  const [show, setShow] = useState(false)

  return (<div key={drug.id}>
    <ItemContainer>
      <Item>{drug.attributes.drug.data.attributes.name.split("(")[0]}</Item>
      <Arrow onClick={() => setShow(!show)} opened={show} />
    </ItemContainer>
    {show && (<Duration>
      {drug.attributes.from}
      {drug.attributes.to && ` ~ ${drug.attributes.to}`}
    </Duration>)}
    <LineWithSmallMargin />
  </div>)
}

export default CurrentModalDrug;