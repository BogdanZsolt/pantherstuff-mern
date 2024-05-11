import { Container, Row, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes, FaEye, FaTrash, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetCommentsQuery,
  useDeleteCommentMutation,
} from '../../slices/postsApiSlice';

const CommentListScreen = () => {
  const { data: comments, isLoading, refetch, error } = useGetCommentsQuery();

  const [deleteComment, { isLoading: loadingDelete }] =
    useDeleteCommentMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteComment(id);
        toast.success('Comment deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Comments</h2>
      </Row>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>DESCRIPTION</th>
              <th>POST</th>
              <th>CHECK</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {comments.data.map((comment) => (
              <tr key={comment._id}>
                <td className="d-flex flex-column">
                  {comment?.user?.name}
                  <span style={{ fontSize: '0.75rem' }}>ID: {comment._id}</span>
                </td>
                <td>{comment.description}</td>
                <td>
                  <Link to={`/post/${comment?.post?._id}`}>
                    {comment?.post?.title}
                  </Link>
                </td>
                <td>
                  {comment.check ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/comment/${comment._id}`}>
                    <Button variant="primary" className="btn-sm mx-2">
                      <span className="d-flex align-items-center justify-content-center py">
                        <FaEye />
                      </span>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(comment._id)}
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      <FaTrash className="text-primary" />
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CommentListScreen;
