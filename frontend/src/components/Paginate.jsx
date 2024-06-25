import { Navigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  pageName = 'shop',
}) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword !== ''
                ? `/${pageName}/search/${keyword}/page/${x + 1}`
                : `/${pageName}/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : (
    <Navigate
      to={
        !isAdmin
          ? keyword !== ''
            ? `/${pageName}/search/${keyword}`
            : `/${pageName}/`
          : `/admin/productlist/`
      }
    />
  );
};

export default Paginate;
