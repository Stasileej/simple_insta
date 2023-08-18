import { useSelector } from 'react-redux';

import { modalComposerSelector } from '../../selectors/selectors';

import Modal from '../modal/Modal';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import NewPostForm from '../../Forms/newPostForm/NewPostForm';
import NewPostCommentForm from '../../Forms/newPostCommentForm/NewPostCommentForm';

const ModalComposer = () => {
  const { output: { header, component } } = useSelector(modalComposerSelector);
  
  const componentsMap = new Map([
    ['NewPostForm', NewPostForm],
    ['NewPostCommentForm', NewPostCommentForm],
  ]);

  const ModalComponent = componentsMap.get(component);

  return (
    <Modal>
      <ModalWrapper>
        <h4>{header}</h4>
        {<ModalComponent />}
      </ModalWrapper>
    </Modal>
  );
};

export default ModalComposer;
