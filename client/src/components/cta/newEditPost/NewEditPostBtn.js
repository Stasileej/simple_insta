import classes from './NewEditPostBtn.module.css';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../UI/dumbComponents/Button';
import { authUserSelector } from '../../selectors/selectors';
import { MODE_NEW, TYPE_POST } from '../../data/apiData';
import { modalComposerActions } from '../../redux/modalComposerSlice';

const text = 'New Posts';

const NewEditPostBtn = () => {
  const authUser = useSelector(authUserSelector);

  const dispatch = useDispatch();

  const onOpenHandler = useCallback(() => {
    dispatch(modalComposerActions.setModalContent({ type: TYPE_POST, mode: MODE_NEW }));
  }, [dispatch]);

  return (
    <div className={classes.btnWrapper}>
      <Button disabled={!authUser} onClick={onOpenHandler}>
        {text}
      </Button>
    </div>
  );
};

export default NewEditPostBtn;
