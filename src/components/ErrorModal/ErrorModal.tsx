import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

interface ModalProps {
  isOpen: boolean;
  text: string;
};

const ErrorModal: React.FC<ModalProps> = (props) => {
  const { isOpen, text } = props;
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onKeyDown={handleKeyDown}>
      <div className="modal__content">
        {text}
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default ErrorModal;