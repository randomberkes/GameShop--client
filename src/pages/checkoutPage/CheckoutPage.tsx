import React, { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		let isMounted = true;

		const controller = new AbortController();
		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get("/users/all", {
					signal: controller.signal,
				});
				console.log(response.data);
			} catch (err) {
				console.log(err);
				navigate("/login", { state: { from: location }, replace: true });
			}
		};
		getUsers();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);
	return <div>CheckoutPage</div>;
};

export default CheckoutPage;
