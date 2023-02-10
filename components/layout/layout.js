import { Fragment } from 'react';
import MainHeader from './main-header';
import classes from './layout.module.css';

function Layout(props) {
  return (
    <>
      <MainHeader />
      <main className={classes.mainContent}>{props.children}</main>
    </>
  );
}

export default Layout;
