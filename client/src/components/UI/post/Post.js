import classes from './Post.module.scss';

import { useState, useEffect, useMemo } from 'react';

import { postDeleteFetch, postVotesFetch } from '../../data/requestsAPI';
import { useLikeDislikeHandlers } from '../../hooks/useLikeDislikeHandlers';
import { usePostCommentHandlers } from '../../hooks/usePostCommentHandlers';

import CardCommentsList from '../cardCommentsList/CardCommentsList';

import Button from '../dumbComponents/Button';

const delConfirm = 'Are you sure you wish to delete this post?';

const text = {
  onDate: 'on',
  buttonLike: '👍',
  buttonDislike: '👎',
  buttonEdit: 'Edit post',
  buttonDelete: 'Delete post',
  buttonAddComment: 'Add comment',
  buttonComments: 'Comments',
};

const Post = ({
  id,
  title,
  username,
  likesProps,
  dislikesProps,
  imageSrc,
  date,
  comments,
  authUser,
  fetchAllPosts,
  currentPage,
}) => {
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const isPostEditable = authUser === username;

  const { likeHandler, dislikeHandler, isLiked, isDisliked, likes, dislikes } = useLikeDislikeHandlers(authUser, id, likesProps, dislikesProps, postVotesFetch);

  const { editPostHandler, addCommentHandler, deletePostHandler, openCommentsHandler, closeCommentsHandler } =
    usePostCommentHandlers(id, setIsDel, delConfirm, setIsCommentsOpened);

  useEffect(() => {
    const delPost = async () => {
      await postDeleteFetch(id);

      fetchAllPosts(currentPage);
    };

    if (isDel) {
      delPost();
      setIsDel(false);
    }
  }, [currentPage, fetchAllPosts, id, isDel]);

  const postImage = useMemo(() => {
    return imageSrc
      ? imageSrc
      : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';
  }, [imageSrc]);

  return (
    <>
      <img src={postImage} alt={title} />
      <h3>{title}</h3>
      <div className={classes.nameDate}>
        <p className={classes.username}>{username}</p>
        <p>{text.onDate}</p>
        <p className={classes.date}>{new Date(+date).toDateString()}</p>
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
        <Button disabled={!authUser} onClick={addCommentHandler}>
          {text.buttonAddComment}
        </Button>
        <Button onClick={openCommentsHandler}>{text.buttonComments}</Button>
      </div>
      <div className={classes.btnBlock}>
        <Button disabled={!isPostEditable} onClick={editPostHandler}>
          {text.buttonEdit}
        </Button>
        <Button disabled={!isPostEditable} onClick={deletePostHandler}>
          {text.buttonDelete}
        </Button>
      </div>

      <CardCommentsList comments={comments} onClose={closeCommentsHandler} openClass={isCommentsOpened} />
    </>
  );
};

export default Post;
