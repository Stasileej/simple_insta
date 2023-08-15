import classes from './Post.module.css';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import CardCommentsList from '../cardCommentsList/CardCommentsList';
import { postTypeActions } from '../../redux/postTypeSlice';
import { modalActions } from '../../redux/modalSlice';
import { postIdActions } from '../../redux/postIdSlice';
import { useAuthUser, useCurrentPage } from '../../hooks/selectors';
import Button from '../dumbComponents/Button';
import { postDeleteFetch, postVotesFetch } from '../../data/requestsAPI';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

const delConfirm = 'Are you sure you wish to delete this post?';

const cardText = {
  onDate: 'on',
  buttonLike: '👍',
  buttonDislike: '👎',
  buttonEdit: 'Edit post',
  buttonDelete: 'Delete post',
  buttonAddComment: 'Add comment',
  buttonComments: 'Comments',
};

// unreadable (separate on subcomponents)
const Post = ({ id, title, username, likes, dislikes, imageSrc, date, comments, authUser, fetchAllPosts, currentPage }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [dislikesState, setDisikesState] = useState(dislikes);
  const [vote, setVote] = useState(false);
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const isPostEditable = authUser === username;

  const dispatch = useDispatch();

  const likeHandler = useCallback(async () => {
    if (!isLiked && !isDisliked) {
      setIsLiked(true);
      if (!likesState.includes(authUser)) {
        setLikesState([...likesState, authUser]);
      }
    }
    if (!isLiked && isDisliked) {
      setIsDisliked(false);
      if (dislikesState.includes(authUser)) {
        setDisikesState(dislikesState.filter((user) => user !== authUser));
      }
    }
    setVote((vote) => !vote);
  }, [authUser, dislikesState, isDisliked, isLiked, likesState]);

  const dislikeHandler = useCallback(async () => {
    if (!isDisliked && !isLiked) {
      setIsDisliked(true);
      if (!dislikesState.includes(authUser)) {
        setDisikesState([...dislikesState, authUser]);
      }
    }
    if (!isDisliked && isLiked) {
      setIsLiked(false);
      if (likesState.includes(authUser)) {
        setLikesState(likesState.filter((user) => user !== authUser));
      }
    }
    setVote((vote) => !vote);
  }, [authUser, dislikesState, isDisliked, isLiked, likesState]);

  useEffect(() => {
    const sendVotes = async () => {
      await postVotesFetch(id, likesState, dislikesState);
    };
    sendVotes();

    if (authUser && likesState.includes(authUser)) {
      setIsLiked(true);
    }
    if (authUser && dislikesState.includes(authUser)) {
      setIsDisliked(true);
    }
  }, [authUser, dislikesState, id, likesState, vote]);

  const openCommentsHandler = useCallback(() => {
    setIsCommentsOpened(true);
  }, []);

  const closeCommentsHandler = useCallback(() => {
    setIsCommentsOpened(false);
  }, []);

  const deletePostHandler = useCallback(() => {
    if (window.confirm(delConfirm)) {
      setIsDel(true);
    }
  }, []);

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

  const editPostHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeEdit());
    dispatch(postIdActions.setPostId(id));
    dispatch(modalActions.modalOpen());
  }, [dispatch, id]);

  const addCommentHandler = useCallback(() => {
    dispatch(postTypeActions.postTypeNewComment());
    dispatch(postIdActions.setPostId(id));
    dispatch(modalActions.modalOpen());
  }, [dispatch, id]);

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
        <p>{cardText.onDate}</p>
        <p className={classes.date}>{new Date(+date).toDateString()}</p>
      </div>
      <div className={classes.votes}>
        <Button
          disabled={!authUser || (isLiked && !isDisliked)}
          onClick={likeHandler}
          className={isLiked ? classes.aciveVote : ''}
        >
          {cardText.buttonLike}
        </Button>
        <span>{likesState.length - dislikesState.length}</span>
        <Button
          disabled={!authUser || (isDisliked && !isLiked)}
          onClick={dislikeHandler}
          className={isDisliked ? classes.aciveVote : ''}
        >
          {cardText.buttonDislike}
        </Button>
      </div>
      <div className={classes.btnBlock}>
        <Button disabled={!authUser} onClick={addCommentHandler}>
          {cardText.buttonAddComment}
        </Button>
        <Button onClick={openCommentsHandler}>{cardText.buttonComments}</Button>
      </div>
      <div className={classes.btnBlock}>
        <Button disabled={!isPostEditable} onClick={editPostHandler}>
          {cardText.buttonEdit}
        </Button>
        <Button disabled={!isPostEditable} onClick={deletePostHandler}>
          {cardText.buttonDelete}
        </Button>
      </div>

      <CardCommentsList comments={comments} onClose={closeCommentsHandler} openClass={isCommentsOpened} />
    </>
  );
};

export default Post;
