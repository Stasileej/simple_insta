import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { postTypeActions } from '../redux/postTypeSlice';
import { postIdActions } from '../redux/postIdSlice';
import { modalActions } from '../redux/modalSlice';


export function usePostCommentHandlers( id, setIsDel, delConfirm, setIsCommentsOpened) {
  const dispatch = useDispatch();

  const editPostHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeEdit());
    dispatch(postIdActions.setPostId(id));
    dispatch(modalActions.modalOpen());
  }, [dispatch, id]);

  const addCommentHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeNewComment());
    dispatch(postIdActions.setPostId(id));
    dispatch(modalActions.modalOpen());
  }, [dispatch, id]);

  const editCommentHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeEditComment());
    dispatch(postIdActions.setPostId(id));
    dispatch(modalActions.modalOpen());
  }, [dispatch, id]);

  const deletePostHandler = useCallback(() => {
    if (window.confirm(delConfirm)) {
      setIsDel(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCommentsHandler = useCallback(() => {
    setIsCommentsOpened(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeCommentsHandler = useCallback(() => {
    setIsCommentsOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { editPostHandler, addCommentHandler, deletePostHandler, openCommentsHandler, closeCommentsHandler, editCommentHandler };
}
