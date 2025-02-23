import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import LangSelectInput from '../../../components/LangSelectInput';
import { toast } from 'react-toastify';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { EditButton, RemoveButton } from './Buttons';
import LessonCard from './LessonCard';

const SectionContainer = ({
  item,
  lessons,
  updateLesson,
  courseId,
  courseRefetch,
  addNewHandler,
  removeHandler,
  sortListUpdateHandler,
  className,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lessonsId = useMemo(() => {
    return lessons.map((lesson) => lesson._id);
  }, [lessons]);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item?._id,
      data: {
        type: 'Section',
        item,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const SectionSetup = ({ item }) => {
    const [title, setTitle] = useState('');
    const [transTitleHu, setTransTitleHu] = useState('');

    const sectionSubmitHandler = async (e) => {
      e.preventDefault();
      await sortListUpdateHandler(false);
      courseRefetch();
      try {
        await updateLesson({
          courseId,
          lessonId: item?._id,
          title,
          translations: {
            hu: {
              title: transTitleHu,
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
        setTransTitleHu(item?.translations?.hu?.title || item?.title);
      }
    }, [item]);

    return (
      <Modal.Body className="mb-4">
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
      </Modal.Body>
    );
  };

  return (
    <>
      <Card ref={setNodeRef} style={style} className={`m-3 ${className}`}>
        <Card.Header
          {...attributes}
          {...listeners}
          className="d-flex justify-content-between align-items-center text-secondary"
        >
          <h4 className="m-0 fw-bold text-secondary">{item?.title}</h4>
          <p className="m-0 lead fw-bold text-secondary">{item?.lessonType}</p>
          <div>
            <RemoveButton
              lessonId={item?._id}
              title="Remove lesson"
              handler={removeHandler}
              className="me-3 text-danger"
            >
              <FaTrash className="text-color" />
            </RemoveButton>
            <EditButton handler={handleShow}>
              <FaEdit className="text-color" />
            </EditButton>
          </div>
        </Card.Header>
        <div>
          <SortableContext items={lessonsId}>
            {lessons &&
              lessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  removeHandler={removeHandler}
                  courseId={courseId}
                  updateLesson={updateLesson}
                  courseRefetch={courseRefetch}
                />
              ))}
          </SortableContext>
          <div className="mt-3 mb-1 pe-3 d-flex justify-content-end align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                className="d-flex align-items-center"
                style={{ gap: '0.25rem' }}
              >
                <AiOutlinePlusCircle />
                Add new lesson
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => addNewHandler('Video', item._id)}>
                  Video lesson
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => addNewHandler('Textual', item._id)}
                >
                  Textual lesson
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Section</Modal.Title>
        </Modal.Header>
        <SectionSetup item={item} />
      </Modal>
    </>
  );
};

export default SectionContainer;
