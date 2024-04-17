import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const location = useLocation();
	return authUser.name !== "" ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
