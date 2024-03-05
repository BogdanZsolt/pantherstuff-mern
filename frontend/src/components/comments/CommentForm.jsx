import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommnentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = '',
}) => {
  const [comment, setComment] = useState(initialText);

  const submitHandler = async (e) => {
    e.preventDefault();
    formSubmitHandler(comment);
    setComment('');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="comment" className="my-2">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          row="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your comment here..."
          className="mb-2 bg-transparent"
        ></Form.Control>
        <div className="d-flex align-items-center gap-2">
          {formCancelHandler && (
            <Button onClick={formCancelHandler} type="button" variant="primary">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary">
            {btnLabel}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default CommnentForm;
