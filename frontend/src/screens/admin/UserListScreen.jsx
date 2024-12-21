import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container, Row } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';
import { getTimeStamp, toLocalDate } from '../../utils/converter';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Users</h2>
      </Row>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="d-none d-lg-block">ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>PRIME MEMBER</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="d-none d-lg-table-cell">{user._id}</td>
                  <td className="">
                    <div>{user.name}</div>
                    <div className="d-table-cell d-lg-none">{user._id}</div>
                  </td>
                  <td>
                    <a href={`mailto: ${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td>
                    {user.premiumExpiresAt &&
                    getTimeStamp(user.premiumExpiresAt) >
                      getTimeStamp(Date.now()) ? (
                      toLocalDate('en', user?.premiumExpiresAt, 'short')
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="primary" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={users.pages}
            page={users.page}
            isAdmin={true}
            pageName="userlist"
          />
        </>
      )}
    </Container>
  );
};

export default UserListScreen;
