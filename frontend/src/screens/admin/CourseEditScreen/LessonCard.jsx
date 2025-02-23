import { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { EditButton, RemoveButton } from './Buttons';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import LangSelectInput from '../../../components/LangSelectInput';
import { convertSecondstoTime } from '../../../utils/converter';
import LangSelectEditor from '../../../components/LangSelectEditor';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const LessonCard = ({
  lesson,
  courseId,
  updateLesson,
  courseRefetch,
  removeHandler,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lesson._id,
    data: {
      type: 'Lesson',
      lesson,
    },
  });

  const style = {
    height: '52px',
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-secondary opacity-50 border-2 border-success my-2 mx-3"
      />
    );
  }

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
          lessonId: item?._id,
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
        handleClose();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    useEffect(() => {
      if (item) {
        setTitle(item?.title);
        setTransTitleHu(item?.translations.hu.title);
        setVideoUrl(item?.videoUrl);
        setTransVideoUrlHu(item.translations?.hu?.videoUrl);
        setDuration(item?.duration);
      }
    }, [item]);

    const durationHandler = (dur) => {
      if (dur !== duration) {
        setDuration(dur);
      }
    };

    return (
      <Modal.Body className="mb-4">
        <Row>
          <Col xl={4} className="bg-red">
            Video Player
            <ReactPlayer
              url={item?.videoUrl}
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
              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary" className="mt-3">
                  Update lesson
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
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
          lessonId: item?._id,
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
        handleClose();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    useEffect(() => {
      if (item) {
        setTitle(item?.title);
        setTransTitleHu(item?.translations.hu.title || item?.title);
        setText(item?.text);
        setTransTextHu(item?.translations.hu.text || item?.text);
      }
    }, [item]);

    return (
      <Modal.Body className="mb-4">
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
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3 text-right"
                >
                  Update lesson
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    );
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={lesson?._id}
        className="mt-2 mx-3 card"
      >
        <div className="d-flex justify-content-between card-header">
          <h4 className="m-0 fw-bold text-secondary">{lesson?.title}</h4>
          <p className="m-0 lead fw-bold text-secondary">
            {lesson?.lessonType}
          </p>
          <div>
            <RemoveButton
              lessonId={lesson?._id}
              title="Remove lesson"
              className="me-3 text-danger"
              handler={removeHandler}
            >
              <FaTrash className="text-color" />
            </RemoveButton>
            <EditButton handler={handleShow}>
              <FaEdit className="text-color" />
            </EditButton>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {lesson?.lessonType} lesson</Modal.Title>
        </Modal.Header>
        {lesson?.lessonType === 'Video' ? (
          <VideoLesson item={lesson} />
        ) : (
          lesson?.lessonType === 'Textual' && <TextualLesson item={lesson} />
        )}
      </Modal>
    </>
  );
};

export default LessonCard;
