import classes from './NewEditPostBtn.module.css';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { modalActions } from '../../redux/modalSlice';
import { postTypeActions } from '../../redux/postTypeSlice';

import Button from '../../UI/dumbComponents/Button';
import { authUserSelector } from '../../selectors/selectors';

const btnText = 'New Posts';

const NewEditPostBtn = () => {
  const authUser = useSelector(authUserSelector);

  const dispatch = useDispatch();

  const onOpenHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeNew());
    dispatch(modalActions.modalOpen());
  }, [dispatch]);

  return (
    <div className={classes.btnWrapper}>
      <Button disabled={!authUser} onClick={onOpenHandler}>
        {btnText}
      </Button>
    </div>
  );
};

export default NewEditPostBtn;
