import LoaderComponent from '../LoaderComponent/LoaderComponent';
import useOnThisDayStore from '../../store/useOnThisDayStore';
import './style.scss';
import ErrorModal from '../ErrorModal/ErrorModal';

const Main = () => {
  const { data, loading, error, fetchData } = useOnThisDayStore();

  return (
    <main>
      <h1>On this day:</h1>
      <button onClick={fetchData} className="fetch-button" disabled={loading}>{!data.length ? 'Show "On This Day" Data' : 'Reload Data'}</button>
      {loading && <LoaderComponent />}
      <ErrorModal isOpen={!!error} text={error || 'Something went wrong'} />
      <ul className="events-list">
        {data.map((event, index) => (
          <li key={index} className="events-list__item">
            <span className="year">{event.year}</span>: {event.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;