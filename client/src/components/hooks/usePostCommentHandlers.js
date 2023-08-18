import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { postIdActions } from '../redux/postIdSlice';
import { modalComposerActions } from '../redux/modalComposerSlice';
import { MODE_EDIT, MODE_NEW, TYPE_COMMENT, TYPE_POST } from '../data/apiData';


export function usePostCommentHandlers( id, setIsDel, delConfirm, setIsCommentsOpened) {
  const dispatch = useDispatch();

  const editPostHandler = useCallback(() => {
    dispatch(postIdActions.setPostId(id));
    dispatch(modalComposerActions.setModalContent({ type: TYPE_POST, mode: MODE_EDIT }));
  }, [dispatch, id]);

  const addCommentHandler = useCallback(() => {
    dispatch(postIdActions.setPostId(id));
    dispatch(modalComposerActions.setModalContent({ type: TYPE_COMMENT, mode: MODE_NEW }));
  }, [dispatch, id]);

  const editCommentHandler = useCallback(() => {
    dispatch(postIdActions.setPostId(id));
    dispatch(modalComposerActions.setModalContent({ type: TYPE_COMMENT, mode: MODE_EDIT }));
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
