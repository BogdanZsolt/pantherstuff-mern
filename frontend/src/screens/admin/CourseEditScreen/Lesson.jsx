import { useContext, useEffect, useState } from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import LangSelectInput from '../../../components/LangSelectInput';
import LangSelectEditor from '../../../components/LangSelectEditor';
import ReactPlayer from 'react-player';
import { convertSecondstoTime } from '../../../utils/converter';
import { toast } from 'react-toastify';

const Lesson = ({
  index,
  lesson,
  removeHandler,
  courseId,
  updateLesson,
  courseRefetch,
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

  const VideoLesson = ({ item }) => {
    const [title, setTitle] = useState('');
    const [transTitleHu, setTransTitleHu] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [transVideoUrlHu, setTransVideoUrlHu] = useState('');
    const [duration, setDuration] = useState(0);

    const videoSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateLesson({
          courseId,
          lessonId: item._id,
          title,
          videoUrl,
          duration,
          translations: {
            hu: {
              title: transTitleHu,
              videoUrl: transVideoUrlHu,
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
        setTitle(item.title);
        setTransTitleHu(item.translations.hu.title);
        setVideoUrl(item.videoUrl);
        setTransVideoUrlHu(item.traslations?.hu?.videoUrl);
        setDuration(item.duration);
      }
    }, [item]);

    const durationHandler = (dur) => {
      if (dur !== duration) {
        setDuration(dur);
      }
    };

    return (
      <Card.Body>
        <Row>
          <Col xl={4} className="bg-red">
            Video Player
            <ReactPlayer
              url={item.videoUrl}
              width="100%"
              height="100%"
              onDuration={durationHandler}
              controls
              muted
            />
          </Col>
          <Col xl={8}>
            <Form onSubmit={videoSubmitHandler}>
              <LangSelectInput
                label="Title"
                defLang={title}
                setDefLang={setTitle}
                secLang={transTitleHu}
                setSecLang={setTransTitleHu}
              />
              <LangSelectInput
                label="Video URL"
                defLang={videoUrl}
                setDefLang={setVideoUrl}
                secLang={transVideoUrlHu}
                setSecLang={setTransVideoUrlHu}
              />
              <FormGroup>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={convertSecondstoTime(duration)}
                  readOnly
                />
              </FormGroup>

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

  const TextualLesson = ({ item }) => {
    const [title, setTitle] = useState('');
    const [transTitleHu, setTransTitleHu] = useState('');
    const [text, setText] = useState('');
    const [transTextHu, setTransTextHu] = useState('');

    const textualSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateLesson({
          courseId,
          lessonId: item._id,
          title,
          text,
          translations: {
            hu: {
              title: transTitleHu,
              text: transTextHu,
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
        setTitle(item.title);
        setTransTitleHu(item.translations.hu.title || item.title);
        setText(item.text);
        setTransTextHu(item.translations.hu.text || item.text);
      }
    }, [item]);

    return (
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={textualSubmitHandler}>
              <LangSelectInput
                label="Title"
                defLang={title}
                setDefLang={setTitle}
                secLang={transTitleHu}
                setSecLang={setTransTitleHu}
              />
              <LangSelectEditor
                label="Text"
                placeholder="Enter description"
                placeholder_hu="Add meg a leírást"
                defLang={text}
                setDefLang={setText}
                secLang={transTextHu}
                setSecLang={setTransTextHu}
                className="mt-3"
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

  return (
    <Card key={index} className="m-3">
      <Card.Header className="d-flex justify-content-between align-items-center text-secondary">
        <h4 className="m-0 fw-bold text-secondary">{`Lesson-${index + 1}`}</h4>
        <p className="m-0 lead fw-bold text-secondary">{lesson.lessonType}</p>
        <div>
          <RemoveButton
            lessonId={lesson?._id}
            title="Remove lesson"
            className="me-3 text-danger"
          >
            <FaTrash className="text-color" />
          </RemoveButton>
          <CustomToggle eventKey={index}>
            <FaPlus />
          </CustomToggle>
        </div>
      </Card.Header>
      <Accordion.Collapse eventKey={index}>
        {lesson.lessonType === 'Video' ? (
          <VideoLesson item={lesson} />
        ) : (
          lesson.lessonType && <TextualLesson item={lesson} />
        )}
      </Accordion.Collapse>
    </Card>
  );
};

export default Lesson;
