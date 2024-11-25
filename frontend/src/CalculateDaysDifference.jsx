import { useEffect, useState } from "react";

const DaysDifference = ({ givenDate }) => {
  const [daysDifference, setDaysDifference] = useState(null);

  useEffect(() => {
    const today = new Date();
    const targetDate = new Date(givenDate);

    if (!isNaN(targetDate.getTime())) {
      const timeDifference = today - targetDate;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setDaysDifference(days);
    }
  }, [givenDate]);

  return <>{daysDifference}</>;
};

export default DaysDifference;
