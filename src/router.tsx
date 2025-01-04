import { createBrowserRouter, Navigate } from "react-router";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/HOME/Home";
import NotFoundPage from "./Pages/NotFond";
import { getUserName } from "./utils/LocalStorageFunction";

const userName = getUserName();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/chat",
		element: userName ? <Chat /> : <Navigate to="/" />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
