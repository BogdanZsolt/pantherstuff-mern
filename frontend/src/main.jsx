import React from 'react';
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
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import ShopScreen from './screens/ShopScreen.jsx';
import HerStoryScreen from './screens/HerStoryScreen.jsx';
import BlogScreen from './screens/BlogScreen.jsx';
import PostScreen from './screens/PostScreen.jsx';
import PostListScreen from './screens/admin/PostListScreen.jsx';
import PostEditScreen from './screens/admin/PostEditScreen.jsx';
import AdminScreen from './screens/admin/AdminScreen.jsx';
import PostCategoryListScreen from './screens/admin/PostCategoryListScreen.jsx';
import PostCatEditScreen from './screens/admin/PostCatEditScreen.jsx';
import AuthorScreen from './screens/AuthorScreen.jsx';
import MainScreen from './screens/MainScreen.jsx';
import CategoryPostScreen from './screens/CategoryPostScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<MainScreen />}>
        <Route index element={<HomeScreen />} />
        <Route path="/herstory" element={<HerStoryScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/shop/search/:keyword" element={<ShopScreen />} />
        <Route path="/shop/page/:pageNumber" element={<ShopScreen />} />
        <Route
          path="/shop/search/:keyword/page/:pageNumber"
          element={<ShopScreen />}
        />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
        <Route path="/post/:id" element={<PostScreen />} />
        <Route path="/author/:id" element={<AuthorScreen />} />
        <Route path="/category/:id" element={<CategoryPostScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Route>
      <Route path="" element={<AdminScreen />}>
        <Route index={true} path="/admin" element={<ProductListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/postlist" element={<PostListScreen />} />
        <Route path="/admin/post/:id/edit" element={<PostEditScreen />} />
        <Route
          path="/admin/postcategorylist"
          element={<PostCategoryListScreen />}
        />
        <Route
          path="/admin/postcategory/:id/edit"
          element={<PostCatEditScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
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
