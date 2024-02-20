import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import mainMenus from './menus.json';

const Menu = () => {
  const { menus } = mainMenus;

  return (
    <Nav className="justify-content-start flex-grow-1 pe-3 left-menu" as="ul">
      {menus.map((item) =>
        item?.dropdown?.length > 0 ? (
          <NavDropdown key={item.id} title={item.text}>
            {item.dropdown.map((ditem) => (
              <li key={ditem.id}>
                {ditem.link === '' ? (
                  <NavDropdown.Item>{ditem.text}</NavDropdown.Item>
                ) : (
                  <LinkContainer to={ditem.link}>
                    <NavDropdown.Item>{ditem.text}</NavDropdown.Item>
                  </LinkContainer>
                )}
              </li>
            ))}
          </NavDropdown>
        ) : (
          <li key={item.id}>
            {item.link === '' ? (
              <Nav.Link>{item.text}</Nav.Link>
            ) : (
              <LinkContainer to={item.link}>
                <Nav.Link>{item.text}</Nav.Link>
              </LinkContainer>
            )}
          </li>
        )
      )}
    </Nav>
  );
};

export default Menu;
