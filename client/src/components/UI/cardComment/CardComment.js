import classes from './CardComment.module.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { authUserSelector, currentPageSelector } from '../../../selectors/selectors';
import { commentDeleteFetch, commentVotesFetch } from '../../../data/requestsAPI';
import { useLikeDislikeHandlers } from '../../../hooks/useLikeDislikeHandlers';
import { usePostCommentHandlers } from '../../../hooks/usePostCommentHandlers';
import useFetchAllPosts from '../../../hooks/useFetchAllPosts';

import Button from '../dumbComponents/Button';

const delConfirm = 'Are you sure you wish to delete this comment?';

const text = {
  onDate: 'on',
  buttonLike: '👍',
  buttonDislike: '👎',
  buttonEdit: 'Edit comment',
  buttonDelete: 'Delete comment',
};

const CardComment = ({ comment }) => {
  const [isDel, setIsDel] = useState(false);

  const { authUser } = useSelector(authUserSelector);
  const { currentPage } = useSelector(currentPageSelector);

  const fetchAllPosts = useFetchAllPosts();

  const isPostEditable = authUser === comment.username;

  const id = comment.id;

  const { likeHandler, dislikeHandler, isLiked, isDisliked, likes, dislikes } = useLikeDislikeHandlers(
    authUser, id, comment.likes, comment.dislikes, commentVotesFetch
  );

  const { editCommentHandler, deletePostHandler } = usePostCommentHandlers(id, setIsDel, delConfirm);

  useEffect(() => {
    const delComment = async () => {
      commentDeleteFetch(id);

      fetchAllPosts(currentPage);
    };

    if (isDel) {
      delComment();
      setIsDel(false);
    }
  }, [id, currentPage, fetchAllPosts, isDel]);

  return (
    <>
      <div key={id} id={id} className={classes.comment}>
        <p className={classes.comment__text}>"{comment.text}"</p>
        <div className={classes.comment__nameDate}>
          <p className={classes.comment__username}>{comment.username}</p>
          <p>{text.onDate}</p>
          <p className={classes.comment__date}>{new Date(+comment.date).toDateString()}</p>
        </div>
        <div className={classes.votes}>
          <Button
            disabled={!authUser || (isLiked && !isDisliked)}
            onClick={likeHandler}
            className={isLiked ? classes.aciveVote : ''}
          >
            {text.buttonLike}
          </Button>
          <span>{likes.length - dislikes.length}</span>
          <Button
            disabled={!authUser || (isDisliked && !isLiked)}
            onClick={dislikeHandler}
            className={isDisliked ? classes.aciveVote : ''}
          >
            {text.buttonDislike}
          </Button>
        </div>
        <div className={classes.btnBlock}>
          <Button disabled={!isPostEditable} onClick={editCommentHandler}>
            {text.buttonEdit}
          </Button>
          <Button disabled={!isPostEditable} onClick={deletePostHandler}>
            {text.buttonDelete}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardComment;
