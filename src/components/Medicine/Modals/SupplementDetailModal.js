import React from 'react'
import Modal from '../../UI/Modals/Modal'
import { Line, BasicText } from '../../UI/SharedStyles';
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem 0;
`

const Title = styled(BasicText)`
  font-size: 0.75rem;
  display: block;
  margin: 0.6rem 0;
`

const Description = styled(Title)`
  font-size: 0.8rem;
`

const Content = styled(Title)`
  font-weight: normal;
  opacity: 0.8;
`

const Caution = styled.span`
  font-weight: 800;
  color: red;
`

const Link = styled.a`
  font-size: 0.75rem;
  margin: 0.6rem 0;
  display: block;
  color: var(--twoyak-black);
  opacity: 0.8;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SupplementDetailModal = ({ supplement, modalOff }) => {
  return (
    <Modal
      title={supplement.more_info.ingr_name}
      content={(
        <Container>
          <Description>설명</Description>
          <Description bold>{supplement.title}</Description>
          <Line />
          <Title>상세설명</Title>
          <Content>{supplement.info.description}</Content>
          {supplement.info.caution && (<Content><Caution>!</Caution> {supplement.info.caution}</Content>)}
          <Line />
          <Title>참고문헌</Title>
          {supplement.references.map(ref => (
            <Link href={ref.url} target="_blank">{ref.citation}</Link>
          ))}
        </Container>
      )}
      modalOff={modalOff}
    />
  )
}

export default SupplementDetailModal