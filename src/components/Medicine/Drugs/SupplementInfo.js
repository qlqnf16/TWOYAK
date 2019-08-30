import React from 'react'
import styled from 'styled-components'
import { BasicText } from '../../UI/SharedStyles'

const Title = styled.div`
  color: var(--twoyak-blue);
  font-weight: bold;
`

const SubTitle = styled(BasicText)`
  display: block;
  font-weight: bold;
  font-size: 0.75rem;
  margin: 1rem 0 0.3rem 0;
`

const Text = styled(BasicText)`
  font-size: 0.75rem;
  margin-right: 1rem;
  font-weight: normal;
`

const SupplementInfo = ({ supplements }) => {
  return (
    <>
      <Title>똑똑하게 복용하기</Title>
      <SubTitle>함께 복용하면 도움이 될 수 있어요!</SubTitle>
      {supplements.map(supplement => (
        <Text>{supplement.more_info.ingr_name}</Text>
      ))}
    </>
  )
}

export default SupplementInfo