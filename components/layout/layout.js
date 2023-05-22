import MainHeader from './main-header';
import classes from './layout.module.css';
import Notification from '../input/notification';
import { useContext } from 'react';
import NotificationContext from '@/store/notification-context';

function Layout(props) {
  const { notification } = useContext(NotificationContext);
  return (
    <>
      <MainHeader />
      <main className={classes.mainContent}>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

export default Layout;
