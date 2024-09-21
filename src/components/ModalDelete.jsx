import styled from "styled-components";

import X from "../assets/x.svg?react";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import { ModalOverlay } from "./ui/ModalOverlay.jsx";
import Button from "./ui/Button.jsx";

const DeleteModal = ({ onClose, onApprove }) => {
  const ref = useOutsideClick(onClose);

  return (
    <ModalOverlay>
      <ModalContent ref={ref}>
        <h3>გსურთ წაშალოთ ლისტინგი?</h3>
        <ModalActions>
          <span onClick={onClose}>
            <X />
          </span>
          <Button variant="secondary" onClick={onClose}>
            გაუქმება
          </Button>
          <Button variant="primary" onClick={onApprove}>
            დადასტურება
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;

const ModalContent = styled.div`
  position: relative;
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

  & span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.7rem;
    height: 4.7rem;
    top: 0.6rem;
    right: 1.3rem;
    cursor: pointer;

    & svg {
      height: 2.4rem;
      width: 2.4rem;
      stroke: var(--color-midnight-slate);
    }
    &:hover svg {
      stroke: var(--color-text);
    }
  }
`;
