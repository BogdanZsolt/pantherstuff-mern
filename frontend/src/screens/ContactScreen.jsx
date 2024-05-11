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

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  const messageHandler = (e) => {
    e.preventDefault();
  };

  console.log(telephone);

  return (
    <>
      <Banner
        title="Contact"
        src="/images/ecoprint-06-1280x360.webp"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
        alt="Contact"
      />
      <Container>
        <Row className="mb-md-5">
          <Col md={6} className="mb-5">
            <h3>Bravely Reach Out in Person!</h3>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiMapPinLine className="lead mb-3" />
                <p className="lead">Address</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>1122. Budapest</span>
                <span>Hungary</span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiHourglassLine className="lead mb-3" />
                <p className="lead">Contact Hours</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>Monday - Friday: 9:00am - 6:00pm</span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiPhoneLine className="lead mb-3" />
                <p className="lead">Telephone</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>
                  <a href="tel:+36304225096">+36 (30) 422-5096</a>
                </span>
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiMailLine className="lead mb-3 me-1" />
                <p className="lead">Email</p>
              </div>
              <div className="d-flex flex-column ps-3">
                <span>
                  <a href="mailto: cspetra8@gmail.com">cspetra8@gmail.com</a>
                </span>
              </div>
            </div>
            <SocialMenu />
          </Col>
          <Col md={6}>
            <h3>Waiting for your message!</h3>
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
            />
          </Col>
        </Row>
      </Container>
      ;
    </>
  );
};

export default ContactScreen;
