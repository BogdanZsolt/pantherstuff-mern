import NativeListener from 'react-native-listener';
import { Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import mainMenus from './menus.json';

const Menu = () => {
  const { menus } = mainMenus;

  return (
    <Nav className="justify-content-start flex-grow-1 pe-3 left-menu" as="ul">
      {menus.map((item) =>
        item?.mega?.length > 0 ? (
          <NativeListener stopClick key={item.id}>
            <NavDropdown
              title={item.text}
              renderMenuOnMount={true}
              className="mega-parent"
            >
              <Container>
                <ul className="mega-menu-wrapper">
                  {item.mega.map((mitem) => (
                    <li key={mitem.id} className="mega-item">
                      {mitem.link !== '' ? (
                        <LinkContainer to={mitem.link}>
                          <Link>
                            <div className="image">
                              <Image src={mitem.image} />
                            </div>
                            <h5>{mitem.text} link</h5>
                          </Link>
                        </LinkContainer>
                      ) : (
                        <>
                          <div className="image">
                            <Image src={mitem.image} />
                          </div>
                          <h5>{mitem.text}</h5>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </Container>
            </NavDropdown>
          </NativeListener>
        ) : item?.dropdown?.length > 0 ? (
          <NavDropdown key={item.id} title={item.text}>
            {item.dropdown.map((ditem) => (
              <li key={ditem.id}>
                {ditem.link !== '' ? (
                  <LinkContainer to={ditem.link}>
                    <NavDropdown.Item>{ditem.text}</NavDropdown.Item>
                  </LinkContainer>
                ) : (
                  <NavDropdown.Item className="rounded-2">
                    {ditem.text}
                  </NavDropdown.Item>
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
