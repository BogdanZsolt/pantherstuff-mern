import { useMemo, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { RiDraggable } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader.jsx';
import SectionContainer from './SectionContainer.jsx';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import {
  useAddNewLessonMutation,
  useRemoveLessonMutation,
  useUpdateLessonMutation,
  // useLessonArrayMoveMutation,
} from '../../../slices/coursesApiSlice.js';
import LessonCard from './LessonCard.jsx';

const CurriculumSetup = ({
  sections,
  setSections,
  lessons,
  setLessons,
  update,
  courseId,
  courseRefetch,
  sortListUpdateHandler,
  isLoadingSortChange,
  isErrorSortChange,
  errorSortChange,
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const [removeLesson, { isLoadingRemove, isErrorRemove, errorRemove }] =
    useRemoveLessonMutation();

  const [updateLesson, { isLoadingUpdate, isErrorUpdate, errorUpdate }] =
    useUpdateLessonMutation();

  const sectionsId = useMemo(() => {
    const sectsId = sections?.map((section) => section?._id);
    return sectsId;
  }, [sections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const addNewHandler = async (lessonType, section) => {
    if (
      window.confirm(
        `Are you sure you want to create a new ${lessonType} lesson?`
      )
    ) {
      await sortListUpdateHandler(false);
      courseRefetch();
      try {
        await addNewLesson({
          courseId,
          lessonType,
          section: lessonType !== 'Section' ? section : null,
        }).unwrap();
        toast.success(`${lessonType} lesson created`);
        courseRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteLesson = async ({ lessonId }) => {
    console.log(lessonId);

    if (
      window.confirm(`Are you sure you want to remove the ${lessonId} lesson?`)
    ) {
      try {
        await removeLesson({ courseId, lessonId }).unwrap();
        toast.success(`${lessonId} lesson removed`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const removeHandler = async ({ lessonId }) => {
    await sortListUpdateHandler(false);
    courseRefetch();
    await deleteLesson({ lessonId });
    courseRefetch();
  };

  const onDragStart = (event) => {
    if (event.active.data.current?.type === 'Section') {
      setActiveSection(event.active.data.current.item);
      return;
    }

    if (event.active.data.current?.type === 'Lesson') {
      setActiveLesson(event.active.data.current.lesson);
      return;
    }
  };

  const onDragEnd = (event) => {
    setActiveSection(null);
    setActiveLesson(null);

    const { active, over } = event;
    if (!over) return;
    if (active.data.current.type !== 'Section') return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setSections((sections) => {
      const activeSectionIndex = sections.findIndex(
        (sec) => sec._id === activeId
      );
      const overSectionIndex = sections.findIndex((sec) => sec._id === overId);

      return arrayMove(sections, activeSectionIndex, overSectionIndex);
    });
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveALesson = active.data.current?.type === 'Lesson';
    const isOverALesson = over.data.current?.type === 'Lesson';

    if (!isActiveALesson) return;

    // I'm dropping a lesson over another task
    if (isActiveALesson && isOverALesson) {
      setLessons((lessons) => {
        const activeIndex = lessons.findIndex((l) => l._id === activeId);
        const overIndex = lessons.findIndex((t) => t._id === overId);

        lessons[activeIndex].section = lessons[overIndex].section;

        return arrayMove(lessons, activeIndex, overIndex);
      });
    }

    const isOverASection = over.data.current?.type === 'Section';

    // I'm dropping a lesson over a column
    if (isActiveALesson && isOverASection) {
      setLessons((lessons) => {
        const activeIndex = lessons.findIndex((l) => l._id === activeId);

        lessons[activeIndex].section = overId;

        return arrayMove(lessons, activeIndex, activeIndex);
      });
    }
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
      {isLoadingSortChange ? (
        <Loader />
      ) : (
        isErrorSortChange &&
        toast.error(errorSortChange.data?.message || errorSortChange.error)
      )}
      <Row className="mb-3">
        <h2 className="text-center fw-bold">Edit Curriculum</h2>
      </Row>
      <div className="mb-3 d-flex justify-content-end align-items-center">
        <Button
          variant="primary"
          className="d-flex align-items-center"
          style={{ gap: '0.25rem' }}
          onClick={() => addNewHandler('Section')}
        >
          <AiOutlinePlusCircle />
          Add new section
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <Row className="w-100">
          <SortableContext items={sectionsId}>
            {sections &&
              sections.map((section) => (
                <SectionContainer
                  key={section?._id}
                  item={section}
                  lessons={lessons.filter(
                    (lesson) => lesson.section === section?._id
                  )}
                  courseId={courseId}
                  courseRefetch={courseRefetch}
                  addNewHandler={addNewHandler}
                  removeHandler={removeHandler}
                  updateLesson={updateLesson}
                  sortListUpdateHandler={sortListUpdateHandler}
                />
              ))}
          </SortableContext>
        </Row>
        {createPortal(
          <DragOverlay>
            {activeSection && (
              <SectionContainer
                item={activeSection}
                lessons={lessons.filter(
                  (lesson) => lesson.section === activeSection._id
                )}
              />
            )}
            {activeLesson && <LessonCard lesson={activeLesson} />}
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
