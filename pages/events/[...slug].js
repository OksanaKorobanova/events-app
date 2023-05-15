import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import EventList from '@/components/events/event-list';
import { reformatEvents } from '../../helpers/api-util';
import ResultsTitle from '@/components/events/results-title';
import ErrorAlert from '@/components/ui/error-alert';

const fetcher = (url) => fetch(url).then((res) => res.json());

function FilteredEventsPage() {
  const router = useRouter();

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

  let pageHead = (
    <Head>
      <title>Filtered events</title>
      <meta name='description' content='A list of filtered events' />
    </Head>
  );

  if (isLoading) {
    return (
      <>
        {pageHead}
        <p className='center'>Loading...</p>;
      </>
    );
  }

  const filterData = router.query.slug;

  const selectedYear = +filterData[0];
  const selectedMonth = +filterData[1];

  pageHead = (
    <Head>
      <title>Filtered events</title>
      <meta
        name='description'
        content={`All events for${selectedMonth}/${selectedYear}`}
      />
    </Head>
  );

  if (
    isNaN(selectedYear) ||
    isNaN(selectedMonth) ||
    selectedMonth < 1 ||
    selectedMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHead}
        <ErrorAlert>
          <p>Invalid filter</p>
        </ErrorAlert>
      </>
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
      <>
        {pageHead}
        <ErrorAlert>
          <p>No events</p>
        </ErrorAlert>
      </>
    );

  const date = new Date(selectedYear, selectedMonth - 1);

  return (
    <>
      {pageHead}
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
