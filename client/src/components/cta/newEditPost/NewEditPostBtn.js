import classes from './NewEditPostBtn.module.css';

import { useDispatch } from 'react-redux';

import { modalActions } from '../../redux/modalSlice';
import { postTypeActions } from '../../redux/postTypeSlice';

import { useAuthUser } from '../../hooks/selectors';
import { useCallback } from 'react';
import Button from '../../UI/dumbComponents/Button';

const btnText = 'New Posts';

const NewEditPostBtn = () => {
  const authUser = useAuthUser();

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
