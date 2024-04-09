import { Form, Image } from 'react-bootstrap';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import { useUploadImageMutation } from '../../slices/uploadImageApiSlice.js';

const BannerImage = ({ value, setValue }) => {
  const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setValue(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Form.Group controlId="bannerImage" className="mb-2">
      <Form.Label>Banner Image</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter image url"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Form.Control
        label="Choose File"
        onChange={uploadFileHandler}
        type="file"
      />
      {loadingImage && <Loader />}
      {value && (
        <Image
          src={value}
          alt="banner"
          rounded
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </Form.Group>
  );
};

export default BannerImage;
