import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { getFeaturedEvents } from '@/data/eventList';
import EventList from '@/components/events/event-list';
import Button from '@/components/ui/button';

function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <Head>
        <title>Events App</title>
        <meta name='description' content='App for track some events' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <>
        <div className={styles.hero}>
          <h1>Featured Events</h1>
        </div>
        <EventList items={featuredEvents} />
        <div className={styles.btn}>
          <Button link={'/events'}>Show all events</Button>
        </div>
      </>
    </>
  );
}
export default Home;
