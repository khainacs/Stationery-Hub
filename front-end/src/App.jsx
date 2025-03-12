import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import BlankLayout from "./layouts/LayoutNotSearch";

const Login = loadable(() => import("./pages/Auth/Login"));
const Regiter = loadable(() => import("./pages/Auth/Register"));
const Home = loadable(() => import("./pages/Home"));
const MailTemplate = loadable(() => import("./pages/MailForm"));
const Cart = loadable(() => import('./pages/Cart'));
const Payment = loadable(() => import('./pages/Payment'));
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    {/* <Route path="/logout" element={<Logout />} /> */}
                </Route>
                <Route element={<BasicLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Home title="Trang Chủ" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/bieu-mau-mail"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <MailTemplate title="Biểu mẫu mail" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/gio-hang"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Cart title="Giỏ hàng" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/thanh-toan"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Payment title="Payment" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<BlankLayout />}>
                    <Route
                        path="/dang-nhap"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Login title="Đăng Nhập" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dang-ki"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Regiter title="Đăng Kí" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}