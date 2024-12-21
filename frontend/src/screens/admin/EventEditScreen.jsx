import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer.jsx';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import LangSelectInput from '../../components/LangSelectInput';
import LangSelectEditor from '../../components/LangSelectEditor.jsx';
import ImageList from '../../components/ImageList';
import { toast } from 'react-toastify';
import SelectCategory from '../../components/SelectCategory.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  useGetEventDetailsQuery,
  useUpdateEventMutation,
} from '../../slices/eventsApiSlice.js';
import { useGetEventCategoriesQuery } from '../../slices/eventCategoriesApiSlice.js';

const EventEditScreen = () => {
  const { id: eventId } = useParams();

  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [active, setActive] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durationUnit, setDurationUnit] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [address, setAddress] = useState(null);
  const [transTitleHu, setTransTitleHu] = useState('');
  const [transDescriptionHu, setTransDescriptionHu] = useState('');
  const [transBeforePriceHu, setTransBeforePriceHu] = useState(0);
  const [transCurrentPriceHu, setTransCurrentPriceHu] = useState(0);
  const [transAdvanceHu, setTransAdvanceHu] = useState(0);

  const {
    data: event,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetEventDetailsQuery(eventId);

  const {
    data: eventCategories,
    isLoading: isLoadingEventCat,
    isError: isErrorEventCat,
    error: errorEventCat,
  } = useGetEventCategoriesQuery();

  const [
    updateEvent,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateEventMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setImages(event.images);
      setDescription(event.description);
      setCategory(event?.category?._id || '');
      setBeforePrice(event.beforePrice);
      setCurrentPrice(event.currentPrice);
      setAdvance(event.advance);
      setMaxGroupSize(event.maxGroupsize);
      setDuration(event.duration);
      setDurationUnit(event.durationUnit);
      setStartDate(event.startDate);
      setAddress(event.location.address);
      setTransTitleHu(event.translations?.hu?.title || event.title);
      setTransDescriptionHu(
        event.translations?.hu?.description || event.description
      );
      setTransBeforePriceHu(event.translations?.hu?.beforePrice);
      setTransCurrentPriceHu(event.translations?.hu?.currentPrice);
      setTransAdvanceHu(event.translations?.hu?.advance);
    }
  }, [event]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        eventId,
        title,
        images,
        description,
        category,
        beforePrice,
        currentPrice,
        advance,
        maxGroupsize: maxGroupSize,
        duration,
        durationUnit,
        startDate,
        location: {
          address: address,
        },
        translations: {
          hu: {
            title: transTitleHu,
            description: transDescriptionHu,
            beforePrice: transBeforePriceHu,
            currentPrice: transCurrentPriceHu,
            advance: transAdvanceHu,
          },
        },
      }).unwrap();
      toast.success('Event updated');
      refetch();
      navigate('/admin/eventlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
        <Container className="mt-5 mb-5">
          <Link to="/admin/eventlist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit event</h2>
          </Row>
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

              {isLoadingEventCat ? (
                <Loader />
              ) : isErrorEventCat ? (
                toast.error(
                  errorEventCat?.data?.message || errorEventCat?.error
                )
              ) : (
                <Form.Group controlId="category" className="my-2">
                  <Form.Label>Category</Form.Label>
                  <SelectCategory
                    categories={eventCategories}
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

              <div className="row">
                <div className="col-md-6">
                  <LangSelectInput
                    label="Avantage"
                    type="number"
                    placeholder="Avantage"
                    placeholder_hu="Előleg"
                    defLang={advance}
                    setDefLang={setAdvance}
                    secLang={transAdvanceHu}
                    setSecLang={setTransAdvanceHu}
                  />
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="maxGroupSize" className="my-2">
                    <Form.Label>Max group size</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Maximum group size"
                      value={maxGroupSize}
                      onChange={(e) => setMaxGroupSize(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-6">
                  <Form.Group controlId="startDate" className="date-panther">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy/MM/dd hh:mm aa"
                      minDate={new Date()}
                      showIcon
                      showTimeInput
                      timeInputLabel="Time"
                      isClearable
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      scrollableMonthYearDropdown
                      calendarStartDay={1}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <InputGroup controlId="duration">
                      <Form.Control
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <Form.Select
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                      >
                        <option value="min">Minute</option>
                        <option value="hour">Hour</option>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default EventEditScreen;
