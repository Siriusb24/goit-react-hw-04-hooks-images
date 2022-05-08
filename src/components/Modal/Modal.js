import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';


import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onBackdrop, content }) => {

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onBackdrop();
    }
  };
    return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={content} alt="" />
        </div>
      </div>,
      modalRoot,
    );
}

modalRoot.propTypes = {
  onBackdrop: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Modal;
