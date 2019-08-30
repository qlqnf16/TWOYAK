import React, { useState } from 'react'
import styled from 'styled-components'
import { BasicText, BasicButton } from '../../UI/SharedStyles'
import SupplementDetailModal from '../Modals/SupplementDetailModal';

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

const Button = styled(BasicButton)`
  font-size: 0.75rem;
  display: block;
  margin: 1.5rem auto 1rem auto;
  background-color: white;
  color: var(--twoyak-black);
  border: 1px solid #00a2ff99;
`

const SupplementInfo = ({ supplements, moveTo }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [target, setTarget] = useState()

  const detailToggleHandler = (supplement) => {
    setTarget(supplement)
    setShowDetail(!showDetail)
  }

  const moveToRecommend = () => {
    const ids = supplements.map(supplement => supplement.more_info.id)
    const names = supplements.map(supplement => supplement.more_info.ingr_name)
    moveTo(ids.join('&'), names.join('&'))
  }


  return (
    <>
      <Title>똑똑하게 복용하기</Title>
      <SubTitle>함께 복용하면 도움이 될 수 있는 성분</SubTitle>
      {supplements.map(supplement => (
        <Text key={supplement.id} onClick={() => { detailToggleHandler(supplement) }}>{supplement.more_info.ingr_name}</Text>
      ))}
      <Button onClick={() => { moveToRecommend() }}>관련 건강기능식품 보러가기</Button>

      {showDetail && <SupplementDetailModal supplement={target} modalOff={detailToggleHandler} />}
    </>
  )
}

export default SupplementInfo