import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { htmlToText } from 'html-to-text';
import { toCurrency } from '../utils/converter';

const Event = ({ event, className }) => {
  const { t, i18n } = useTranslation(['event']);

  const formatDate = (date) => {
    const dateStr = new Date(date).toLocaleString(
      i18n.language === 'en' ? 'en-US' : 'hu-HU',
      {
        weekday: 'short',
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }
    );
    const dateArray = dateStr.split(' ');
    return dateArray;
  };

  return (
    <div className={`event-card ${className}`}>
      <div className="header-box">
        <Link to={`/event/${event._id}`}>
          <div className="img-box">
            <img src={event.images[0]} alt="" />
            <img className="hover-image" src={event.images[1]} alt="" />
          </div>
        </Link>
        <div className="date-box">
          {!(
            new Date().getFullYear().toString() ===
            formatDate(event.startDate)[0].substring(0, 4)
          ) && (
            <p className="m-0 date-box__year">{`'${formatDate(event.startDate)[
              i18n.language === 'en' ? 3 : 0
            ].substring(2, 4)}`}</p>
          )}
          <p className="m-0 date-box_month">{formatDate(event.startDate)[1]}</p>
          <p className="m-0 date-box__day">{`${
            formatDate(event.startDate)[2]
          } ${formatDate(event.startDate)[i18n.language === 'en' ? 0 : 3]}`}</p>
          <p className="m-0 date-box__time">
            {`${formatDate(event.startDate)[i18n.language === 'en' ? 5 : 4]} ${
              i18n.language === 'en' ? formatDate(event.startDate)[6] : ''
            }`}
          </p>
        </div>
      </div>
      <div className="info">
        <Link className="text-decoration-none" to={`/event/${event._id}`}>
          <h3>
            {i18n.language === 'en'
              ? event.title
              : event.translations?.hu?.title || event.title}
          </h3>
        </Link>
        <p className="lead fw-semibold">{event.location?.address}</p>
        <p className="lead truncate py-1 scrollto">
          {i18n.language === 'en'
            ? htmlToText(event.description)
            : htmlToText(event.translations?.hu?.description) ||
              htmlToText(event.description)}
        </p>
        <div className="price">
          {toCurrency(
            i18n.language,
            i18n.language === 'en'
              ? event.currentPrice
              : event.translations?.hu?.currentPrice || event.currentPrice
          )}
        </div>
        <Link
          to={`/event/${event._id}`}
          className="btn btn-lasaphire btn-success event-button"
        >
          {t('more&Registration')}
        </Link>
      </div>
    </div>
  );
};

export default Event;
