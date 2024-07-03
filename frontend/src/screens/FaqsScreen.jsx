import { useState } from 'react';
import { Accordion, Col, Container, Nav, Row } from 'react-bootstrap';
import Banner from '../components/Banner';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { useTranslation } from 'react-i18next';
import { useGetFaqCategoriesQuery } from '../slices/faqCategoriesApiSlice.js';

const FaqsScreen = () => {
  const [fix, setFix] = useState(false);

  const { data: faqCats, isLoading, error } = useGetFaqCategoriesQuery();

  const { t, i18n } = useTranslation();

  const setFixedSidebar = () => {
    if (window.scrollY >= 75) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener('scroll', setFixedSidebar);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner title={t('faqs')} alt={t('faqs')} />
          <Container>
            <Row>
              <Col md={4} className={`faq-sidebar ${fix ? 'fixed' : ''}`}>
                <h3 className="fs-1">{t('categories')}</h3>
                {faqCats.data?.map((cat) => (
                  <Nav key={cat._id} className="nav nav-pills flex-column">
                    <Nav.Item>
                      <Nav.Link href={`#${cat._id}`}>
                        <span className="fs-4">
                          {i18n.language === 'en'
                            ? cat.title
                            : cat.translations?.hu?.title || cat.title}
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                ))}
              </Col>
              <Col md={8}>
                <Accordion flush>
                  {faqCats.data.map((item) => (
                    <>
                      <h2 className="mt-3" key={item._id} id={item._id}>
                        {i18n.language === 'en'
                          ? item.title
                          : item.translations?.hu?.title || item.title}
                      </h2>
                      {item.faqs.map((faq) => (
                        <Accordion.Item key={faq._id} eventKey={faq._id}>
                          <Accordion.Header>
                            {i18n.language === 'en'
                              ? faq.question
                              : faq.translations?.hu?.question || faq.question}
                          </Accordion.Header>
                          <Accordion.Body>
                            {i18n.language === 'en'
                              ? faq.answer
                              : faq.translations?.hu?.answer || faq.answer}
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default FaqsScreen;
