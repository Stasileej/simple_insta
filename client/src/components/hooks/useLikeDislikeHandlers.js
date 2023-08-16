import { useCallback, useEffect, useState } from 'react';

export function useLikeDislikeHandlers(authUser, id, likesProps, dislikesProps, votesFetch) {
  const [vote, setVote] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(likesProps);
  const [dislikes, setDisikes] = useState(dislikesProps);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, dislikes, isDisliked, isLiked, likes]);

  useEffect(() => {
    const sendVotes = async () => {
      await votesFetch(id, likes, dislikes);
    };

    sendVotes();

    if (authUser && likes.includes(authUser)) {
      setIsLiked(true);
    }
    if (authUser && dislikes.includes(authUser)) {
      setIsDisliked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, dislikes, id, likes, vote]);

  return { likeHandler, dislikeHandler, isLiked, isDisliked, likes, dislikes };
}
