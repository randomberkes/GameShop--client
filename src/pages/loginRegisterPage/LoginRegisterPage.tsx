import React from "react";
import Login from "./login/Login.tsx";
import "./loginRegisterPage.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Register from "./register/Rgister.tsx";

const LoginRegisterPage = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<div className="loginRegisterPage_container">
						<Outlet />
					</div>
				}
			>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
};

export default LoginRegisterPage;
