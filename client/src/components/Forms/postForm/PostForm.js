import classes from './PostForm.module.scss';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MODE_EDIT, MODE_NEW, TYPE_POST } from '../../../data/apiData';
import { postIdActions } from '../../../redux/postIdSlice';
import { editPostFetch, imagePostFetch, newPostFetch } from '../../../data/requestsAPI';
import useFetchAllPosts from '../../../hooks/useFetchAllPosts';
import { paginatorHidingActions } from '../../../redux/paginatorHidingSlice';
import {
  authUserSelector,
  postIdSelector,
  currentPageSelector,
  modalComposerSelector,
  paginatorSelector,
} from '../../../selectors/selectors';

import Form from '../../ui/dumbComponents/Form';
import Label from '../../ui/dumbComponents/Label';
import Input from '../../ui/dumbComponents/Input';
import Button from '../../ui/dumbComponents/Button';
import { modalComposerActions } from '../../../redux/modalComposerSlice';

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

const PostForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();
  const [filePreviewURL, setFilePreviewURL] = useState(null);

  const { type, mode } = useSelector(modalComposerSelector);
  const {authUser} = useSelector(authUserSelector);
  const { paginator } = useSelector(paginatorSelector);
  const { postId } = useSelector(postIdSelector);
  const { currentPage } = useSelector(currentPageSelector);

  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const isTitleInputValid = useMemo(() => title.trim().length === 0, [title]);

  const inputTitleHandler = useCallback((event) => { setTitle(event.target.value); }, []);

  const imageHandler = useCallback((event) => {
    setFile(event.target.files[0]);
    const previewURL = URL.createObjectURL(event.target.files[0]);
    setFilePreviewURL(previewURL);
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      if (type === TYPE_POST && mode === MODE_NEW) {
        dispatch(postIdActions.resetPostId());
        newPostFetch(title, authUser);
      }
      if (type === TYPE_POST && mode === MODE_EDIT) {
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
    [type, mode, file, postId, paginator.totalPosts, dispatch, filePreviewURL, title, authUser]
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

  const previewPicture = useMemo(() => filePreviewURL && <img src={filePreviewURL} alt='preview' />, [filePreviewURL]);

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

export default PostForm;
