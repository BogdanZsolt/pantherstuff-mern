import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const SelectDate = ({ dates, setDates, multiple = false }) => {
  const handleOnChange = (val) => {
    console.log(val);
    const newVal = val?.toString().split(',');
    setDates(newVal);
  };

  return (
    <div className="dp-panther">
      <DatePicker
        locale={'hu-HU'}
        multiple={multiple}
        sort
        plugins={[
          <TimePicker
            hideSeconds
            style={{ minWidth: '100px' }}
            header={false}
            position="top"
          />,
          <DatePanel sort="date" />,
        ]}
        removeButton={true}
        value={dates}
        onChange={handleOnChange}
        className="bg-panther"
        format="YYYY-MM-DD HH:mm"
        minDate={new Date()}
      />
    </div>
  );
};

export default SelectDate;
