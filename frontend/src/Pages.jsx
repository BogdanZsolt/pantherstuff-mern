import { lazy } from 'react';

export const App = lazy(() => import('./App.jsx'));
export const MainScreen = lazy(() => import('./screens/MainScreen.jsx'));
export const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));
export const ProductScreen = lazy(() => import('./screens/ProductScreen.jsx'));
export const LoginScreen = lazy(() => import('./screens/LoginScreen.jsx'));
export const RegisterScreen = lazy(() =>
  import('./screens/RegisterScreen.jsx')
);
export const CartScreen = lazy(() => import('./screens/CartScreen.jsx'));
export const WishListScreen = lazy(() =>
  import('./screens/WishListScreen.jsx')
);
export const ShippingScreen = lazy(() =>
  import('./screens/ShippingScreen.jsx')
);
export const PaymentScreen = lazy(() => import('./screens/PaymentScreen.jsx'));
export const HerStory = lazy(() => import('./screens/HerStoryScreen.jsx'));
export const MePetraScreen = lazy(() => import('./screens/MePetraScreen.jsx'));
export const ValuesScreen = lazy(() => import('./screens/ValuesScreen.jsx'));
export const BaseMaterialsScreen = lazy(() =>
  import('./screens/BaseMaterialsScreen.jsx')
);
export const FaqsScreen = lazy(() => import('./screens/FaqsScreen.jsx'));
export const ContactScreen = lazy(() => import('./screens/ContactScreen.jsx'));
export const ShopScreen = lazy(() => import('./screens/ShopScreen.jsx'));
export const BlogScreen = lazy(() => import('./screens/BlogScreen.jsx'));
export const PostScreen = lazy(() => import('./screens/PostScreen.jsx'));
export const AuthorScreen = lazy(() => import('./screens/AuthorScreen.jsx'));
export const CategoryPostScreen = lazy(() =>
  import('./screens/CategoryPostScreen.jsx')
);
export const PrivateRoute = lazy(() => import('./components/PrivateRoute.jsx'));
export const PlaceOrderScreen = lazy(() =>
  import('./screens/PlaceOrderScreen.jsx')
);
export const OrderScreen = lazy(() => import('./screens/OrderScreen.jsx'));
export const ProfileScreen = lazy(() => import('./screens/ProfileScreen.jsx'));

// Admin Pages
export const AdminScreen = lazy(() =>
  import('./screens/admin/AdminScreen.jsx')
);
export const ProductListScreen = lazy(() =>
  import('./screens/admin/ProductListScreen.jsx')
);
export const ProductEditScreen = lazy(() =>
  import('./screens/admin/ProductEditScreen.jsx')
);
export const PostListScreen = lazy(() =>
  import('./screens/admin/PostListScreen.jsx')
);
export const PostEditScreen = lazy(() =>
  import('./screens/admin/PostEditScreen.jsx')
);
export const PostCategoryListScreen = lazy(() =>
  import('./screens/admin/PostCategoryListScreen.jsx')
);
export const PostCatEditScreen = lazy(() =>
  import('./screens/admin/PostCatEditScreen.jsx')
);
export const CommentListScreen = lazy(() =>
  import('./screens/admin/CommentListScreen.jsx')
);
export const CommentCheckScreen = lazy(() =>
  import('./screens/admin/CommentCheckScreen.jsx')
);
export const UserListScreen = lazy(() =>
  import('./screens/admin/UserListScreen.jsx')
);
export const UserEditScreen = lazy(() =>
  import('./screens/admin/UserEditScreen.jsx')
);
export const OrderListScreen = lazy(() =>
  import('./screens/admin/OrderListScreen.jsx')
);
export const SubscriberListScreen = lazy(() =>
  import('./screens/admin/SubscriberListScreen.jsx')
);
export const ProtectRoute = lazy(() => import('./components/ProtectRoute.jsx'));
