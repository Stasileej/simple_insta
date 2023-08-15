import classes from './Pagination.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { currentPageActions } from './../../redux/currentPageSlice';
import { paginatorSelector } from '../../selectors/selectors';

import Button from '../dumbComponents/Button';

const Pagination = () => {
  const paginator = useSelector(paginatorSelector);

  const dispatch = useDispatch();

  const onPrevHandler = useCallback(() => {
    if (paginator.pageCurrent > 1) {
      dispatch(currentPageActions.setPage(paginator.pageCurrent - 1));
    }
  }, [dispatch, paginator.pageCurrent]);
  
  const onNextHandler = useCallback(() => {
    if (paginator.pageCurrent < paginator.totalPages) {
      dispatch(currentPageActions.setPage(paginator.pageCurrent + 1));
    }
  }, [dispatch, paginator.pageCurrent, paginator.totalPages]);

  return (
    <div className={classes.paginator}>
      <Button disabled={paginator.pageCurrent === 1} onClick={onPrevHandler}>
        prev
      </Button>
      <span>{`${paginator.pageCurrent} / ${paginator.totalPages}`}</span>
      <Button disabled={paginator.pageCurrent === paginator.totalPages} onClick={onNextHandler}>
        next
      </Button>
    </div>
  );
};

export default Pagination;
