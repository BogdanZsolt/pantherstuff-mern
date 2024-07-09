import { useState } from 'react';
import { Accordion, Col, Container, Nav, Row } from 'react-bootstrap';
import Banner from '../components/Banner';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import Editor from '../components/Editor.jsx';
import { useTranslation } from 'react-i18next';
import { useGetFaqCategoriesQuery } from '../slices/faqCategoriesApiSlice.js';

const FaqsScreen = () => {
  const [fix, setFix] = useState(false);

  const { data: faqCats, isLoading, error } = useGetFaqCategoriesQuery();

  const { t, i18n } = useTranslation();

  const setFixedSidebar = () => {
    console.log(window.screenY);
    if (window.scrollY >= 380) {
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
          <Banner
            title={t('faqs')}
            alt={t('faqs')}
            src="/images/ecoprint-06.webp"
          />
          <Container>
            <Row>
              <Col md={4} className="pe-md-2">
                <div className={`faq-sidebar ${fix ? 'fixed' : ''}`}>
                  <h3 className="fs-1">{t('categories')}</h3>
                  {faqCats.data?.map((cat) => (
                    <Nav key={cat._id} className="nav flex-column">
                      <Nav.Item>
                        <Nav.Link
                          href={`#${cat._id}`}
                          onClick={() => {
                            const elemet = document.getElementById(
                              `${cat._id}`
                            );
                            elemet?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                          }}
                        >
                          <span className="fs-4 text-secondary bg-primary">
                            {i18n.language === 'en'
                              ? cat.title
                              : cat.translations?.hu?.title || cat.title}
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  ))}
                </div>
              </Col>
              <Col md={8}>
                <Accordion flush>
                  {faqCats.data.map((item) => (
                    <div key={item._id}>
                      <h2
                        className="mt-3 fs-2 faq-category-title"
                        key={item._id}
                        id={item._id}
                      >
                        <strong>
                          {i18n.language === 'en'
                            ? item.title
                            : item.translations?.hu?.title || item.title}
                        </strong>
                      </h2>
                      {item.faqs.map((faq) => (
                        <Accordion.Item key={faq._id} eventKey={faq._id}>
                          <Accordion.Header>
                            <span className="fs-4">
                              {i18n.language === 'en'
                                ? faq.question
                                : faq.translations?.hu?.question ||
                                  faq.question}
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Editor
                              content={
                                i18n.language === 'en'
                                  ? faq.answer
                                  : faq.translations?.hu?.answer || faq.answer
                              }
                              editable={false}
                            />
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </div>
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
