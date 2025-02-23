import { useEffect, useMemo, useState } from 'react';
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
  useCurriculumLessonsSortChangeMutation,
  // useLessonArrayMoveMutation,
} from '../../../slices/coursesApiSlice.js';
import LessonCard from './LessonCard.jsx';

const CurriculumSetup = ({ curriculum, update, courseId, courseRefetch }) => {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);

  const sections_temp = useMemo(() => {
    return curriculum.map((item) => item.lesson);
  }, [curriculum]);

  useEffect(() => {
    setSections(sections_temp);
  }, [sections_temp]);

  const sectionsId = useMemo(() => {
    return sections_temp.map((section) => section._id);
  }, [sections_temp]);

  useEffect(() => {
    setLessons((lessons) => {
      const sections = curriculum.map((item) => item.lesson);
      lessons = [];
      sections.map((item) => {
        let temp = item.lessons.map((itm) => {
          const tmp = {};
          tmp.createdAt = itm.lesson.createdAt;
          tmp.id = itm.lesson.id;
          tmp.lessonType = itm.lesson.lessonType;
          tmp.section = itm.lesson.section;
          tmp.title = itm.lesson.title;
          tmp.updatedAt = itm.lesson.updatedAt;
          tmp.user = itm.lesson.user;
          tmp._id = itm.lesson._id;
          tmp.translations = itm.lesson.translations;

          if (itm.lesson.lessonType === 'Video') {
            tmp.duration = itm.lesson.duration;
            tmp.videoUrl = itm.lesson.videoUrl;
          } else if (itm.lesson.lessonType === 'Textual') {
            tmp.text = itm.lesson.text;
          }

          return tmp;
        });
        lessons = [...lessons, ...temp];
      });
      return lessons;
    });
  }, [curriculum]);

  const [activeSection, setActiveSection] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const [removeLesson, { isLoadingRemove, isErrorRemove, errorRemove }] =
    useRemoveLessonMutation();

  const [updateLesson, { isLoadingUpdate, isErrorUpdate, errorUpdate }] =
    useUpdateLessonMutation();

  const [
    curriculumLessonsSortChange,
    { isLoadingSortChange, isErrorSortChange, errorSortChange },
  ] = useCurriculumLessonsSortChangeMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const sortListUpdateHandler = async () => {
    try {
      await curriculumLessonsSortChange({
        courseId,
        sections: sections,
        lessons: lessons,
      }).unwrap();
      toast.success('course updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addNewHandler = async (lessonType, section) => {
    if (
      window.confirm(
        `Are you sure you want to create a new ${lessonType} lesson?`
      )
    ) {
      try {
        await sortListUpdateHandler();
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

  const removeHandler = async ({ lessonId }) => {
    if (
      window.confirm(`Are you sure you want to remove the ${lessonId} lesson?`)
    ) {
      try {
        await removeLesson({ courseId, lessonId }).unwrap();
        toast.success(`${lessonId} lesson removed`);
        courseRefetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // const arrayMoveHandler = async ({
  //   fromLessonId,
  //   toSectionId = null,
  //   toLessonId,
  // }) => {
  //   try {
  //     await lessonArrayMove({
  //       courseId,
  //       fromLessonId,
  //       toSectionId,
  //       toLessonId,
  //     });
  //     courseRefetch();
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

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

  console.log('sections: ', sections);
  console.log('lessons: ', lessons);

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
      {/* {isLoadingMove ? (
        <Loader />
      ) : (
        isErrorMove && toast.error(errorMove.data?.message || errorMove.error)
      )} */}
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
                  key={section._id}
                  item={section}
                  lessons={lessons.filter(
                    (lesson) => lesson.section === section._id
                  )}
                  courseId={courseId}
                  courseRefetch={courseRefetch}
                  addNewHandler={addNewHandler}
                  removeHandler={removeHandler}
                  updateLesson={updateLesson}
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
