import classes from './CardCommentsList.module.scss';

import CardComment from '../cardComment/CardComment';
import { useCallback } from 'react';

const noComments = 'No comments yet';
const closeComments = 'close 🗙';

const CardCommentsList = ({ comments, onClose, openClass }) => {
  let commentsList;
  
  if (comments.length > 0) {
    commentsList = comments.map((comment) => {
      return <CardComment comment={comment} key={comment.id} />;
    });
  } else {
    commentsList = noComments;
  }

  const closeCommentsHandler = useCallback(() => {
    onClose(false);
  }, [onClose]);

  return (
    <div className={`${classes.commentsList} ${openClass ? classes.comentsOn : ''}`}>
      <span className={classes.commentsList__close} onClick={closeCommentsHandler}>
        {closeComments}
      </span>
      {commentsList}
    </div>
  );
};

export default CardCommentsList;
