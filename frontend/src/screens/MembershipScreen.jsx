import { Container, Table } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import { RiCheckLine } from 'react-icons/ri';
import MembershipTable from '../components/MembershipTable';

const MembershipScreen = () => {
  const { t } = useTranslation(['knowledge']);

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
        <MembershipTable />

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
