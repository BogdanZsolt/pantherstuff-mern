import { RiCloseLine } from 'react-icons/ri';
import Loader from './Loader';
import Message from './Message';
import SupplySizesCheckBox from './SupplySizesCheckBox';
import { useGetSupplySizesQuery } from '../slices/supplySizesApiSlice';

const SelectSupplySizes = ({ supplySize, setSupplySize }) => {
  const { data: allSizes, isLoading, error } = useGetSupplySizesQuery();

  const selectHandler = (val) => {
    const activeData = document.getElementById(val).checked;
    if (activeData) {
      setSupplySize((oldData) => [...oldData, val]);
    } else {
      setSupplySize(supplySize?.filter((value) => value !== val));
    }
  };

  const sizeResetHandler = () => {
    if (supplySize.length > 0) {
      supplySize.map((item) => {
        document.getElementById(item).checked = false;
      });
      setSupplySize([]);
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
              <SupplySizesCheckBox
                key={item._id}
                size={item}
                handler={selectHandler}
                checked={supplySize?.includes(item._id)}
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

export default SelectSupplySizes;
