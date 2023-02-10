import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import { getFilteredEvents } from '@/data/eventList';
import ResultsTitle from '@/components/events/results-title';
import ErrorAlert from '@/components/ui/error-alert';

function FilteredEventsPage() {
  const { query } = useRouter();

  const filteredData = query.slug;
  if (!filteredData) return <p>Loading...</p>;

  const selectedYear = +filteredData[0];
  const selectedMonth = +filteredData[1];

  if (isNaN(selectedYear) || isNaN(selectedMonth))
    return (
      <ErrorAlert>
        <p>Invalid filter</p>
      </ErrorAlert>
    );

  const filteredEvents = getFilteredEvents({
    year: selectedYear,
    month: selectedMonth,
  });

  if (!filteredEvents || !filteredEvents.length)
    return (
      <ErrorAlert>
        <p>No events</p>
      </ErrorAlert>
    );

  const date = new Date(selectedYear, selectedMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
