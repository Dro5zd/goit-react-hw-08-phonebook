import {useAppDispatch, useAppSelector} from './redux/store';
import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import {Layout} from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Report from './pages/Report/Report';
import {Loader} from './components/Loader/Loader';

import GlobalStyle from './globalStyles';
import Expenses from './pages/Expenses/Expenses';
import Income from './pages/Income/Income';
import {Header} from './components/Header/Header';
import {PublicRoute} from './components/PublicRoute/PublicRoute';
import {getUser} from './redux/auth/auth-operations';
import {selectIsLoading} from './redux/auth/auth-selectors';
// import { selectSid } from "./redux/auth/auth-selectors";

export const App = () => {
    // const sid = useAppSelector(selectSid);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <Loader isLoading={isLoading}/>
            <GlobalStyle/>
            <Header/>
            <div>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route
                            index
                            element={
                                <PublicRoute redirectTo="/home">
                                    <Login/>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute redirectTo="/home">
                                    <Register/>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute redirectTo="/home">
                                    <Login/>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                <PrivateRoute>
                                    <Home/>
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Expenses/>}/>
                            <Route path="expenses" element={<Expenses/>}/>
                            <Route path="income" element={<Income/>}/>
                        </Route>
                        <Route
                            path="/report"
                            element={
                                <PrivateRoute>
                                    <Report/>
                                </PrivateRoute>
                            }
                        />
                        <Route path="/*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
};
