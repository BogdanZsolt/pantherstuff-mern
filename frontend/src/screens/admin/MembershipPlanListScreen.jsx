import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useDeletePlanMutation,
} from '../../slices/plansApiSlice.js';

const MembershipPlanListScreen = () => {
  const { data: plans, isLoading, refetch, error } = useGetPlansQuery();
  const [createPlan, { isLoading: loadingCreate }] = useCreatePlanMutation();
  const [deletePlan, { isLoading: loadingDelete }] = useDeletePlanMutation();

  const createHandler = async () => {
    if (window.confirm('Are you sure you want to create a new plan?')) {
      try {
        await createPlan();
        toast.success('Category created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deletePlan(id);
        toast.success('Category deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center">
          <h2 className="fs-1 fw-semibold">Member Plans</h2>
        </Row>
        <Row className="align-items-center">
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createHandler}>
              <div className="d-flex align-items-center gap-1">
                <FaEdit /> Create Plan
              </div>
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.Message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {plans.data.map((plan) => (
                <tr key={plan._id}>
                  <td className="text-start" title={`id: ${plan._id}`}>
                    <p className="my-0 py-0">
                      <b>en: </b>
                      {plan.name}
                    </p>
                    <p className="my-0 py-0">
                      <b>hu: </b>
                      {plan.translations?.hu?.name}
                    </p>
                  </td>
                  <td>
                    <p className="my-0 py-0">
                      <b>en: </b>
                      {plan.currentPrice}
                    </p>
                    <p className="my-0 py-0">
                      <b>hu: </b>
                      {plan.translations?.hu?.currentPrice}
                    </p>
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/membershipplan/${plan._id}/edit`}
                    >
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(plan._id)}
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
    </>
  );
};

export default MembershipPlanListScreen;
