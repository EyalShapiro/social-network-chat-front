import { RouterProvider } from "react-router/dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ToastNotify from "./components/ToastNotify";
import { queryClient } from "./api/query";
import router from "./router";
import { Suspense } from "react";
import { Loading } from "./components/Loading/Loading";

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
