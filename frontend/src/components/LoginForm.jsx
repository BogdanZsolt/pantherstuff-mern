import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const LoginForm = ({ open }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginForm;
