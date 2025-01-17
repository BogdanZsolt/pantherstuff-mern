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
import { RiDraggable } from 'react-icons/ri';
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
  setCurriculum,
  update,
  courseId,
  courseRefetch,
}) => {
  const [isDragging, setIsDragging] = useState();

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
              videoUrl: transTextHu,
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

  const detectLeftButton = (e) => {
    e = e || window.event;
    if ('buttons' in e) {
      return e.buttons === 1;
    }

    let button = e.which || e.button;
    return button === 1;
  };

  const dragStartHandler = (e, index) => {
    if (!detectLeftButton()) return;

    setIsDragging(index);

    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_, i) => i !== index);
    const dragLesson = curriculum[index];
    let newData = [...curriculum];

    // getBoundingClientRect of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // distance between two cards
    const space =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    // set style for dragItem when mouse down
    dragItem.style.position = 'fixed';
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + 'px';
    dragItem.style.height = dragBoundingRect.height + 'px';
    dragItem.style.top = dragBoundingRect.top + 'px';
    dragItem.style.left = dragBoundingRect.left + 'px';
    dragItem.style.cursor = 'grabbing';

    // create alternate div element when dragItem position is fixed
    const div = document.createElement('div');
    div.id = 'div-temp';
    div.style.width = dragBoundingRect.width + 'px';
    div.style.height = dragBoundingRect.height + 'px';
    div.style.pointerEvents = 'none';
    container.appendChild(div);

    // move the elements below dragItem
    // distance to be moved
    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    // get the original coordinates of the mouse pointer
    let x = e.clientX;
    let y = e.clientY;

    // perform the function on hover
    const dragMove = (e) => {
      // Calculate the distance the mouse pointer has travelled
      // Original coordinates minus current current coordinates
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      // Move item
      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

      // swap position and data
      notDragItems.forEach((item) => {
        // check two elements is overlapping
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          // Swap position card
          if (item.getAttribute('style')) {
            item.style.transform = '';
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }
          // Swap position data
          newData = curriculum.filter(
            (item) => item.lesson._id !== dragLesson.lesson._id
          );
          newData.splice(index, 0, dragLesson);
        }
      });
    };
    document.onpointermove = dragMove;

    // Finish onPointerDown event
    const dragEnd = () => {
      document.onpointerup = '';
      document.onpointermove = '';
      setIsDragging(undefined);
      dragItem.style = '';
      container.removeChild(div);
      items.forEach((item) => (item.style = ''));
      setCurriculum(newData);
    };
    document.onpointerup = dragEnd;
  };

  const DraggableButton = ({ children, className, index }) => {
    return (
      <button
        type="button"
        className={`border-0 bg-transparent text-secondary ${className}`}
        onPointerDown={(e) => dragStartHandler(e, index)}
      >
        {children}
      </button>
    );
  };

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
            Add new lesson
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => addNewHandler('Video')}>
              Video lesson
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addNewHandler('Textual')}>
              Textual lesson
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row>
        <Accordion defaultActiveKey={[0]} alwaysOpen ref={containerRef}>
          {curriculum &&
            curriculum.map((item, idx) => (
              <Card
                key={idx}
                className={`m-3 ${isDragging === idx ? 'dragging' : ''}`}
              >
                <Card.Header className="d-flex justify-content-between align-items-center text-secondary">
                  <h4 className="m-0 fw-bold text-secondary">{`Lesson-${
                    idx + 1
                  }`}</h4>
                  <p className="m-0 lead fw-bold text-secondary">
                    {item.lessonType}
                  </p>
                  <div>
                    <RemoveButton
                      lessonId={item.lesson._id}
                      title="Remove lesson"
                      className="me-3 text-danger"
                    >
                      <FaTrash className="text-color" />
                    </RemoveButton>
                    <CustomToggle eventKey={idx}>
                      <FaPlus />
                    </CustomToggle>
                    <DraggableButton index={idx}>
                      <RiDraggable />
                    </DraggableButton>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey={idx}>
                  {item.lessonType === 'Video' ? (
                    <VideoLesson item={item} />
                  ) : (
                    <TextualLesson item={item} />
                  )}
                </Accordion.Collapse>
              </Card>
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
