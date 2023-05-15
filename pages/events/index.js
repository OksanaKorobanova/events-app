import { useRouter } from 'next/router';
import Head from 'next/head';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from 'helpers/api-util';

function AllEventsPage({ events }) {
  const { push } = useRouter();

  function onSearch(year, month) {
    const fullPath = `/events/${year}/${month}`;

    push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events Page</title>
        <meta name='description' content='List of all events' />
      </Head>
      <EventsSearch onSearch={onSearch} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: { events: allEvents },
  };
}

export default AllEventsPage;
