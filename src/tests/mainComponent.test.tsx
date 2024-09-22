import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Main from '../components/Main/Main';
import useOnThisDayStore from '../store/useOnThisDayStore';

jest.mock('../store/useOnThisDayStore');
jest.mock('../components/LoaderComponent/LoaderComponent', () => () => <div>Loading...</div>);
jest.mock('../components/ErrorModal/ErrorModal', () => ({ isOpen, text }: { isOpen: boolean, text: string }) => (
  isOpen ? <div>{text}</div> : null
));

describe('Main Component', () => {
  beforeEach(() => {
    (useOnThisDayStore as unknown as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    (useOnThisDayStore as unknown as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    render(<Main />);

    expect(screen.getByText('On this day:')).toBeInTheDocument();
    expect(screen.getByText('Show "On This Day" Data')).toBeInTheDocument();
  });

  it('displays loader when loading', () => {
    (useOnThisDayStore as unknown as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      fetchData: jest.fn(),
    });

    render(<Main />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error modal when error is present', () => {
    (useOnThisDayStore as unknown as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: 'Error occurred',
      fetchData: jest.fn(),
    });

    render(<Main />);

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('displays list of events when data is available', () => {
    const mockData = [
      { year: 2000, text: 'Event 1' },
      { year: 2010, text: 'Event 2' },
    ];

    (useOnThisDayStore as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    render(<Main />);

    expect(screen.getByText('Reload Data')).toBeInTheDocument();
    mockData.forEach(event => {
      expect(screen.getByText(`${event.year}: ${event.text}`)).toBeInTheDocument();
    });
  });

  it('calls fetchData when button is clicked', () => {
    const fetchData = jest.fn();

    (useOnThisDayStore as unknown as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      fetchData,
    });

    render(<Main />);

    fireEvent.click(screen.getByText('Show "On This Day" Data'));
    expect(fetchData).toHaveBeenCalled();
  });
});
