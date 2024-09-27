import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Banner from '../components/Banner';
import {
  RiMapPinLine,
  RiHourglassLine,
  RiPhoneLine,
  RiMailLine,
} from 'react-icons/ri';
import SocialMenu from '../components/SocialMenu';
import ContactEmailForm from '../components/ContactEmailForm';
import { useTranslation } from 'react-i18next';
import { useCreateContactMessageMutation } from '../slices/contactMessageApiSlice.js';
import { toast } from 'react-toastify';

const ContactScreen = () => {
  const { t } = useTranslation(['contact']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  const [createContactMessage, { isLoading }] =
    useCreateContactMessageMutation();

  const messageHandler = async (e) => {
    e.preventDefault();
    try {
      const contactMess = await createContactMessage({
        name,
        email,
        telephone,
        message,
        to: import.meta.env.VITE_OWNER_EMAIL,
      }).unwrap();
      if (contactMess) {
        setName('');
        setEmail('');
        setTelephone('');
        setMessage('');
        toast.success(t('yourMessageHasBeenForwarded'));
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Banner
        title={t('contact')}
        src="/images/ecoprint-06-1280x360.webp"
        description={t('contactDescription')}
        alt="Contact"
      />
      <Container>
        <Row className="mb-md-5">
          <Col md={6} className="mb-5">
            <h3>{t('bravely')}</h3>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiMapPinLine className="lead mb-3" />
                <p className="lead">{t('address')}</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>{t('city')}</span>
                <span>{t('country')}</span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiHourglassLine className="lead mb-3" />
                <p className="lead">{t('contactHoursTitle')}</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>{t('contactHours')}</span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiPhoneLine className="lead mb-3" />
                <p className="lead">{t('telephone')}</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>
                  <a href={`tel:${t('phoneNumberHrf')}`}>{t('phoneNumber')}</a>
                </span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiMailLine className="lead mb-3 me-1" />
                <p className="lead">{t('ownerEmail')}</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>
                  <a href={`mailto: ${t('ownerEmailAddress')}`}>
                    {t('ownerEmailAddress')}
                  </a>
                </span>
              </div>
            </div>
            <SocialMenu />
          </Col>
          <Col md={6}>
            <h3>{t('waitingMessage')}</h3>
            <ContactEmailForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              telephone={telephone}
              setTelephone={setTelephone}
              message={message}
              setMessage={setMessage}
              messageHandler={messageHandler}
              loader={isLoading}
            />
          </Col>
        </Row>
      </Container>
      ;
    </>
  );
};

export default ContactScreen;
