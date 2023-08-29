import { useSelector } from 'react-redux';

import { modalComposerSelector } from '../../../selectors/selectors';

import Modal from '../Modal';
import ModalWrapper from '../modalWrapper/ModalWrapper';
import PostForm from '../../../forms/postForm/PostForm';
import CommentForm from '../../../forms/commentForm/CommentForm';

const ModalComposer = () => {
  const { output: { header, component } } = useSelector(modalComposerSelector);
  
  const componentsMap = new Map([
    ['PostForm', PostForm],
    ['CommentForm', CommentForm],
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
