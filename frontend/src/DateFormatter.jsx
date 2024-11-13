import { format } from 'date-fns';

const DateFormatter = ({ dateString }) => {
  // Return only the formatted date string
  return format(new Date(dateString), 'd MMMM');
};

export default DateFormatter;