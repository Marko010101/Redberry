import styled from "styled-components";

export const ModalOverlay = styled.div`
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
