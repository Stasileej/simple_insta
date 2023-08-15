import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TYPE_POST_EDIT, TYPE_POST_NEW_COMMENT, TYPE_POST_EDIT_COMMENT, TYPE_POST_NEW } from '../../data/apiData';
import { postTypeSelector } from '../../selectors/selectors';

import Modal from '../modal/Modal';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import NewPostForm from '../../Forms/newPostForm/NewPostForm';
import NewPostCommentForm from '../../Forms/newPostCommentForm/NewPostCommentForm';

const ModalComposer = ({ type }) => {
  const postType = useSelector(postTypeSelector);

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
  }, [postType]);

  return (
    <Modal>
      <ModalWrapper>
        <h4>{header}</h4>
        {currentModalComponent}
      </ModalWrapper>
    </Modal>
  );
};

export default ModalComposer;
