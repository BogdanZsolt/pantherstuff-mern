import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loader from './Loader';
import Message from './Message';
import { useGetProductCollectionsQuery } from '../slices/productCollectionsApiSlice';

const SelectCollection = ({ collection, setCollection, multi = false }) => {
  const { i18n } = useTranslation(['shop']);
  const animatedComponents = makeAnimated();
  const [collectionOptions, setCollectionOptions] = useState(null);
  const [defaultCollection, setDefaultCollection] = useState([]);

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
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
  };

  const {
    data: collections,
    isLoading,
    error,
  } = useGetProductCollectionsQuery({ sort: 'title' });

  useEffect(() => {
    if (collections && collection) {
      let coll = [];
      let defColl = [];
      collections.data.map((item) => {
        coll = [
          ...coll,
          {
            value: item._id,
            label:
              i18n.language === 'en'
                ? item.title
                : item.translations?.hu?.title || item.title,
          },
        ];
        if (collection.includes(item._id)) {
          defColl = [
            ...defColl,
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
      setCollectionOptions(coll);
      setDefaultCollection(defColl);
    }
  }, [collections, collection, i18n.language]);

  const selectCollectionHandler = (choice) => {
    if (multi) {
      let coll = [];
      choice.map((x) => {
        coll = [...coll, x.value];
      });
      setCollection(coll);
    } else {
      !choice ? setCollection(undefined) : setCollection(choice.value);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.Message}</Message>
      ) : (
        collectionOptions && (
          <Form.Group controlId="category" className="my-2">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={defaultCollection}
              styles={selectStyles}
              isMulti={multi}
              isClearable
              isSearchable
              options={collectionOptions}
              onChange={selectCollectionHandler}
            />
          </Form.Group>
        )
      )}
    </div>
  );
};

export default SelectCollection;
