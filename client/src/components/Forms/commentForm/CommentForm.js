import classes from './CommentForm.module.scss';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MODE_EDIT, MODE_NEW, TYPE_COMMENT } from '../../data/apiData';
import { postIdActions } from '../../redux/postIdSlice';
import { paginatorHidingActions } from '../../redux/paginatorHidingSlice';
import { authUserSelector, postIdSelector, currentPageSelector, modalComposerSelector } from '../../selectors/selectors';
import { editCommentFetch, newCommentFetch } from '../../data/requestsAPI';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

import Form from '../../ui/dumbComponents/Form';
import Label from '../../ui/dumbComponents/Label';
import Button from '../../ui/dumbComponents/Button';
import TextArea from '../../ui/dumbComponents/Textarea';
import { modalComposerActions } from '../../redux/modalComposerSlice';

const formText = {
  textareaCommentLabel: 'Comment:',
  textareaRows: 5,
  textareaId: 'postComment',
  buttonCancel: 'Cancel',
  buttonSubmit: 'Submit',
  buttonSubmitType: 'submit',
};

const sendingInfoText = {
  sending: 'Submitting data',
  sent: 'Data sent successfully',
};

const CommentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [comment, setComment] = useState('');

  const { type, mode } = useSelector(modalComposerSelector);
  const { authUser } = useSelector(authUserSelector);
  const { postId: commentId } = useSelector(postIdSelector);
  const { currentPage } = useSelector(currentPageSelector);

  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const isFormValid = useMemo(() => comment.trim().length === 0, [comment]);

  const inputCommentHandler = useCallback((event) => { setComment(event.target.value); }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      if (type === TYPE_COMMENT && mode === MODE_NEW) {
        await newCommentFetch(+commentId, comment, authUser);
      }
      if (type === TYPE_COMMENT && mode === MODE_EDIT) {
        await editCommentFetch(commentId, comment);
      }

      dispatch(postIdActions.resetPostId());

      setIsSubmitting(false);
      setDidSubmit(true);
    },
    [authUser, comment, commentId, dispatch, mode, type]
  );

  useEffect(() => {
    let submitted;
    if (didSubmit) {
      submitted = setTimeout(() => {
        dispatch(modalComposerActions.closeModal());
        setDidSubmit(false);
      }, 1500);
    }

    dispatch(paginatorHidingActions.paginatorShow());
    fetchAllPosts(currentPage);

    return () => clearTimeout(submitted);
  }, [currentPage, didSubmit, dispatch, fetchAllPosts]);

  const onCancelHandler = useCallback(() => dispatch(modalComposerActions.closeModal()), [dispatch]);

  const sendingInfo = useMemo(() => {
    if (isSubmitting && !didSubmit) {
      return sendingInfoText.sending;
    }
    if (!isSubmitting && didSubmit) {
      return sendingInfoText.sent;
    }
  }, [didSubmit, isSubmitting]);

  return (
    <>
      {!isSubmitting && !didSubmit && (
        <Form className={classes.postForm} onSubmit={submitHandler}>
          <Label htmlFor={formText.textareaId} textContent={formText.textareaCommentLabel} />
          <TextArea rows={formText.textareaRows} id={formText.textareaId} onChange={inputCommentHandler} />
          <div className={classes.btnGroup}>
            <Button onClick={onCancelHandler}>{formText.buttonCancel}</Button>
            <Button disabled={isFormValid} type={formText.buttonSubmitType}>
              {formText.buttonSubmit}
            </Button>
          </div>
        </Form>
      )}
      <p style={{ margin: '2rem auto', fontWeight: 600 }}>{sendingInfo}</p>
    </>
  );
};

export default CommentForm;
