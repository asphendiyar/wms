import React from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { portalRoot } from "../../..";
import { appColors } from "../../../app/helpers";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.322);
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 100;
  &.centered {
    justify-content: center;
  }
  form {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .table-form {
    height: 0;
  }
`;
const ModalWrapper = styled.div`
  background-color: ${appColors.white};
  overflow: hidden;

  &.side {
    border-radius: 16px 0px 0px 16px;
    padding: 20px;
    height: 92%;
    width: 40%;
  }
  &.users-group {
    width: 30%;
    @media (max-width: 1199px) {
      width: 40%;
    }
    @media (max-width: 767px) {
      width: 60%;
    }
  }
  &.side.users-form,
  &.side.cells-generator {
    width: 37%;
    @media (max-width: 1199px) {
      width: 47%;
    }
    @media (max-width: 767px) {
      width: 60%;
    }
  }
  &.centered {
    padding: 20px;
    border-radius: 16px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  h3 {
    margin: 0;
    font-weight: 700;
    font-size: 24px;
  }
  span {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: ${appColors.primary};
    font-size: 25px;
    transform: rotate(0deg);
    transition: transform 0.3s;
  }
  span:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
  }
`;

export const ModalContent = styled.div`
  padding: 7px 10px 0;
  height: calc(100% - 35px);
  overflow-y: auto;
  &.side-modal__content {
    height: calc(100% - 29px);
  }
  &.centered-modal__content {
    height: calc(100% - 70px);
  }
`;

type ModalPropTypes = {
  title: string;
  open: boolean;
  onClose?: () => void;
  className?: string;
};
const Modal: React.FC<ModalPropTypes> = ({
  open,
  title,
  onClose,
  children,
  className,
}) => {
  if (!open) return null;
  return createPortal(
    <StyledModal className={className}>
      <ModalWrapper className={className}>
        <ModalHeader>
          <h3>{title}</h3>
          {onClose && (
            <span onClick={onClose}>
              <IoMdClose />
            </span>
          )}
        </ModalHeader>
        <ModalContent className={`${className}-modal__content`}>
          {children}
        </ModalContent>
      </ModalWrapper>
    </StyledModal>,
    portalRoot
  );
};
export default Modal;
