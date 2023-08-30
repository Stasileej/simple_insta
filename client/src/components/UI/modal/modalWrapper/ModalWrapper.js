import classes from './ModalWrapper.module.scss';

const ModalWrapper = (props) => {
  return <div className={classes.cardWrap}>{props.children}</div>;
};

export default ModalWrapper;
