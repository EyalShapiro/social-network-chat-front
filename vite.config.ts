import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import dotenv from "dotenv";
dotenv.config();
// https://vite.dev/config/
const isRunGlobal = false;
const defaultPort = 3000;

const port = (() => {
	const envPort = parseInt(process.env.VITE_PORT || String(defaultPort), 10);

	const isCheckPort = !envPort || isNaN(envPort) || envPort <= 0 || envPort > 65535;

	return isCheckPort ? defaultPort : envPort;
})();

export default defineConfig({
	plugins: [react()],
	server: {
		host: isRunGlobal ? "0.0.0.0" : "localhost",
		port,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Maps '@/*' to './src/*'
		},
	},
});
