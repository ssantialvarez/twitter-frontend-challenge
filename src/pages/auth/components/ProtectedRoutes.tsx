import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import WithNav from "./WithNav";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import Loader from "../../../components/loader/Loader";



const ProtectedRoutes = () => {
	const [status, setStatus] = useState<number | null>(null);
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const service = useHttpRequestService();

	useEffect(() => {
		if (!token) {
			setStatus(401);
			return;
		}

		const verifyUser = async () => {
			
			setStatus(await service.isLogged() ? 200 : 401)
			
		};

		verifyUser();
	}, [token]);

	if (status === null) {
		return <Loader />; 
	}

	return status === 200 ? <WithNav /> : <Navigate to="/sign-in" replace />;
};


export default ProtectedRoutes;