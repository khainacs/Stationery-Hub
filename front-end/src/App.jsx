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
                        path="/biểu-mẫu-mail"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <MailTemplate title="Biểu mẫu mail" />
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