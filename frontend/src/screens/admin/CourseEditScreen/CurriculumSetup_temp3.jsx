import { useMemo, useRef, useState } from 'react';
import { Accordion, Dropdown, Row } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { RiDraggable } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader.jsx';
import Section from './Section.jsx';
import {
  useAddNewLessonMutation,
  useRemoveLessonMutation,
  useUpdateLessonMutation,
} from '../../../slices/coursesApiSlice.js';

const CurriculumSetup = ({ curriculum, update, courseId, courseRefetch }) => {
  const sectionIds = useMemo(() => {
    return curriculum.map((item) => item.lesson._id);
  }, [curriculum]);

  const lessons = useMemo(() => {
    const sections = curriculum.map((item) => item.lesson);
    let lessons = [];
    sections.map((item) => {
      let temp = item.lessons.map((itm) => itm.lesson);
      lessons = [...lessons, ...temp];
    });
    return lessons;
  }, [curriculum]);

  console.log('Sections: ', sectionIds, 'Lessons: ', lessons);

  const [activeKey, setActiveKey] = useState(undefined);

  const containerRef = useRef();

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const [removeLesson, { isLoadingRemove, isErrorRemove, errorRemove }] =
    useRemoveLessonMutation();

  const [updateLesson, { isLoadingUpdate, isErrorUpdate, errorUpdate }] =
    useUpdateLessonMutation();

  const addNewHandler = async (lessonType) => {
    if (
      window.confirm(
        `Are you sure you want to create a new ${lessonType} lesson?`
      )
    ) {
      try {
        await addNewLesson({
          courseId,
          lessonType,
          section: lessonType !== 'Section' ? activeKey : null,
        });
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
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="d-flex align-items-center"
            style={{ gap: '0.25rem' }}
          >
            <AiOutlinePlusCircle />
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
              <Section
                key={idx}
                item={item}
                idx={idx}
                setActiveKey={setActiveKey}
                updateLesson={updateLesson}
                courseId={courseId}
                courseRefetch={courseRefetch}
                removeHandler={removeHandler}
              />
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
