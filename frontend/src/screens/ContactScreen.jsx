import { Container, Row, Col } from 'react-bootstrap';
import Banner from '../components/Banner';
import { RiMapPinLine } from 'react-icons/ri';

const ContactScreen = () => {
  return (
    <>
      <Banner
        title="Contact"
        src="/images/ecoprint-06-1280x360.webp"
        alt="Contact"
      />
      <Container>
        <Row>
          <Col>
            <h3>Bravely Reach Out in Person!</h3>
            <div>
              <div className="d-inline-flex justify-content-start align-items-center">
                <RiMapPinLine />
                <h4>Address</h4>
              </div>
            </div>
          </Col>
          <Col>
            <h3>Waiting for your message!</h3>
          </Col>
        </Row>
      </Container>
      ;
    </>
  );
};

export default ContactScreen;
