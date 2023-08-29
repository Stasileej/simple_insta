import classes from './ModalWrapper.module.css';

const ModalWrapper = (props) => {
  return <div className={classes.cardWrap}>{props.children}</div>;
};

export default ModalWrapper;
