import { useContext, useEffect, useRef, useState } from 'react';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LangSelectInput from '../../../components/LangSelectInput';
import Lesson from './Lesson.jsx';

const Section = ({
  item,
  idx,
  setActiveKey,
  updateLesson,
  courseId,
  courseRefetch,
  removeHandler,
}) => {
  const subContainerRef = useRef();

  const CustomToggle = ({ eventKey, callback }) => {
    const { activeEventKey, alwaysOpen } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    let isCurrentEventKey = false;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          isCurrentEventKey = true;
        }
      }
    } else {
      setActiveKey(activeEventKey);
      if (activeEventKey === eventKey) {
        isCurrentEventKey = true;
      }
    }

    return (
      <button
        type="button"
        className="border-0 bg-transparent text-secondary"
        onClick={decoratedOnClick}
      >
        {isCurrentEventKey ? <FaMinus /> : <FaPlus />}
      </button>
    );
  };

  const SectionSetup = ({ item }) => {
    const [title, setTitle] = useState('');
    const [transTitleHu, setTransTitleHu] = useState('');

    const sectionSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateLesson({
          courseId,
          lessonId: item.lesson._id,
          title,
          translations: {
            hu: {
              title: transTitleHu,
            },
          },
        }).unwrap();
        toast.success('Lesson updated');
        courseRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    useEffect(() => {
      if (item) {
        setTitle(item.lesson?.title);
        setTransTitleHu(
          item.lesson?.translations?.hu?.title || item.lesson?.title
        );
      }
    }, [item]);

    return (
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={sectionSubmitHandler}>
              <LangSelectInput
                label="Title"
                defLang={title}
                setDefLang={setTitle}
                secLang={transTitleHu}
                setSecLang={setTransTitleHu}
              />
              <Button
                type="submit"
                variant="primary"
                className="mt-3 text-right"
              >
                Update lesson
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  };

  const RemoveButton = ({ children, lessonId, className }) => {
    return (
      <button
        type="button"
        className={`border-0 bg-transparent text-secondary ${className}`}
        onClick={() => removeHandler({ lessonId })}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <Card className="m-3">
        <Card.Header className="d-flex justify-content-between align-items-center text-secondary">
          <h4 className="m-0 fw-bold text-secondary">{`${
            item.lesson?.lessonType === 'Section' ? 'Section' : 'Lesson'
          }-${idx + 1}`}</h4>
          <p className="m-0 lead fw-bold text-secondary">
            {item.lesson?.lessonType}
          </p>
          <div>
            <RemoveButton
              lessonId={item.lesson?._id}
              title="Remove lesson"
              className="me-3 text-danger"
            >
              <FaTrash className="text-color" />
            </RemoveButton>
            <CustomToggle eventKey={item.lesson?._id}>
              <FaPlus />
            </CustomToggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey={item.lesson?._id}>
          {item.lesson?.lessonType === 'Section' && (
            <SectionSetup item={item} />
          )}
        </Accordion.Collapse>
        <Row className="ps-3 pe-1">
          <Accordion defaultActiveKey={[]} alwaysOpen ref={subContainerRef}>
            {item.lesson.lessonType === 'Section' &&
              item.lesson.lessons.length > 0 &&
              item.lesson.lessons.map((itm, ind) => (
                <Lesson
                  key={ind}
                  index={ind}
                  lesson={itm}
                  removeHandler={removeHandler}
                  courseId={courseId}
                  updateLesson={updateLesson}
                  courseRefetch={courseRefetch}
                />
              ))}
          </Accordion>
        </Row>
      </Card>
    </>
  );
};

export default Section;
