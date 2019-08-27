import React from 'react'
import Modal from './Modal';
import styled from 'styled-components'
import { BasicText, BasicButton } from '../SharedStyles'

const ModalContainer = styled.div`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Text = styled(BasicText)`
  margin-bottom: 1rem;
`

const ConfirmModal = ({ modalOff, handleClick }) => {
  return (
    <Modal
      title='투약'
      modalOff={modalOff}
      content={(
        <ModalContainer>
          <Text>정말 삭제하시겠습니까?</Text>
          <BasicButton onClick={handleClick}>삭제하기</BasicButton>
        </ModalContainer>
      )}
    />
  )

}

export default ConfirmModal