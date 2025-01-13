import { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CurriculumSetup from './CurriculumSetup';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import FormContainer from '../../../components/FormContainer';
import LangSelectInput from '../../../components/LangSelectInput';
import ImageList from '../../../components/ImageList';
import SelectCategory from '../../../components/SelectCategory';
import LangSelectEditor from '../../../components/LangSelectEditor';
import { getDuration } from '../../../utils/converter';
import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from '../../../slices/coursesApiSlice';
import { useGetCourseCategoriesQuery } from '../../../slices/courseCategoriesApiSlice';

const CourseEditScreen = () => {
  const { id: courseId } = useParams();
  const [key, setKey] = useState('landing');

  const [title, setTitle] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [images, setImages] = useState('');
  const [active, setActive] = useState('');
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [transDescriptionHu, setTransDescriptionHu] = useState('');
  const [beforePrice, setBeforePrice] = useState(0);
  const [transBeforePriceHu, setTransBeforePriceHu] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [transCurrentPriceHu, setTransCurrentPriceHu] = useState(0);
  const [duration, setDuration] = useState(0);
  const [curriculum, setCurriculum] = useState([]);

  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseDetailsQuery(courseId);

  const {
    data: courseCategories,
    isLoading: isLoadingCourseCat,
    isError: isErrorCourseCat,
    error: errorCourseCat,
  } = useGetCourseCategoriesQuery();

  const [
    updateCourse,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateCourseMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setImages(course.images);
      setCategory(course.category?._id || '');
      setDescription(course.description);
      setBeforePrice(course.beforePrice);
      setCurrentPrice(course.currentPrice);
      setDuration(course.duration);
      setTransTitleHu(course.translations?.hu?.title || course.title);
      setTransDescriptionHu(
        course.translations?.hu?.description || course.description
      );
      setTransBeforePriceHu(course.translations?.hu?.beforePrice);
      setTransCurrentPriceHu(course.translations?.hu?.currentPrice);
      setCurriculum(course.curriculum);
    }
  }, [course]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCourse({
        courseId,
        title,
        images,
        category: category === '' ? undefined : category,
        description,
        beforePrice,
        currentPrice,
        duration,
        curriculum,
        translations: {
          hu: {
            title: transTitleHu,
            description: transDescriptionHu,
            beforePrice: transBeforePriceHu,
            currentPrice: transCurrentPriceHu,
          },
        },
      }).unwrap();
      toast.success('Course updated');
      refetch();
      navigate('/admin/courselist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDuration = (dur) => {
    const temp = dur.split(':');
    let time = temp[0] * 1 * 3600;
    time = time + temp[1] * 1 * 60;
    time = time + temp[2] * 1;
    setDuration(time);
  };

  // if (course) {
  //   console.log(curriculum);
  // }

  return (
    <>
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate &&
        toast.error(errorUpdate?.data?.message || errorUpdate.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <Container className="my-3">
          <Link to="/admin/courselist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Tabs
            id="course-edit-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 course-edit-tab scrollto"
          >
            <Tab eventKey="landing" title="Course parameters setting">
              <Row>
                <h2 className="text-center fw-bold">Edit course</h2>
              </Row>
              <FormContainer>
                <Form onSubmit={submitHandler} className="mt-3">
                  <LangSelectInput
                    label="Title"
                    defLang={title}
                    setDefLang={setTitle}
                    secLang={transTitleHu}
                    setSecLang={setTransTitleHu}
                  />

                  <ImageList
                    images={images}
                    setImages={setImages}
                    activeImage={active}
                    setActiveImage={setActive}
                  />

                  {isLoadingCourseCat ? (
                    <Loader />
                  ) : isErrorCourseCat ? (
                    toast.error(
                      errorCourseCat?.data?.message || errorCourseCat?.error
                    )
                  ) : (
                    <Form.Group controlId="category" className="my-2">
                      <Form.Label>Category</Form.Label>
                      <SelectCategory
                        categories={courseCategories}
                        category={category}
                        setCategory={setCategory}
                      />
                    </Form.Group>
                  )}

                  <LangSelectEditor
                    label="Description"
                    placeholder="Enter description"
                    placeholder_hu="Add meg a leírást"
                    defLang={description}
                    setDefLang={setDescription}
                    secLang={transDescriptionHu}
                    setSecLang={setTransDescriptionHu}
                    className="mt-3"
                  />

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <LangSelectInput
                        label="Before Price"
                        type="number"
                        placeholder="Before Price"
                        placeholder_hu="Előző ár"
                        defLang={beforePrice}
                        setDefLang={setBeforePrice}
                        secLang={transBeforePriceHu}
                        setSecLang={setTransBeforePriceHu}
                      />
                    </div>

                    <div className="col-md-6">
                      <LangSelectInput
                        label="Current Price"
                        type="number"
                        placeholder="Current Price"
                        placeholder_hu="Aktuális ár"
                        defLang={currentPrice}
                        setDefLang={setCurrentPrice}
                        secLang={transCurrentPriceHu}
                        setSecLang={setTransCurrentPriceHu}
                      />
                    </div>
                  </div>

                  <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration time</Form.Label>
                    <Form.Control
                      type="time"
                      name="duration"
                      step="1"
                      value={getDuration(duration)}
                      onChange={(e) => handleDuration(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="my-2">
                    Update
                  </Button>
                </Form>
              </FormContainer>
            </Tab>
            <Tab eventKey="curriculum" title="Curriculum setup">
              <CurriculumSetup
                curriculum={curriculum}
                setCurriculum={setCurriculum}
                update={submitHandler}
                courseId={courseId}
                courseRefetch={refetch}
              />
            </Tab>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default CourseEditScreen;
