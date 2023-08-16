import classes from './CardList.module.css';

import Post from '../post/Post';

const CardList = ({ posts, authUser, fetchAllPosts, currentPage }) => {
  let cardsContent = posts.map((card) => {
    return (
      <div className={classes.cardWrap} key={card.id}>
        <Post
          id={card.id}
          title={card.title}
          username={card.username}
          likesProps={card.likes}
          dislikesProps={card.dislikes}
          imageSrc={card.imageSrc}
          date={card.date}
          comments={card.comments}
          authUser={authUser}
          fetchAllPosts={fetchAllPosts}
          currentPage={currentPage}
        />
      </div>
    );
  });
  return <div className={classes.cardsList}>{cardsContent}</div>;
};

export default CardList;
