import classes from './NewPostForm.module.css';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { TYPE_POST_EDIT, TYPE_POST_NEW } from '../../data/apiData';
import { modalActions } from '../../redux/modalSlice';
import { postIdActions } from '../../redux/postIdSlice';

import { useAuthUser, useCommentId, useCurrentPage, usePaginator, usePostType } from '../../hooks/selectors';
import Form from '../../UI/dumbComponents/Form';
import Label from '../../UI/dumbComponents/Label';
import Input from '../../UI/dumbComponents/Input';
import Button from '../../UI/dumbComponents/Button';
import { editPostFetch, imagePostFetch, newPostFetch } from '../../data/requestsAPI';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';
import { paginatorHidingActions } from '../../redux/paginatorHidingSlice';

const formText = {
  inputTitleLabel: 'Title:',
  inputTitleType: 'text',
  inputTitleId: 'postTitle',
  inputPictureLoadingType: 'file',
  buttonCancel: 'Cancel',
  buttonSubmit: 'Submit',
  buttonSubmitType: 'submit',
};

const sendingInfoText = {
  sending: 'Submitting data',
  sent: 'Data sent successfully',
};

const NewPostForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();
  const [filePreviewURL, setFilePreviewURL] = useState(null);

  const authUser = useAuthUser();
  const paginator = usePaginator();
  const postType = usePostType();
  const postId = useCommentId();
  const currentPage = useCurrentPage();
  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const isTitleInputValid = useMemo(() => title.trim().length === 0, [title]);

  const inputTitleHandler = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const imageHandler = useCallback((event) => {
    setFile(event.target.files[0]);
    const previewURL = URL.createObjectURL(event.target.files[0]);
    setFilePreviewURL(previewURL);
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      if (postType === TYPE_POST_NEW) {
        dispatch(postIdActions.resetPostId());
        newPostFetch(title, authUser);
      }
      if (postType === TYPE_POST_EDIT) {
        editPostFetch(postId, title);
      }

      const formData = new FormData();
      formData.append('picture', file);
      const postIdValue = postId ? postId : paginator.totalPosts > 0 ? paginator.totalPosts + 1 : 1;
      await imagePostFetch(postIdValue, formData);

      dispatch(postIdActions.resetPostId());

      setIsSubmitting(false);
      setDidSubmit(true);

      if (filePreviewURL) {
        URL.revokeObjectURL(filePreviewURL);
        setFilePreviewURL(null);
      }
    },
    [paginator.totalPosts, authUser, dispatch, file, filePreviewURL, postId, postType, title]
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

  const previewPicture = useMemo(() => filePreviewURL && <img src={filePreviewURL} alt='preview' />, [filePreviewURL]);

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
          <Label htmlFor={formText.inputTitleId} textContent={formText.inputTitleLabel} />
          <Input type={formText.inputTitleType} id={formText.inputTitleId} onChange={inputTitleHandler} />
          <Input type={formText.inputPictureLoadingType} onChange={imageHandler} />
          {previewPicture}
          <div className={classes.btnGroup}>
            <Button onClick={onCancelHandler}>{formText.buttonCancel}</Button>
            <Button disabled={isTitleInputValid || isSubmitting} type={formText.buttonSubmitType}>
              {formText.buttonSubmit}
            </Button>
          </div>
        </Form>
      )}
      <p style={{ margin: '2rem auto', fontWeight: 600 }}>{sendingInfo}</p>
    </>
  );
};

export default NewPostForm;
