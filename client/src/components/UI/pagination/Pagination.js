import classes from './Pagination.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { currentPageActions } from './../../redux/currentPageSlice';
import { paginatorSelector } from '../../selectors/selectors';

import Button from '../dumbComponents/Button';

const text = {
  prev: 'prev',
  next: 'next'
}

const Pagination = () => {
  const { paginator } = useSelector(paginatorSelector);

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
        {text.prev}
      </Button>
      <span>{`${paginator.pageCurrent} / ${paginator.totalPages}`}</span>
      <Button disabled={paginator.pageCurrent === paginator.totalPages} onClick={onNextHandler}>
        {text.next}
      </Button>
    </div>
  );
};

export default Pagination;
