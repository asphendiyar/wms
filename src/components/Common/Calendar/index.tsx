import Calendar from "react-calendar";
import "../../../assets/сalendar.css";

type CalendarProps = {
  value: Date;
  onChange: () => void;
  locale?: null | string;
};

const CustomCalendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  locale,
}) => (
  <>
    <Calendar
      onChange={onChange}
      value={value}
      locale={locale ? locale : "ru-RU"}
    />
  </>
);

export default CustomCalendar;
