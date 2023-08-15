import { TYPE_POST_EDIT, TYPE_POST_NEW_COMMENT, TYPE_POST_EDIT_COMMENT, TYPE_POST_NEW } from '../../data/apiData';
import Modal from '../modal/Modal';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import NewPostForm from '../../Forms/newPostForm/NewPostForm';
import NewPostCommentForm from './../../Forms/newPostCommentForm/NewPostCommentForm';

import { usePostType } from '../../hooks/selectors';

import { useMemo } from 'react';

const NewEditPost = ({ type }) => {
  const postType = usePostType();
  
  const header = useMemo(() => {
    if (type === TYPE_POST_NEW) {
      return 'Create new post';
    }
    if (type === TYPE_POST_EDIT) {
      return 'Edit post';
    }
    if (type === TYPE_POST_NEW_COMMENT) {
      return 'Create new comment';
    }
    if (type === TYPE_POST_EDIT_COMMENT) {
      return 'Edit comment';
    }
  }, [type]);

  const currentModalComponent = useMemo(() => {
    if (postType === TYPE_POST_NEW || postType === TYPE_POST_EDIT) {
      return <NewPostForm />;
    }
    if (postType === TYPE_POST_NEW_COMMENT || postType === TYPE_POST_EDIT_COMMENT) {
      return <NewPostCommentForm />;
    }
  }, [postType])

  return (
    <Modal>
      <ModalWrapper>
        <h4>{header}</h4>
        {currentModalComponent}
      </ModalWrapper>
    </Modal>
  );
};

export default NewEditPost;
