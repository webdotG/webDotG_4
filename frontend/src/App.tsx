import './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/loginPage/loginPage";
import RegistrPage from './pages/registerPage/registerPage';
import ShopPage from './pages/shopPage/shopPage';
import HomePage from './pages/homePage/homePage';
import CartPage from './pages/cartPage/cartPage';
import PortfolioPage from './pages/portfolioPage/portfolioPage';
import CommunismPage from './pages/communismPage/communismPage';
import MyPage from './pages/myPage/myPage';
import ConfirmationToCart from './pages/confirmationToCart/confirmationToCart';
import FullPost from './pages/fullPostPage/fullPost';
import AddPostPage from './pages/addPostPage/addPostPage';
import ConfirmationOrder from './pages/confirmationOrder/confirmationOrder';
import RemovePost from './pages/removePost/removePost';
import CommunityPgae from './pages/community/communityPgae';

import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import { fetchAuth } from './slices/auth/authSlice';
import { selectIsAuth } from '../src/slices/auth/authSlice';
import ConfirmationRemoveUser from './pages/confirmationRemoveUser/confirmationRemoveUser';


function App() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth);
  console.log('SRC APP Slice Auth IS AUTH ! ')

  useEffect(() => {
    dispatch(fetchAuth())
  }, [dispatch])

  return (
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/register" element={<RegistrPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/portfolio" element={<PortfolioPage />} />
        <Route index path="/shop" element={<ShopPage />} />
        <Route index path="/cart" element={<CartPage />} />
        <Route index path="/confirmation" element={<ConfirmationToCart />} />
        <Route index path="/confirmationOrder" element={<ConfirmationOrder />} />
        <Route index path="/communism2.0" element={<CommunismPage />} />
        <Route index path="/communism2.0/:id" element={<FullPost />} />
        <Route index path="/communism2.0/:id/edit" element={<AddPostPage />} />
        <Route index path="/addPost" element={<AddPostPage />} />
        <Route index path="/removePost" element={<RemovePost />} />
        {isAuth ? <Route index path="/myPage" element={<MyPage />} /> : null }
        {isAuth ? <Route index path="/community_no_verified" element={<CommunityPgae />} /> : null }
        {isAuth ? <Route index path="/confirm_remove_user" element={<ConfirmationRemoveUser />} /> : null }
   </Routes>
  )
}
export default App
