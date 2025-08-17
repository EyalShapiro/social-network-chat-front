import { SERVER_URL } from "@/constants/config";
import { io } from "socket.io-client";

export const socket = io(SERVER_URL, {});
