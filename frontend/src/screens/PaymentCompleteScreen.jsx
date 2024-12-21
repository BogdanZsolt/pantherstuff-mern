import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container } from 'react-bootstrap';
import { toCurrency, toLocalDate } from '../utils/converter';
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { usePaymentVerificationQuery } from '../slices/ordersApiSlice';

const PaymentCompleteScreen = () => {
  // Sikeres befizetés!
  // A bank visszajelezte portálunknak, hogy a fizetés sikeresen megtörtént. Köszönjük befizetését!

  // Az alábbi táblázat tartalmazza a tranzakció adatait:

  // A tranzakció azonosítója:	6929256251265567
  // Engedélyszám:	547246
  // Időpont:	2024.09.17. 17:20:11
  // Összeg:	3 175 Ft
  // Válaszkód:	00
  // Válaszüzenet:	Tranzakció elfogadva
  // A tranzakció adatait elküldtük emailben is, hogy kérdés esetén tudjon hivatkozni rájuk.

  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_intent');

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data, isLoading, error } = usePaymentVerificationQuery({
    paymentId,
  });

  const continueHandler = () => {
    navigate('/profile');
  };

  console.log(data);

  return (
    <>
      <Banner src="/images/ecoprint-02.webp" title={t('paymentVerification')} />
      <Container>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
        >
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="d-flex align-items-center shadow-lg rounded px-3 py-2">
              <FaTimesCircle className="fs-2 me-2 text-danger" />
              <p className="fs-2 mb-0">{t('paymentVerificationFailed')}</p>
              <p className="text-danger">
                {error?.data?.message || error.error}
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center shadow-lg rounded px-3 py-2">
              <div className="d-flex align-items-center">
                <FaCheckCircle className="fs-2 me-2 text-success" />
                <p className="fs-2 mb-0">{t('paymentSuccessful')}</p>
              </div>
              <p className="lead">
                {t('basedOnTheFeedback')}{' '}
                <span>{t('thankYouForYourPurchase')}</span>
              </p>
              <p className="lead">
                {t('theTableBelow')}
                {': '}
              </p>
              <p className="lead">
                {t('transactionId')}
                {': '}
                <span className="fw-bold">{data.paymentResult.id}</span>
              </p>
              <p className="lead">
                {t('time')}:{' '}
                <span className="fw-bold">
                  {toLocalDate(data.language, data.paidAt)}
                </span>
              </p>
              <p className="lead">
                {t('amount')}
                {': '}
                <span className="fw-bold">
                  {toCurrency(data.language, data.paymentResult.amount)}
                </span>
              </p>
              <p className="lead">{t('weAlsoSentTheTransactionDetails')}</p>
              <Button
                className="btn btn-success btn-lasaphire"
                onClick={continueHandler}
              >
                {t('continue')}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PaymentCompleteScreen;
