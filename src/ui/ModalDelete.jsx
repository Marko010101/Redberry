import styled from "styled-components";

import Button from "./Button.jsx";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const DeleteModal = ({ onClose, onApprove }) => {
  const ref = useOutsideClick(onClose);

  return (
    <ModalOverlay>
      <ModalContent ref={ref}>
        <h3>გსურთ წაშალოთ ლისტინგი?</h3>
        <ModalActions>
          <Button type="secondary" onClick={onClose}>
            გაუქმება
          </Button>
          <Button type="primary" onClick={onApprove}>
            დადასტურება
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-midnight-blue);
  z-index: 9999;
  box-shadow: 0.5rem 0.5rem 1.2rem 0rem var(--color-midnight-navy);
`;

const ModalContent = styled.div`
  width: 62.3rem;
  height: 22.3rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  background-color: var(--white);
  text-align: center;

  & h3 {
    color: var(--color-midnight-slate);
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-big);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  & > button {
    height: 4.7rem;
  }
`;
