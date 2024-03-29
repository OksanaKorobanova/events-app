import classes from './comment-list.module.css';

function CommentList({ items = [], isLoading }) {
  if (isLoading) return <p>Loading</p>;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
