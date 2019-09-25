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
  ${props => props.block ? 'display: block; margin-bottom: 0.3rem' : null}
`

const Bold = styled.span`
  font-weight: 700;
`

const DurInfo = ({ dur, interaction }) => {
  return (
    <>
      <Title>안전정보</Title>
      {interaction && (
        <>
          <SubTitle>다음 약과 복용하실 때 주의하세요!</SubTitle>
          {Object.keys(interaction).map(key => {
            const descriptions = interaction[key].map(type => {
              if (type === 'same_ingr') return '성분중복'
              else if (type === 'duplicate') return '효능군 중복'
              else return `병용금기(${type[1]})`
            })
            return (<Text block key={key}><Bold>{key}: </Bold>{descriptions.join(', ')}</Text>)
          })}
        </>
      )}
      {dur && dur.stop_usage ? (
        <>
          <SubTitle>사용(급여) 중지된 약품입니다</SubTitle>
          <Text bold>{dur.stop_usage[0].description}</Text>
        </>
      ) : ''}
      {dur && (dur.dosage || dur.period) ? (
        <SubTitle>
          {dur.dosage && <Text>하루 {dur.dosage[0].description.split(" ")[4]} 이상 복용 금지</Text>}
          {dur.period && <Text>{dur.period[0].description.split(" ")[0]}일 이상 복용 금지</Text>}
        </SubTitle>
      ) : ''}
      {dur && (dur.pregnancy || dur.elder || dur.age) ?
        <>
          <SubTitle>이런 분들은 드실 때 주의해야 해요!</SubTitle>
          {dur.pregnancy && <Text>임산부</Text>}
          {dur.elder && <Text>65세 이상 고령자</Text>}
          {dur.age && <Text>{dur.age[0].description}</Text>}
        </> : ''}
    </>
  )
}

export default DurInfo