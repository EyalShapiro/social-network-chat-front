import { createBrowserRouter, RouterProvider } from "react-router";
import Chat from "./Pages/Chat";
import Home from "./Pages/homes";
import NotFoundPage from "./Pages/NotFond";
import { Suspense } from "react";
import { Loading } from "./components/Loading/Loading";

export const ROUTER = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/chat", element: <Chat /> },
	{ path: "*", element: <NotFoundPage /> },
]);

export default function AppRouter() {
	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={ROUTER} />
		</Suspense>
	);
}
