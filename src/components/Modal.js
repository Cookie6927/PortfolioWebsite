import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
`;

const ModalBox = styled.div`
  background: var(--bg);
  width: 100%;
  max-width: 800px;
  padding: 1.5rem;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  background: --dark-slate;
  border-radius: 10px 20px;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <ModalBox onClick={e => e.stopPropagation()}>
        {/* You can optionally comment this out if you want no close button */}
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
        {children}
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
