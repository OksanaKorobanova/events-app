import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments({ eventId }) {
  const { showNotification } = useContext(NotificationContext);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData, callbackFn) {
    showNotification({
      title: 'In progress',
      message: 'Adding a new comment',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        showNotification({
          title: 'Success!',
          message: 'You added a new comment',
          status: 'success',
        });
        callbackFn();
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          message: error.message || 'Error. Unable to add a comment',
          status: 'error',
        });
      });
  }

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!');
          });
        })
        .then((response) => {
          setComments(response.comments);
          setLoading(false);
        })
        .catch((error) => {
          showNotification({
            title: 'Error!',
            message: error.message || 'Error. Unable to load comments',
            status: 'error',
          });
          setLoading(false);
        });
    }
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <CommentList items={comments} isLoading={isLoading} />}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
    </section>
  );
}

export default Comments;
