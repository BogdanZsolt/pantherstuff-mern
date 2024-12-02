import { Accordion, Form, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import PriceSlider from './PriceSlider';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventFilterSidebar = ({
  categories,
  category,
  setCategory,
  dateRange,
  setDateRange,
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
  className,
}) => {
  const { t, i18n } = useTranslation(['event']);
  const [startDate, endDate] = dateRange;

  return (
    <div className={className} style={{ width: '100%' }}>
      <h3>{t('filters')}</h3>
      <Row>
        <Accordion
          defaultActiveKey={['categories', 'datePicker', 'price']}
          flush
          alwaysOpen
          style={{ '--bs-accordion-bg': 'transparent' }}
        >
          <Accordion.Item eventKey="categories">
            <Accordion.Header>{t('categories')}</Accordion.Header>
            <Accordion.Body>
              <SelectCategory
                categories={categories}
                category={category}
                setCategory={setCategory}
                multi
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="datePicker">
            <Accordion.Header>Date</Accordion.Header>
            <Accordion.Body>
              <Form.Group controlId="dateRange" className="date-panther">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  dateFormat={
                    i18n.language === 'en' ? 'dd/MM/yyyy' : 'yyyy-MM-dd'
                  }
                  isClearable={true}
                  calendarStartDay={1}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  closeOnScroll={true}
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="price">
            <Accordion.Header>{t('price')}</Accordion.Header>
            <Accordion.Body>
              <PriceSlider
                min={min}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                max={max}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </div>
  );
};

export default EventFilterSidebar;
