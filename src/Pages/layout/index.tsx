import { getUserName } from "@/utils/localStorageData/storageUserName";
import { Navigate, Outlet, useLocation } from "react-router";
import { Header } from "./header";

export default function Layout() {
	const userName = getUserName();
	const location = useLocation();
	if (!userName && location.pathname !== "/login") {
		return <Navigate to="/login" replace />;
	}

	if (userName && location.pathname === "/login") {
		return <Navigate to="/" replace />;
	}
	return (
		<div
			style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
		>
			<Header showUserDisplay={!!userName && location.pathname !== "/login"} />
			<main
				style={{
					width: "100%",
					maxHeight: "90vh",
					height: "100%",
					display: "flex",
					placeItems: "center",
					justifyContent: "center",
				}}
			>
				<Outlet />
			</main>
			{/* <footer style={{ width: "100vw", height: "5vh", display: "flex", justifyContent: "center" }}>hi</footer> */}
		</div>
	);
}
