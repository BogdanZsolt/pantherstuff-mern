import { useContext } from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { Accordion, Card } from 'react-bootstrap';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { RiDraggable } from 'react-icons/ri';

const Lesson = ({
  index,
  lesson,
  removeHandler,
  VideoLesson,
  TextualLesson,
}) => {
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
    <Card key={index} className="m-3">
      <Card.Header className="d-flex justify-content-between align-items-center text-secondary">
        <h4 className="m-0 fw-bold text-secondary">{`Lesson-${index + 1}`}</h4>
        <p className="m-0 lead fw-bold text-secondary">{lesson.lessonType}</p>
        <div>
          <RemoveButton
            lessonId={lesson.lesson._id}
            title="Remove lesson"
            className="me-3 text-danger"
          >
            <FaTrash className="text-color" />
          </RemoveButton>
          <CustomToggle eventKey={index}>
            <FaPlus />
          </CustomToggle>
          <button
            type="button"
            className="border-0 bg-transparent text-secondary"
          >
            <RiDraggable />
          </button>
        </div>
      </Card.Header>
      <Accordion.Collapse eventKey={index}>
        {lesson.lessonType === 'Video' ? (
          <VideoLesson item={lesson} />
        ) : (
          <TextualLesson item={lesson} />
        )}
      </Accordion.Collapse>
    </Card>
  );
};

export default Lesson;
