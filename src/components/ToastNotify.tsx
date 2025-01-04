import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastNotify({
	position = "bottom-right",
	theme = "dark",
	autoClose = 8000,
	closeButton = true,
	closeOnClick = true,
	draggable = true,
	...rest
}: ToastContainerProps) {
	return (
		<ToastContainer
			position={position}
			theme={theme}
			autoClose={autoClose}
			closeButton={closeButton}
			closeOnClick={closeOnClick}
			draggable={draggable}
			{...rest}
		/>
	);
}
