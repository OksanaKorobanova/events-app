import Head from 'next/head';
import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import { getEventById, getFeaturedEvents } from 'helpers/api-util';
import Comments from '@/components/input/comments';

function EventPage({ event }) {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading!</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${event.title} details`}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.imageAlt}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      {!!event && <Comments eventId={event.id} />}
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventData = await getEventById(eventId);
  return {
    props: {
      event: eventData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true,
  };
}

export default EventPage;
