// https://youtu.be/dltHi9GWMIo?si=5dEcZZagXPhZKsra

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AdminScreen,
  AuthorScreen,
  BaseMaterialsScreen,
  BlogScreen,
  CartScreen,
  CategoryPostScreen,
  CommentCheckScreen,
  CommentListScreen,
  ContactScreen,
  FaqsScreen,
  HerStory,
  HomeScreen,
  LoginScreen,
  MainScreen,
  MePetraScreen,
  OrderListScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  PostCatEditScreen,
  PostCategoryListScreen,
  PostEditScreen,
  PostListScreen,
  PostScreen,
  ProductCatEditScreen,
  ProductCategoryListScreen,
  ProductCollectionEditScreen,
  ProductCollectionListScreen,
  ProductEditScreen,
  ProductListScreen,
  ProductScreen,
  ProductSizeEditScreen,
  ProductSizeListScreen,
  ProfileScreen,
  ProtectRoute,
  RegisterScreen,
  ShippingScreen,
  ShopScreen,
  SubscriberListScreen,
  UserEditScreen,
  UserListScreen,
  ValuesScreen,
  WishListScreen,
} from './Pages';
import Root from './components/Root';

const App = () => {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <MainScreen />,
          children: [
            {
              path: '',
              element: <HomeScreen />,
            },
            {
              path: 'herstory',
              element: <HerStory />,
            },
            {
              path: 'mepetra',
              element: <MePetraScreen />,
            },
            {
              path: 'base_materials',
              element: <BaseMaterialsScreen />,
            },
            {
              path: 'values',
              element: <ValuesScreen />,
            },
            {
              path: 'faqs',
              element: <FaqsScreen />,
            },
            {
              path: 'shop',
              element: <ShopScreen />,
              children: [
                {
                  path: 'search/:keyword',
                  element: <ShopScreen />,
                },
                {
                  path: 'page/:pageNumber',
                  element: <ShopScreen />,
                },
                {
                  path: 'search/:keyword/page/:pageNumber',
                  element: <ShopScreen />,
                },
              ],
            },
            {
              path: 'product/:id',
              element: <ProductScreen />,
            },
            {
              path: 'blog',
              element: <BlogScreen />,
              children: [
                {
                  path: 'search/:keyword',
                  element: <BlogScreen />,
                },
                {
                  path: 'page/:pageNumber',
                  element: <BlogScreen />,
                },
                {
                  path: 'search/:keyword/page/:pageNumber',
                  element: <BlogScreen />,
                },
              ],
            },
            {
              path: 'post/:id',
              element: <PostScreen />,
            },
            {
              path: 'author/:id',
              element: <AuthorScreen />,
            },
            {
              path: 'category/:id',
              element: <CategoryPostScreen />,
            },
            {
              path: 'contact',
              element: <ContactScreen />,
            },
            {
              path: 'login',
              element: <LoginScreen />,
            },
            {
              path: 'register',
              element: <RegisterScreen />,
            },
            {
              path: '',
              element: <ProtectRoute />,
              children: [
                {
                  path: 'cart',
                  element: <CartScreen />,
                },
                {
                  path: 'shipping',
                  element: <ShippingScreen />,
                },
                {
                  path: 'payment',
                  element: <PaymentScreen />,
                },
                {
                  path: 'placeorder',
                  element: <PlaceOrderScreen />,
                },
                {
                  path: 'order/:id',
                  element: <OrderScreen />,
                },
                {
                  path: 'wishlist',
                  element: <WishListScreen />,
                },
                {
                  path: 'profile',
                  element: <ProfileScreen />,
                },
              ],
            },
          ],
        },
        {
          path: 'admin',
          element: <AdminScreen />,
          children: [
            {
              path: '',
              element: <ProductListScreen />,
            },
            {
              path: 'productlist',
              element: <ProductListScreen />,
            },
            {
              path: 'productlist/:pageNumber',
              element: <ProductListScreen />,
            },
            {
              path: 'product/:id/edit',
              element: <ProductEditScreen />,
            },
            {
              path: 'productcategorylist',
              element: <ProductCategoryListScreen />,
            },
            {
              path: 'productcategory/:id/edit',
              element: <ProductCatEditScreen />,
            },
            {
              path: 'productcollectionlist',
              element: <ProductCollectionListScreen />,
            },
            {
              path: 'productcollection/:id/edit',
              element: <ProductCollectionEditScreen />,
            },
            {
              path: 'productsizelist',
              element: <ProductSizeListScreen />,
            },
            {
              path: 'productsize/:id/edit',
              element: <ProductSizeEditScreen />,
            },
            {
              path: 'postlist',
              element: <PostListScreen />,
            },
            {
              path: 'post/:id/edit',
              element: <PostEditScreen />,
            },
            {
              path: 'postcategorylist',
              element: <PostCategoryListScreen />,
            },
            {
              path: 'postcategory/:id/edit',
              element: <PostCatEditScreen />,
            },
            {
              path: 'commentlist',
              element: <CommentListScreen />,
            },
            {
              path: 'comment/:id',
              element: <CommentCheckScreen />,
            },
            {
              path: 'userlist',
              element: <UserListScreen />,
            },
            {
              path: 'user/:id/edit',
              element: <UserEditScreen />,
            },
            {
              path: 'orderlist',
              element: <OrderListScreen />,
            },
            {
              path: 'subscriberlist',
              element: <SubscriberListScreen />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
