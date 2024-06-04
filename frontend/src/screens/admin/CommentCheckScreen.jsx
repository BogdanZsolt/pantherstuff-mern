import { useState, useEffect } from 'react';
import { Container, Row, Form, Button, ListGroup } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetCommentDetailsQuery,
  useAdminUpdateCommentMutation,
} from '../../slices/postsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

const CommentCheckScreen = () => {
  const { id: commentId } = useParams();

  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const {
    data: comment,
    refetch,
    isLoading,
    error,
  } = useGetCommentDetailsQuery(commentId);

  const [AdminUpdateComment, { isLoading: loadingUpdate }] =
    useAdminUpdateCommentMutation();

  useEffect(() => {
    if (comment) {
      setCheck(comment.check);
    }
  }, [comment]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await AdminUpdateComment({
        commentId,
        check,
      }).unwrap();
      toast.success('Comment updated');
      refetch();
      navigate('/admin/commentlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mb-5">
      <Link to="/admin/commentlist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Setup Comment</h2>
      </Row>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.Message}</Message>
        ) : (
          <>
            <ListGroup>
              <ListGroup.Item className="d-flex justify-content-between">
                <div>
                  <span className="fw-bold">User name:</span>{' '}
                  {comment.user.name}
                </div>
                <LinkContainer to={`/admin/user/${comment.user._id}/edit`}>
                  <Button variant="primary" className="btn-sm mx-2">
                    <span className="d-flex align-items-center justify-content-center">
                      <FaEye />
                    </span>
                  </Button>
                </LinkContainer>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Post Title:</span>{' '}
                {comment?.post?.title}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Comment:</span> {comment.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Replies:</span>
                {comment?.replies?.map((replay) => (
                  <div key={replay._id}>
                    <div>{replay.user.name}</div>
                    <p>{replay.description}</p>
                  </div>
                ))}
              </ListGroup.Item>
            </ListGroup>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="check" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Check"
                  checked={check}
                  onChange={(e) => setCheck(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default CommentCheckScreen;
