import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [backendData, setBackendData] = useState([]);

	useEffect(() => {
		axios.get("/users/api").then((response) => {
			// console.log(response);
			console.log(response.data);
			setBackendData(response.data[0].name);
		});
		// fetch("/users/api")
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 		setBackendData(data);
		// 	});
	}, []);

	return <div>{backendData}</div>;
}

export default App;
