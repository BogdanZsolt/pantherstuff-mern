import { useState } from 'react';
import { Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
// import mainMenus from './menus.json';

const Menu = () => {
  const { t } = useTranslation(['menu']);
  const menus = [
    {
      id: 1,
      text: t('about'),
      link: '',
      mega: [
        {
          id: 1.1,
          text: t('ourHerStory'),
          link: '/herstory',
          image: '/images/ecoprint-01-200x200.webp',
        },
        {
          id: 1.2,
          text: t('mePetra'),
          link: '/mepetra',
          image: '/images/pepsz-yogaban-200x200.webp',
        },
        {
          id: 1.3,
          text: t('rawMaterials'),
          link: '/base_materials',
          image: '/images/ecoprint-04-200x200.webp',
        },
        {
          id: 1.4,
          text: t('valuesAndIntentions'),
          link: '/values',
          image: '/images/our_values-150x150.jpg',
        },
        {
          id: 1.5,
          text: t('faqs'),
          link: '/faqs',
          image: '/images/ecoprint-06-200x200.webp',
        },
      ],
    },
    {
      id: 2,
      text: t('shop'),
      link: '/shop',
    },
    {
      id: 3,
      text: t('knowledge'),
      link: '',
      mega: [
        {
          id: 3.1,
          text: t('membership'),
          link: '',
          image: '/images/pepsz-yogaban-200x200.webp',
        },
        {
          id: '3.2',
          text: t('onlineCourses'),
          link: '',
          image: '/images/ecoprint-04-200x200.webp',
        },
        {
          id: '3.3',
          text: t('retreatsAndWorkshop'),
          link: '',
          image: '/images/ecoprint-01-200x200.webp',
        },
        {
          id: '3.4',
          text: t('pantherStuffBlog'),
          link: '',
          image: '/images/ecoprint-05-200x200.webp',
        },
        {
          id: '3.5',
          text: t('library'),
          link: '',
          image: '/images/ecoprint-06-200x200.webp',
        },
      ],
    },
    {
      id: 4,
      text: t('blog'),
      link: '/blog',
    },
    {
      id: 5,
      text: t('contact'),
      link: '/contact',
    },
  ];

  // const { menus } = mainMenus;
  const [show, setShow] = useState(false);

  const mobileShowHandler = () => {
    if (window.innerWidth <= 991) {
      setShow(!show);
    } else {
      setShow(false);
    }
  };

  return (
    <Nav className="justify-content-start flex-grow-1 pe-3 left-menu" as="ul">
      {menus.map((item) =>
        item?.mega?.length > 0 ? (
          <div key={item.id} className="mega-parent">
            {item.link !== '' ? (
              <LinkContainer to={item.link}>
                <Nav.Link className="mega-dropdown" onClick={mobileShowHandler}>
                  {item.text}
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link className="mega-dropdown" onClick={mobileShowHandler}>
                {item.text}
              </Nav.Link>
            )}
            <div className={`mega-menu ${show ? 'show' : ''}`}>
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
                            <h5>{mitem.text}</h5>
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
            </div>
          </div>
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
