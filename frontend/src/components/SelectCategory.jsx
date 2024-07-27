import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loader from './Loader';
import Message from './Message';
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';

const SelectCategory = ({ category, setCategory, multi = false }) => {
  const { t, i18n } = useTranslation(['shop']);
  const animatedComponents = makeAnimated();
  const [categoryOptions, setCategoryOptions] = useState(null);
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
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      flexWrap: 'nowrap',
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
      backgroundColor: 'rgba(var(--bs-secondary-rgb), 0.15)',
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
      backgroundColor: 'var(--bs-secondary)',
    }),
    indicatorContainer: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isSelected ? 'var(--bs-primary)' : 'var(--bs-secondary)',
      backgroundColor: state.isSelected
        ? 'var(--bs-secondary)'
        : 'var(--bs-primary)',
      width: 'auto',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: 'max-content',
      minWidth: '100%',
      zIndex: 5,
      border: '1px solid var(--bs-secondary)',
      boxShadow: '0 10px 20px -10px var(--bs-secondary)',
    }),
    Placeholder: (baseStyles) => ({
      ...baseStyles,
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

  useEffect(() => {
    if (categories && category) {
      let cat = [];
      let defCat = [];
      categories.data.map((item) => {
        cat = [
          ...cat,
          {
            value: item._id,
            label:
              i18n.language === 'en'
                ? item.title
                : item.translations?.hu?.title || item.title,
          },
        ];
        if (category.includes(item._id)) {
          defCat = [
            ...defCat,
            {
              value: item._id,
              label:
                i18n.language === 'en'
                  ? item.title
                  : item.translations?.hu?.title || item.title,
            },
          ];
        }
      });
      setCategoryOptions(cat);
      setDefaultCategory(defCat);
    }
  }, [categories, category, i18n.language]);

  const selectCategoryHandler = (choice) => {
    if (multi) {
      let cat = [];
      choice.map((x) => {
        cat = [...cat, x.value];
      });
      setCategory(cat);
    } else {
      choice ? setCategory(undefined) : setCategory(choice.value);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.Message}</Message>
      ) : (
        categoryOptions && (
          <Form.Group controlId="category" className="my-2">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={defaultCategory}
              styles={selectStyles}
              isMulti={multi}
              isClearable
              isSearchable
              name="categories"
              options={categoryOptions}
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
