import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dropdown, Accordion, Row } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { RiDraggable } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader.jsx';
import SectionContainer from './SectionContainer.jsx';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import {
  useAddNewLessonMutation,
  useRemoveLessonMutation,
  useUpdateLessonMutation,
  useLessonArrayMoveMutation,
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  const [activeKey, setActiveKey] = useState(undefined);
  const [activeSection, setActiveSection] = useState(null);

  const containerRef = useRef();

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const [removeLesson, { isLoadingRemove, isErrorRemove, errorRemove }] =
    useRemoveLessonMutation();

  const [updateLesson, { isLoadingUpdate, isErrorUpdate, errorUpdate }] =
    useUpdateLessonMutation();

  const [lessonArrayMove, { isLoadingMove, isErrorMove, errorMove }] =
    useLessonArrayMoveMutation();

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

  const arrayMoveHandler = async ({
    fromLessonId,
    toSectionId = null,
    toLessonId,
  }) => {
    try {
      await lessonArrayMove({
        courseId,
        fromLessonId,
        toSectionId,
        toLessonId,
      });
      toast.success(`${fromLessonId} lesson moved`);
      courseRefetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const onDragStart = (event) => {
    console.log('DRAG STRAT: ', event);
    if (event.active.data.current.type === 'Section') {
      setActiveSection(event.active.data.current.item);
      return;
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeSectionId = active.id;
    const overSectionId = over.id;

    if (activeSectionId === overSectionId) return;

    arrayMoveHandler({
      fromLessonId: activeSectionId,
      toLessonId: overSectionId,
    });
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
      {isLoadingMove ? (
        <Loader />
      ) : (
        isErrorMove && toast.error(errorMove.data?.message || errorMove.error)
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
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetection={closestCorners}
      >
        <Row className="w-100">
          <Accordion defaultActiveKey={activeKey} ref={containerRef}>
            <SortableContext items={sectionIds}>
              {curriculum &&
                curriculum.map((item) => (
                  <SectionContainer
                    key={item.lesson._id}
                    item={item.lesson}
                    lessons={lessons}
                    setActiveKey={setActiveKey}
                    courseId={courseId}
                    courseRefetch={courseRefetch}
                    removeHandler={removeHandler}
                    updateLesson={updateLesson}
                  />
                ))}
            </SortableContext>
          </Accordion>
        </Row>
        {createPortal(
          <DragOverlay>
            {activeSection && (
              <SectionContainer
                item={activeSection}
                lessons={lessons}
                setActiveKey={setActiveKey}
                courseId={courseId}
                courseRefetch={courseRefetch}
                removeHandler={removeHandler}
                className="shadow"
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <button className="btn btn-primary mt-3" onClick={update}>
        Update
      </button>
    </>
  );
};

export default CurriculumSetup;
