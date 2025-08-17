import { createBrowserRouter, RouterProvider } from "react-router";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/HOME/Home";
import NotFoundPage from "./Pages/NotFond";
// import { getUserName } from "./utils/LocalStorageFunction";
import { Suspense } from "react";
import { Loading } from "./components/Loading/Loading";
// const userName = getUserName();

export const ROUTER = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/chat",
		element: <Chat />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default function AppRouter() {
	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={ROUTER} />
		</Suspense>
	);
}
