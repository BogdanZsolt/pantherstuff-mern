import { RiCloseLine } from 'react-icons/ri';
import Loader from './Loader';
import Message from './Message';
import SizesCheckBox from './SizesCheckBox';
import { useGetProductSizesQuery } from '../slices/productSizesApiSlice';

const SelectSizes = ({ productSize, setProductSize }) => {
  const { data: allSizes, isLoading, error } = useGetProductSizesQuery();

  const selectHandler = (val) => {
    const activeData = document.getElementById(val).checked;
    if (activeData) {
      setProductSize((oldData) => [...oldData, val]);
    } else {
      setProductSize(productSize.filter((value) => value !== val));
    }
  };

  const sizeResetHandler = () => {
    if (productSize.length > 0) {
      productSize.map((item) => {
        document.getElementById(item).checked = false;
      });
      setProductSize([]);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="select-sizes-container">
          <div className="select-sizes">
            {allSizes.data.map((item) => (
              <SizesCheckBox
                key={item._id}
                size={item}
                handler={selectHandler}
                checked={productSize.includes(item._id)}
              />
            ))}
          </div>
          <div className="size-reset-container">
            <div
              className="size-reset-btn"
              title="sizes reset"
              onClick={sizeResetHandler}
            >
              <RiCloseLine className="size-reset" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectSizes;
