import Loader from './Loader';
import Message from './Message';
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';
import { Form } from 'react-bootstrap';

const SelectCategory = ({ category, setCategory }) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery({ sort: '-title' });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.Message}</Message>
      ) : (
        categories.data && (
          <Form.Group controlId="category" className="my-2">
            <Form.Select
              value={category}
              onChange={(e) =>
                e.target.value !== 'undefined'
                  ? setCategory(e.target.value)
                  : setCategory(undefined)
              }
            >
              <option value="undefined">Select Category</option>
              {categories.data.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )
      )}
    </div>
  );
};

export default SelectCategory;
