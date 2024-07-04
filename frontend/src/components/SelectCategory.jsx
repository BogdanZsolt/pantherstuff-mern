import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Form } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';

const SelectCategory = ({ category, setCategory, multi = false }) => {
  const { t, i18n } = useTranslation(['shop']);
  const animatedComponents = makeAnimated();
  const [defaultCategory, setDefaultCategory] = useState(undefined);

  const selectStyles = {
    control: (baseStyle, state) => ({
      ...baseStyle,
      backgroundColor: 'var(--bs-primary)',
      color: 'var(--bs-secondary)',
      minHeight: 'unset',
      maxHeight: '36px',
      borderColor: state.isFocused
        ? 'var(--bs-secondary)'
        : 'var(--bs-secondary)',
      '&:hover': {
        border: state.isFocused
          ? '2px solid var(--bs-secondary)'
          : '1px solid var(--bs-secondary)',
      },
    }),
    valueContainer: (baseStyle) => ({
      ...baseStyle,
      flexWrap: 'nowrap',
    }),
    multiValue: (baseStyle) => ({
      ...baseStyle,
      color: 'var(--bs-secondary)',
      backgroundColor: 'rgba(var(--bs-secondary-rgb), 0.15)',
    }),
    indicatorSeparator: (baseStyle) => ({
      ...baseStyle,
      color: 'var(--bs-secondary)',
      backgroundColor: 'var(--bs-secondary)',
    }),
    indicatorContainer: (baseStyle) => ({
      ...baseStyle,
      color: 'var(--bs-secondary)',
    }),
    option: (baseStyle, state) => ({
      ...baseStyle,
      color: state.isSelected ? 'var(--bs-primary)' : 'var(--bs-secondary)',
      backgroundColor: state.isSelected
        ? 'var(--bs-secondary)'
        : 'var(--bs-primary)',
      width: 'auto',
    }),
    menu: (baseStyle) => ({
      ...baseStyle,
      width: 'max-content',
      minWidth: '100%',
      zIndex: 5,
      border: '1px solid var(--bs-secondary)',
      boxShadow: '0 10px 20px -10px var(--bs-secondary)',
    }),
    Placeholder: (baseStyle) => ({
      ...baseStyle,
      fontSize: '1.15rem',
      color: 'var(--bs-secondary)',
      fontWeight: '500',
    }),
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery({ sort: 'title' });

  const getOptions = () => {
    let options = [];
    if (!categories.data) return;

    categories.data.map((cat) => {
      options = [
        ...options,
        {
          value: cat._id,
          label:
            i18n.language === 'en'
              ? cat.title
              : cat.translations?.hu?.title || cat.title,
        },
      ];
    });
    return options;
  };

  useEffect(() => {
    if (categories) {
      // if (category === '') {
      //   setDefaultCategory(t('select'));
      // }
      if (category === '') {
        setDefaultCategory('');
      }
      categories.data.map((item) => {
        if (item._id === category) {
          setDefaultCategory({
            value: item._id,
            label:
              i18n.language === 'en'
                ? item.title
                : item.translations?.hu?.title || item.title,
          });
        }
      });
    }
  }, [categories, category, i18n.language]);

  const selectCategoryHandler = (choice) => {
    if (multi) {
      if (choice.length === 0) {
        setCategory(undefined);
      } else {
        let cat = [];
        choice.map((x) => {
          cat = [...cat, x.value];
        });
        setCategory(cat);
      }
    } else {
      !choice ? setCategory(undefined) : setCategory(choice.value);
    }
  };

  console.log(defaultCategory);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.Message}</Message>
      ) : (
        categories.data &&
        defaultCategory !== undefined && (
          <Form.Group controlId="category" className="my-2">
            <Select
              name="categories"
              options={getOptions()}
              defaultValue={defaultCategory}
              components={animatedComponents}
              styles={selectStyles}
              isClearable
              isSearchable
              isMulti={multi}
              onChange={selectCategoryHandler}
              placeholder={t('select')}
            />
          </Form.Group>
        )
      )}
    </div>
  );
};

export default SelectCategory;
