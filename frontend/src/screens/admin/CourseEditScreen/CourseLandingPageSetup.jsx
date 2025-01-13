import { Form } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import LangSelectInput from '../../../components/LangSelectInput';
import SelectCategory from '../../../components/SelectCategory.jsx';
import ImageList from '../../../components/ImageList';
import LangSelectEditor from '../../../components/LangSelectEditor';
// import { getDuration } from '../../../utils/converter.js';
import { Button } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useGetCourseCategoriesQuery } from '../../../slices/courseCategoriesApiSlice';

const CourseLandingPageSetup = ({
  submitHandler,
  title,
  setTitle,
  transTitleHu,
  setTransTitleHu,
  images,
  setImages,
  active,
  setActive,
  // courseCategories,
  // category,
  // setCategory,
  description,
  setDescription,
  transDescriptionHu,
  setTransDescriptionHu,
  beforePrice,
  setBeforePrice,
  transBeforePriceHu,
  setTransBeforePriceHu,
  currentPrice,
  setCurrentPrice,
  transCurrentPriceHu,
  setTransCurrentPriceHu,
  // duration,
  // setDuration,
}) => {
  const [category, setCategory] = useState('');

  const {
    data: courseCategories,
    isLoading: isLoadingCourseCat,
    isError: isErrorCourseCat,
    error: errorCourseCat,
    isSuccess: isSuccessCoursecat,
  } = useGetCourseCategoriesQuery();

  console.log(category);

  if (isSuccessCoursecat) {
    console.log(courseCategories);
  }

  // const handleDuration = (dur) => {
  //   const temp = dur.split(':');
  //   let time = temp[0] * 1 * 3600;
  //   time = time + temp[1] * 1 * 60;
  //   time = time + temp[2] * 1;
  //   console.log(typeof time);
  //   setDuration(time);
  // };

  return (
    <>
      {isLoadingCourseCat ? (
        <Loader />
      ) : (
        isErrorCourseCat &&
        toast.error(errorCourseCat?.data?.message || errorCourseCat?.error)
      )}
      <FormContainer>
        <Form onSubmit={submitHandler}>
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

          {courseCategories && (
            <Form.Group className="my-2">
              <Form.Label>Category</Form.Label>
              <SelectCategory
              // categories={null}
              // category={undefined}
              // setCategory={setCategory}
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

          {/* <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration time</Form.Label>
            <Form.Control
              type="time"
              name="duration"
              step="1"
              value={getDuration(duration)}
              onChange={(e) => handleDuration(e.target.value)}
            />
          </Form.Group> */}

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CourseLandingPageSetup;
