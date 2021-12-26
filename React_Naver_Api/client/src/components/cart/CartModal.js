import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const CartModal = ({ isOpen, setIsOpen }) => {

  const handleClose = () => setIsOpen(false);
  const history = useHistory();

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>상품이 장바구니에 성공적으로 담겼습니다.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          쇼핑을 계속하기
        </Button>
        <Button variant="primary" onClick={() => history.push('/cart')}>
          장바구니로 이동
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CartModal;