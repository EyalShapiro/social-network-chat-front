import { RouterProvider } from "react-router/dom";

import { QueryClientProvider } from "@tanstack/react-query";
import ToastNotify from "./components/ToastNotify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./api/query";
import router from "./router";
import { Suspense } from "react";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<main style={{ width: "100vw", height: "100vh", display: "flex", placeItems: "center" }}>
				<Suspense fallback={<Loading />}>
					<RouterProvider router={router} />
				</Suspense>
			</main>
			<ToastNotify />
			<ReactQueryDevtools initialIsOpen={false} position="left" />
		</QueryClientProvider>
	);
}

export default App;

function Loading() {
	//TODO:build a loading spinner
	return <div>Loading...</div>;
}
