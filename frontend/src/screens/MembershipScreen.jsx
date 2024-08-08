import { Button, Card, CardGroup, Container, Table } from 'react-bootstrap';
import Banner from '../components/Banner';
import { Trans, useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';
import { RiCheckLine } from 'react-icons/ri';

const MembershipScreen = () => {
  const { t, i18n } = useTranslation(['knowledge']);
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
        <CardGroup className="text-center" style={{ gap: '1rem' }}>
          <Card className="mb-4 rounded-3 shadow">
            <Card.Header as="h4" className="py-3 my-0 fw-normal">
              {t('free')}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3" className="pricing-card-title">
                <Trans
                  values={{ price: toCurrency(i18n.language, 0) }}
                  components={{ 1: <small /> }}
                >
                  {t('price')}
                </Trans>
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>{t('buying')}</li>
                  <li>{t('newsletterWith')}</li>
                  <li>{t('accessToClosedFree')}</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="btn btn-lasaphire">Add to cart</Button>
            </Card.Footer>
          </Card>
          <Card className="mb-4 rounded-3 shadow">
            <Card.Header as="h4" className="py-3 my-0 fw-normal">
              {t('monthly')}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3" className="pricing-card-title">
                <Trans
                  values={{
                    price: toCurrency(
                      i18n.language,
                      i18n.language === 'en' ? '12.99' : '4990'
                    ),
                  }}
                  components={{ 1: <small /> }}
                >
                  {t('price')}
                </Trans>
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>{t('freePlanPlus')}</li>
                  <li></li>
                  <li>{t('discountOnThePrice', { discount: '6%' })}</li>
                  <li>{t('monthlyNewsletterWith')}</li>
                  <li>{t('accessToClosedPro')}</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="btn btn-lasaphire">Add to cart</Button>
            </Card.Footer>
          </Card>
          <Card
            className="mb-4 rounded-3 shadow"
            style={{ border: '5px solid rgba(var(--bs-success-rgb), 0.4)' }}
          >
            <Card.Header
              as="h4"
              className="py-3 my-0 fw-normal"
              style={{ backgroundColor: 'rgba(var(--bs-success-rgb), 0.2)' }}
            >
              {t('annual')}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3" className="pricing-card-title">
                <Trans
                  values={{
                    price: toCurrency(
                      i18n.language,
                      i18n.language === 'en' ? '10.83' : '4159'
                    ),
                    priceYr: toCurrency(
                      i18n.language,
                      i18n.language === 'en' ? '129.9' : '49900'
                    ),
                  }}
                  components={{ 1: <small /> }}
                >
                  {t('priceYr')}
                </Trans>
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>{t('monthlyPlanPlus')}</li>
                  <li>{t('monthsDiscount', { count: '2' })}</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{ backgroundColor: 'rgba(var(--bs-success-rgb), 0.2)' }}
            >
              <Button className="btn btn-success btn-lasaphire">
                Add to cart
              </Button>
            </Card.Footer>
          </Card>
        </CardGroup>

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
