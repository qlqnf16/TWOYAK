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

const DurInfo = ({ dur }) => {
  return (
    <>
      <Title>안전정보</Title>
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
        return (<Text>{content}</Text>)
      }
      )}
    </>
  )
}

export default DurInfo