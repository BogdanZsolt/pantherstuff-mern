import { useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import MediaLibrary from '../../components/MediaLibrary.jsx';

const BannerImage = ({ value, setValue }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Form.Group controlId="bannerImage" className="mb-2">
        <Form.Label>Banner Image</Form.Label>
        <div className="d-flex">
          <Button onClick={() => setShow(true)} className="text-nowrap">
            Media Library
          </Button>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {value && (
          <Image
            src={value}
            alt="banner"
            rounded
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Form.Group>
      <MediaLibrary
        displayMedia={show}
        setDisplayMedia={setShow}
        setSelectedImg={setValue}
      />
    </>
  );
};

export default BannerImage;
