import classes from './CardComment.module.css';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { postTypeActions } from '../../redux/postTypeSlice';
import { postIdActions } from '../../redux/postIdSlice';
import { modalActions } from '../../redux/modalSlice';

import { useAuthUser, useCurrentPage } from '../../hooks/selectors';
import Button from '../dumbComponents/Button';
import { commentDeleteFetch, commentVotesFetch } from '../../data/requestsAPI';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

const delConfirm = 'Are you sure you wish to delete this comment?';

const cardText = {
  onDate: 'on',
  buttonLike: '👍',
  buttonDislike: '👎',
  buttonEdit: 'Edit comment',
  buttonDelete: 'Delete comment',
};

const CardComment = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDisikes] = useState(comment.dislikes);
  const [vote, setVote] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const authUser = useAuthUser();
  const currentPage = useCurrentPage();
  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();
  
  const isPostEditable = authUser === comment.username;

  const likeHandler = useCallback(async () => {
    if (!isLiked && !isDisliked) {
      setIsLiked(true);
      if (!likes.includes(authUser)) {
        setLikes([...likes, authUser]);
      }
    }
    if (!isLiked && isDisliked) {
      setIsDisliked(false);
      if (dislikes.includes(authUser)) {
        setDisikes(dislikes.filter((user) => user !== authUser));
      }
    }
    setVote((vote) => !vote);
  }, [authUser, dislikes, isDisliked, isLiked, likes]);

  const dislikeHandler = useCallback(async () => {
    if (!isDisliked && !isLiked) {
      setIsDisliked(true);
      if (!dislikes.includes(authUser)) {
        setDisikes([...dislikes, authUser]);
      }
    }
    if (!isDisliked && isLiked) {
      setIsLiked(false);
      if (likes.includes(authUser)) {
        setLikes(likes.filter((user) => user !== authUser));
      }
    }
    setVote((vote) => !vote);
  }, [authUser, dislikes, isDisliked, isLiked, likes]);

  useEffect(() => {
    const sendVotes = async () => {
      await commentVotesFetch(comment.id, likes, dislikes);
    };

    sendVotes();

    if (authUser && likes.includes(authUser)) {
      setIsLiked(true);
    }
    if (authUser && dislikes.includes(authUser)) {
      setIsDisliked(true);
    }
  }, [authUser, comment.id, dislikes, likes, vote]);

  const editPostHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeEditComment());
    dispatch(postIdActions.setPostId(comment.id));
    dispatch(modalActions.modalOpen());
  }, [comment.id, dispatch]);

  const deletePostHandler = useCallback(() => {
    if (window.confirm(delConfirm)) {
      setIsDel(true);
    }
  }, []);

  useEffect(() => {
    const delComment = async () => {
      commentDeleteFetch(comment.id);
      
      fetchAllPosts(currentPage);
    };

    if (isDel) {
      delComment();
      setIsDel(false);
    }
  }, [comment.id, currentPage, fetchAllPosts, isDel]);

  return (
    <>
      <div key={comment.id} id={comment.id} className={classes.comment}>
        <p className={classes.commentText}>"{comment.text}"</p>
        <div className={classes.nameDate}>
          <p className={classes.username}>{comment.username}</p>
          <p>{cardText.onDate}</p>
          <p className={classes.date}>{new Date(+comment.date).toDateString()}</p>
        </div>
        <div className={classes.votes}>
          <Button
            disabled={!authUser || (isLiked && !isDisliked)}
            onClick={likeHandler}
            className={isLiked ? classes.aciveVote : ''}
          >
            {cardText.buttonLike}
          </Button>
          <span>{likes.length - dislikes.length}</span>
          <Button
            disabled={!authUser || (isDisliked && !isLiked)}
            onClick={dislikeHandler}
            className={isDisliked ? classes.aciveVote : ''}
          >
            {cardText.buttonDislike}
          </Button>
        </div>
        <div className={classes.btnBlock}>
          <Button disabled={!isPostEditable} onClick={editPostHandler}>
            {cardText.buttonEdit}
          </Button>
          <Button disabled={!isPostEditable} onClick={deletePostHandler}>
            {cardText.buttonDelete}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardComment;
