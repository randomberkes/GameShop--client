import React, { useState } from "react";
import Login from "./login/Login.tsx";
import "./loginRegisterPage.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Register from "./register/Rgister.tsx";

const LoginRegisterPage = () => {
	const [email, setEmail] = useState("");

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
				<Route
					path="login"
					element={
						<Login
							setEmail={(email: string) => {
								setEmail(email);
							}}
						/>
					}
				/>
				<Route path="register" element={<Register email={email} />} />
			</Route>
		</Routes>
	);
};

export default LoginRegisterPage;
