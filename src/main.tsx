import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient } from "@tanstack/react-query";
import ToastNotify from "./components/ToastNotify/index.tsx";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 1000 * 10 },
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={false} position="left" />
			<ToastNotify />
		</QueryClientProvider>
	</StrictMode>
);
