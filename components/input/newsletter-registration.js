import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const emailRef = useRef();
  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
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
          title: 'Signed up',
          message: 'Now you are registered for newsletter',
          status: 'success',
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Unable to sign up',
          message: error.message || 'Error. Unable to register for newsletter',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
