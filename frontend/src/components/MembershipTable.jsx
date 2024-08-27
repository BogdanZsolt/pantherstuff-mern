import { Button, Card, CardGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toCurrency, uuid } from '../utils/converter';
import { useGetPlansQuery } from '../slices/plansApiSlice';
import { addToCart } from '../slices/cartSlice';

const MembershipTable = () => {
  const { i18n, t } = useTranslation(['knowledge']);
  const {
    data: plans,
    isLoading,
    error,
  } = useGetPlansQuery({ sort: 'createdAt' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = (plan) => {
    const { _id, name, price, recommended } = plan;
    const cartId = uuid();
    const name_hu = plan.translations?.hu?.name || name;
    const currentPrice_hu = plan.translations?.hu?.price || price;
    const qty = 1;
    const type = 'membership';
    if (price === 0) {
      return navigate('/register');
    }
    console.log(_id);
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        currentPrice: price,
        currentPrice_hu,
        recommended,
        qty,
      })
    );
    // return navigate('/cart');
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message></Message>
      ) : (
        <CardGroup className="text-center" style={{ gap: '1rem' }}>
          {plans.data.map((plan) => (
            <Card
              key={plan._id}
              className="mb-4 rounded-3 shadow"
              style={
                plan.recommended
                  ? { border: '5px solid rgba(var(--bs-success-rgb), 0.4)' }
                  : {}
              }
            >
              <Card.Header
                as="h4"
                className="py-3 my-0 fw-normal"
                style={
                  plan.recommended
                    ? {
                        backgroundColor: 'rgba(var(--bs-success-rgb), 0.2)',
                      }
                    : {}
                }
              >
                {i18n.language === 'en'
                  ? plan.name
                  : plan.translations?.hu?.name || plan.name}
              </Card.Header>
              <Card.Body>
                <Card.Title as="h3" className="pricing-card-title">
                  <Trans
                    values={{
                      price: toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? plan.price
                          : plan.translations?.hu?.price || plan.price
                      ),
                    }}
                    components={{ 1: <small /> }}
                  >
                    {t('price')}
                  </Trans>
                </Card.Title>
                <Card.Text as="div">
                  <ul className="list-unstyled mt-3 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        {i18n.language === 'en'
                          ? feature
                          : plan.translations?.hu?.features[i]}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={
                  plan.recommended
                    ? { backgroundColor: 'rgba(var(--bs-success-rgb), 0.2)' }
                    : {}
                }
              >
                <Button
                  className={`btn btn-lasaphire ${
                    plan.recommended && 'btn-success'
                  }`}
                  onClick={() => addToCartHandler(plan)}
                >
                  {plan.price === 0 ? t('register') : t('addToCart')}
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </CardGroup>
      )}
    </>
  );
};

export default MembershipTable;