import classes from './NewPostCommentForm.module.css';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TYPE_POST_EDIT_COMMENT, TYPE_POST_NEW_COMMENT } from '../../data/apiData';
import { modalActions } from '../../redux/modalSlice';
import { postIdActions } from '../../redux/postIdSlice';
import { paginatorHidingActions } from '../../redux/paginatorHidingSlice';
import { authUserSelector, commentIdSelector, currentPageSelector, postTypeSelector } from '../../selectors/selectors';
import { editCommentFetch, newCommentFetch } from '../../data/requestsAPI';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

import Form from '../../UI/dumbComponents/Form';
import Label from '../../UI/dumbComponents/Label';
import Button from '../../UI/dumbComponents/Button';
import TextArea from '../../UI/dumbComponents/Textarea';

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

const NewPostCommentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [comment, setComment] = useState('');

  const authUser = useSelector(authUserSelector);
  const postType = useSelector(postTypeSelector);
  const commentId = useSelector(commentIdSelector);
  const currentPage = useSelector(currentPageSelector);
  
  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const isFormValid = useMemo(() => comment.trim().length === 0, [comment]);

  const inputCommentHandler = useCallback((event) => {
    setComment(event.target.value);
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      if (postType === TYPE_POST_NEW_COMMENT) {
        // get from redux (dor example from modal params)
        try {
          await newCommentFetch(+commentId, comment, authUser);
        } catch (error) {}
      }
      if (postType === TYPE_POST_EDIT_COMMENT) {
        try {
          await editCommentFetch(commentId, comment);
        } catch (error) {}
      }

      dispatch(postIdActions.resetPostId());

      setIsSubmitting(false);
      setDidSubmit(true);
    },
    [authUser, comment, commentId, dispatch, postType]
  );

  useEffect(() => {
    let submitted;
    if (didSubmit) {
      submitted = setTimeout(() => {
        dispatch(modalActions.modalClose());
        setDidSubmit(false);
      }, 1500);
    }

    dispatch(paginatorHidingActions.paginatorShow());
    fetchAllPosts(currentPage);

    return () => clearTimeout(submitted);
  }, [currentPage, didSubmit, dispatch, fetchAllPosts]);

  const onCancelHandler = useCallback(() => dispatch(modalActions.modalClose()), [dispatch]);

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

export default NewPostCommentForm;
