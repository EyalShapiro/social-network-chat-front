import { SERVER_URL } from "@/constants/config";
import { ERROR_MSG } from "@/constants/errorMsg";
import { getUserName } from "@/utils/localStorageData/storageUserName";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const socket = io(SERVER_URL, { auth: { userName: getUserName() } });

socket.on("connect_error", (err) => {
	console.error("Socket connection error:", err.message);
	toast.error(ERROR_MSG.networkError, { delay: 10 * 1000 });
});
