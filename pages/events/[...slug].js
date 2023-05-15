import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import { reformatEvents } from '../../helpers/api-util';
import ResultsTitle from '@/components/events/results-title';
import ErrorAlert from '@/components/ui/error-alert';

const fetcher = (url) => fetch(url).then((res) => res.json());

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  const [events, setEvents] = useState([]);

  const { data, error, isLoading } = useSWR(
    'https://next-js-35a59-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const reformattedEvents = reformatEvents(data);
      setEvents(reformattedEvents);
    }
  }, [data]);

  if (isLoading) {
    return <p className='center'>Loading...</p>;
  }

  const selectedYear = +filterData[0];
  const selectedMonth = +filterData[1];

  if (
    isNaN(selectedYear) ||
    isNaN(selectedMonth) ||
    selectedMonth < 1 ||
    selectedMonth > 12 ||
    error
  ) {
    return (
      <ErrorAlert>
        <p>Invalid filter</p>
      </ErrorAlert>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedYear &&
      eventDate.getMonth() === selectedMonth - 1
    );
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

// Client side fetching more suitable for that case. But for test purpose I left Server side rendering here

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const selectedYear = +filterData[0];
//   const selectedMonth = +filterData[1];

//   if (
//     isNaN(selectedYear) ||
//     isNaN(selectedMonth) ||
//     selectedMonth < 1 ||
//     selectedMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: selectedYear,
//     month: selectedMonth,
//   });

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       date: {
//         year: selectedYear,
//         month: selectedMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
