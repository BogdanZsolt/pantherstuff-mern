import { Button, Card, CardGroup, Container, Table } from 'react-bootstrap';
import Banner from '../components/Banner';
import { Trans, useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';
import { RiCheckLine } from 'react-icons/ri';
import { useGetPlansQuery } from '../slices/plansApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MembershipScreen = () => {
  const { t, i18n } = useTranslation(['knowledge']);

  const {
    data: plans,
    isLoading,
    error,
  } = useGetPlansQuery({ sort: 'createdAt' });

  return (
    <>
      <Banner
        title={t('membership')}
        src="/images/ecoprint-02.webp"
        alt={t('membership')}
      />
      <Container className="py-3">
        <p className="lead mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia odio
          voluptate, modi libero maxime itaque impedit mollitia quae, magnam
          ullam nesciunt voluptas? Quod dignissimos temporibus unde cupiditate
          eos ex expedita facilis quos magni placeat adipisci non omnis
          inventore, soluta id!
        </p>
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
                  >
                    Add to cart
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>
        )}

        <h2 className="display-6 text-center my-4">{t('comparePlans')}</h2>
        <Table responsive striped className="text-center">
          <thead>
            <tr>
              <th style={{ width: '34%' }}></th>
              <th style={{ width: '22%' }}>{t('free')}</th>
              <th style={{ width: '22%' }}>{t('monthly')}</th>
              <th
                style={{
                  width: '22%',
                  borderTop: '5px solid var(--bs-success)',
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                {t('annual')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="text-start">
                {t('buying')}
              </th>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('newsletter')}
              </th>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('accessToClosedFree')}
              </th>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('discountOnThePrice', { discount: '' })}
              </th>
              <td></td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('monthlyNewsletter')}
              </th>
              <td></td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('accessToClosedPro')}
              </th>
              <td></td>
              <td>
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
              <td
                style={{
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-start">
                {t('discountMembershipPrice')}
              </th>
              <td></td>
              <td></td>
              <td
                style={{
                  borderBottom: '5px solid var(--bs-success)',
                  borderLeft: '5px solid var(--bs-success)',
                  borderRight: '5px solid var(--bs-success)',
                }}
              >
                <RiCheckLine style={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default MembershipScreen;
