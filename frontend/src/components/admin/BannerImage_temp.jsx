import { Form, Image } from 'react-bootstrap';

const BannerImage = ({ value, setValue }) => {
  return (
    <>
      <Form.Group controlId="bannerImage" className="mb-2">
        <Form.Label>Banner Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <Image
            src={value}
            alt="banner"
            rounded
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Form.Group>
    </>
  );
};

export default BannerImage;
