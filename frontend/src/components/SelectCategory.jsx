import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loader from './Loader';
import Message from './Message';
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';
import { Form } from 'react-bootstrap';

const SelectCategory = ({ category, setCategory }) => {
  const animatedComponents = makeAnimated();

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'var(--bs-primary)',
      color: 'var(--bs-secondary)',
      borderColor: 'var(--bs-secondary)',
      minHeight: 'unset',
      maxHeight: '36px',
    }),
    valueContainer: (base) => ({
      ...base,
      flexWrap: 'nowrap',
    }),
    multiValue: (base) => ({
      ...base,
      color: 'var(--bs-secondary)',
      backgroundColor: 'rgba(var(--bs-secondary-rgb), 0.15)',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      color: 'var(--bs-secondary)',
      backgroundColor: 'var(--bs-secondary)',
    }),
    indicatorContainer: (base) => ({
      ...base,
      color: 'var(--bs-secondary)',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'var(--bs-primary)' : 'var(--bs-secondary)',
      backgroundColor: state.isSelected
        ? 'var(--bs-secondary)'
        : 'var(--bs-primary)',
      width: 'auto',
    }),
    menu: (styles) => ({
      ...styles,
      width: 'max-content',
      minWidth: '100%',
    }),
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery({ sort: '-title' });

  const getOptions = () => {
    let options = [];
    if (!categories.data) return;

    categories.data.map((cat) => {
      options = [...options, { value: cat._id, label: cat.title }];
    });
    return options;
  };

  const selectCategoryHandler = (choice) => {
    if (choice.length === 0) {
      setCategory(undefined);
    } else {
      let cat = [];
      choice.map((x) => {
        cat = [...cat, x.value];
      });
      setCategory(cat);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.Message}</Message>
      ) : (
        categories.data && (
          <Form.Group controlId="category" className="my-2">
            <Select
              name="categories"
              options={getOptions()}
              defaultValue={category}
              components={animatedComponents}
              styles={selectStyles}
              isClearable
              isMulti
              onChange={selectCategoryHandler}
            />
          </Form.Group>
        )
      )}
    </div>
  );
};

export default SelectCategory;
