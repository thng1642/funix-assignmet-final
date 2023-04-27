// @flow
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ShopPage from '../pages/ShopPage/ShopPage';
import Layout from '../pages/layout/Layout';
import DetailPage from '../pages/Product/DetailPage/DetailPage';


export default function AppRouter() {
    return (
        <BrowserRouter >   
            <Routes>
                <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='shop' element={<ShopPage />} />
                <Route path='detail/:productId'  element={<DetailPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};