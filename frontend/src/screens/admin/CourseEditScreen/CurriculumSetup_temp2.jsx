import { useContext, useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import ReactPlayer from 'react-player';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
// import { RiDraggable } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader.jsx';
import LangSelectInput from '../../../components/LangSelectInput.jsx';
import LangSelectEditor from '../../../components/LangSelectEditor.jsx';
import { convertSecondstoTime } from '../../../utils/converter.js';
import {
  useAddNewLessonMutation,
  useRemoveLessonMutation,
  useUpdateLessonMutation,
} from '../../../slices/coursesApiSlice.js';

const CurriculumSetup = ({
  curriculum,
  // setCurriculum,
  update,
  courseId,
  courseRefetch,
}) => {
  // const [isDragging, setIsDragging] = useState();
  const [activeKey, setActiveKey] = useState(undefined);

  const containerRef = useRef();

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const [removeLesson, { isLoadingRemove, isErrorRemove, errorRemove }] =
    useRemoveLessonMutation();

  const [updateLesson, { isLoadingUpdate, isErrorUpdate, errorUpdate }] =
    useUpdateLessonMutation();

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

  const addNewHandler = async (lessonType) => {
    if (
      window.confirm(
        `Are you sure you want to create a new ${lessonType} lesson?`
      )
    ) {
      try {
        await addNewLesson({ courseId, lessonType });
        toast.success(`${lessonType} lesson created`);
        courseRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const removeHandler = async ({ lessonId }) => {
    if (
      window.confirm(`Are you sure you want to remove the ${lessonId} lesson?`)
    ) {
      try {
        await removeLesson({ courseId, lessonId });
        toast.success(`${lessonId} lesson removed`);
        courseRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
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
          lessonId: item.lesson._id,
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
        setTitle(item.lesson.title);
        setTransTitleHu(item.lesson.translations.hu.title);
        setVideoUrl(item.lesson.videoUrl);
        setTransVideoUrlHu(item.lesson.traslations?.hu?.videoUrl);
        setDuration(item.lesson.duration);
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
              url={item.lesson.videoUrl}
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
          lessonId: item.lesson._id,
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
        setTitle(item.lesson.title);
        setTransTitleHu(item.lesson.translations.hu.title || item.lesson.title);
        setText(item.lesson.text);
        setTransTextHu(item.lesson.translations.hu.text || item.lesson.text);
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

  console.log(curriculum);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        isError && toast.error(error.data?.message || error.error)
      )}
      {isLoadingRemove ? (
        <Loader />
      ) : (
        isErrorRemove &&
        toast.error(errorRemove.data?.message || errorRemove.error)
      )}
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate &&
        toast.error(errorUpdate.data?.message || errorUpdate.error)
      )}
      <Row className="mb-3">
        <h2 className="text-center fw-bold">Edit Curriculum</h2>
      </Row>
      <div className="mb-3 d-flex justify-content-end align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add new item
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => addNewHandler('Section')}>
              Section
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => addNewHandler('Video')}
              disabled={!activeKey}
            >
              Video lesson
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => addNewHandler('Textual')}
              disabled={!activeKey}
            >
              Textual lesson
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row>
        <Accordion defaultActiveKey={activeKey} ref={containerRef}>
          {curriculum &&
            curriculum.map((item, idx) => (
              <>
                <Card
                  key={idx}
                  className={`m-3`}
                  data-lessontype={item.lesson?.lessonType}
                >
                  <Card.Header className="d-flex justify-content-between align-items-center text-secondary">
                    <h4 className="m-0 fw-bold text-secondary">{`${
                      item.lesson?.lessonType === 'Section'
                        ? 'Section'
                        : 'Lesson'
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
                    {item.lesson?.lessonType === 'Video' ? (
                      <VideoLesson item={item} />
                    ) : item.lesson?.lessonType === 'Textual' ? (
                      <TextualLesson item={item} />
                    ) : (
                      <SectionSetup item={item} />
                    )}
                  </Accordion.Collapse>
                </Card>
              </>
            ))}
        </Accordion>
      </Row>
      <button className="btn btn-primary mt-3" onClick={update}>
        Update
      </button>
    </>
  );
};

export default CurriculumSetup;
