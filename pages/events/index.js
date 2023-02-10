import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/data/eventList';

function AllEventsPage() {
  const { push } = useRouter();
  const events = getAllEvents();

  function onSearch(year, month) {
    const fullPath = `/events/${year}/${month}`;

    push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={onSearch} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
