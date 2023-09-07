import { MAIN_URL } from './apiData';

const sendRequest = async (url, method = 'GET', body, isPicture = false) => {
  try {
    let response;
    !isPicture
      ? (response = await fetch(MAIN_URL + url, {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }))
      : (response = await fetch(MAIN_URL + url, {
          method,
          body: body,
        }));

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const mapResponseToPosts = (responseData) => {
  const loadedPosts = [];
  
  for (let key in responseData.result) {
    loadedPosts.push({
      id: responseData.result[key].id,
      title: responseData.result[key].title,
      username: responseData.result[key].username,
      likes: responseData.result[key].likes,
      dislikes: responseData.result[key].dislikes,
      imageSrc: responseData.result[key].imageSrc,
      date: responseData.result[key].date,
      comments: responseData.result[key].comments,
    });
  }
  
  return loadedPosts;
};

export const searchPostsFetch = async (searchValue) => {
  const responseData = await sendRequest(`post/search/${searchValue}`);
  
  return mapResponseToPosts(responseData);
};

export const allPostsFetch = async (currentPage) => {
  const responseData = await sendRequest(`post/page/${currentPage || 1}`);
  
  const loadedPosts = mapResponseToPosts(responseData);
  
  const paginatorInfo = {
    totalPages: responseData.totalPages,
    totalPosts: responseData.total,
    pageCurrent: responseData.page,
  };
  
  return { loadedPosts, paginatorInfo };
};

export const newPostFetch = async (title, username) =>
  sendRequest('post/', 'POST', { title, username });

export const editPostFetch = async (postId, title) =>
  sendRequest(`post/${postId}`, 'PUT', { title });

export const imagePostFetch = async (postId, formData) =>
  sendRequest(`post/${postId}/picture`, 'POST', formData, true);

export const newCommentFetch = async (postId, text, username) =>
  sendRequest('comment', 'POST', { text, postId, username });

export const editCommentFetch = async (commentId, text) =>
  sendRequest(`comment/${commentId}`, 'PUT', { text });

export const postVotesFetch = async (id, likes, dislikes) =>
  sendRequest(`post/${id}`, 'PUT', { likes, dislikes });

export const postDeleteFetch = async (id) =>
  sendRequest(`post/${id}`, 'DELETE');

export const commentVotesFetch = async (id, likes, dislikes) =>
  sendRequest(`comment/${id}`, 'PUT', { likes, dislikes });

export const commentDeleteFetch = async (id) =>
  sendRequest(`comment/${id}`, 'DELETE');
