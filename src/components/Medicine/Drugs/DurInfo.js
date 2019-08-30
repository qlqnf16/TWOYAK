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
  opacity: 0.8;
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
      {dur.stop_usage && (
        <>
          <SubTitle>사용(급여) 중지된 약품입니다</SubTitle>
          <Text bold>{dur.stop_usage[0].description}</Text>
        </>
      )}
      {(dur.pregnancy || dur.elder || dur.age) && <SubTitle>이런 분들은 드실 때 주의해야 해요!</SubTitle>}
      {Object.keys(dur).map(key => {
        let content
        switch (key) {
          case 'pregnancy':
            content = '임산부'
            break;
          case 'elder':
            content = '65세 이상 고령자'
            break;
          case 'age':
            content = dur[key][0].description
            break;
          default:
            break;
        }
        return (<Text key={key}>{content}</Text>)
      }
      )}
    </>
  )
}

export default DurInfo