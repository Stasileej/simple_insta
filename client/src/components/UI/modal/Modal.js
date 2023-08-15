import classes from './Modal.module.css';

import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { modalActions } from '../../redux/modalSlice';

const Backdrop = () => {
  const dispatch = useDispatch();

  const onCancelHandler = useCallback(() => dispatch(modalActions.modalClose()), [dispatch]);
  return <div className={classes.backdrop} onClick={onCancelHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
