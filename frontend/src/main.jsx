import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store.js';
import Loader from './components/Loader.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import {
  App,
  MainScreen,
  HomeScreen,
  ShopScreen,
  ProductScreen,
  LoginScreen,
  RegisterScreen,
  CartScreen,
  ShippingScreen,
  PaymentScreen,
  HerStory,
  MePetraScreen,
  ValuesScreen,
  BaseMaterialsScreen,
  FaqsScreen,
  ContactScreen,
  BlogScreen,
  PostScreen,
  AuthorScreen,
  CategoryPostScreen,
  PrivateRoute,
  PlaceOrderScreen,
  OrderScreen,
  ProfileScreen,
  AdminScreen,
  ProductListScreen,
  ProductEditScreen,
  PostListScreen,
  PostEditScreen,
  PostCategoryListScreen,
  PostCatEditScreen,
  CommentListScreen,
  CommentCheckScreen,
  UserListScreen,
  UserEditScreen,
  OrderListScreen,
  SubscriberListScreen,
} from './Pages.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<Loader />}>
            <MainScreen />
          </Suspense>
        }
      >
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/herstory"
          element={
            <Suspense fallback={<Loader />}>
              <HerStory />
            </Suspense>
          }
        />
        <Route
          path="/mepetra"
          element={
            <Suspense fallback={<Loader />}>
              <MePetraScreen />
            </Suspense>
          }
        />
        <Route
          path="/base_materials"
          element={
            <Suspense fallback={<Loader />}>
              <BaseMaterialsScreen />
            </Suspense>
          }
        />
        <Route
          path="/values"
          element={
            <Suspense fallback={<Loader />}>
              <ValuesScreen />
            </Suspense>
          }
        />
        <Route
          path="/faqs"
          element={
            <Suspense fallback={<Loader />}>
              <FaqsScreen />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <ContactScreen />
            </Suspense>
          }
        />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<Loader />}>
              <ShopScreen />
            </Suspense>
          }
        />
        <Route
          path="/shop/search/:keyword"
          element={
            <Suspense fallback={<Loader />}>
              <ShopScreen />
            </Suspense>
          }
        />
        <Route
          path="/shop/page/:pageNumber"
          element={
            <Suspense fallback={<Loader />}>
              <ShopScreen />
            </Suspense>
          }
        />
        <Route
          path="/shop/search/:keyword/page/:pageNumber"
          element={
            <Suspense fallback={<Loader />}>
              <ShopScreen />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductScreen />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<Loader />}>
              <BlogScreen />
            </Suspense>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PostScreen />
            </Suspense>
          }
        />
        <Route
          path="/author/:id"
          element={
            <Suspense fallback={<Loader />}>
              <AuthorScreen />
            </Suspense>
          }
        />
        <Route
          path="/category/:id"
          element={
            <Suspense fallback={<Loader />}>
              <CategoryPostScreen />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <CartScreen />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <LoginScreen />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <RegisterScreen />
            </Suspense>
          }
        />
        <Route
          path=""
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route
            path="/shipping"
            element={
              <Suspense fallback={<Loader />}>
                <ShippingScreen />
              </Suspense>
            }
          />
          <Route
            path="/payment"
            element={
              <Suspense fallback={<Loader />}>
                <PaymentScreen />
              </Suspense>
            }
          />
          <Route
            path="/placeorder"
            element={
              <Suspense fallback={<Loader />}>
                <PlaceOrderScreen />
              </Suspense>
            }
          />

          <Route
            path="/order/:id"
            element={
              <Suspense fallback={<Loader />}>
                <OrderScreen />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <ProfileScreen />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path=""
        element={
          <Suspense fallback={<Loader />}>
            <AdminScreen />
          </Suspense>
        }
      >
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <ProductListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/productlist"
          element={
            <Suspense fallback={<Loader />}>
              <ProductListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/productlist/:pageNumber"
          element={
            <Suspense fallback={<Loader />}>
              <ProductListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/product/:id/edit"
          element={
            <Suspense fallback={<Loader />}>
              <ProductEditScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/postlist"
          element={
            <Suspense fallback={<Loader />}>
              <PostListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/post/:id/edit"
          element={
            <Suspense fallback={<Loader />}>
              <PostEditScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/postcategorylist"
          element={
            <Suspense fallback={<Loader />}>
              <PostCategoryListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/postcategory/:id/edit"
          element={
            <Suspense fallback={<Loader />}>
              <PostCatEditScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/commentlist"
          element={
            <Suspense fallback={<Loader />}>
              <CommentListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/comment/:id"
          element={
            <Suspense fallback={<Loader />}>
              <CommentCheckScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/userlist"
          element={
            <Suspense fallback={<Loader />}>
              <UserListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/user/:id/edit"
          element={
            <Suspense fallback={<Loader />}>
              <UserEditScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/orderlist"
          element={
            <Suspense fallback={<Loader />}>
              <OrderListScreen />
            </Suspense>
          }
        />
        <Route
          path="/admin/subscriberlist"
          element={
            <Suspense fallback={<Loader />}>
              <SubscriberListScreen />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
