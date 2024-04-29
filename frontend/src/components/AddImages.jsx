import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddImages = ({
  addImgShow,
  setAddImgShow,
  mediaShow,
  imageUrl,
  setImageUrl,
}) => {
  const [url, setUrl] = useState(imageUrl);
  const handleclose = () => setAddImgShow(false);
  const handleMediaShow = () => {
    mediaShow(true);
    setAddImgShow(false);
  };
  const handleMediaUrl = () => {
    setImageUrl(url);
    setAddImgShow(false);
  };

  return (
    <Modal show={addImgShow} onHide={handleclose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="bannerImage" className="mb-2">
          <Form.Label>Images</Form.Label>
          <div>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-3"
            />
            <Button className="text-nowrap" onClick={handleMediaShow}>
              Media Library
            </Button>
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleclose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleMediaUrl}>
          Add url
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddImages;
