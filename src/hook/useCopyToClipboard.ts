import { ERROR_MSG } from "@/constants/errorMsg";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCopyToClipboard = () => {
	const [isCopied, setIsCopied] = useState(false);

	const copy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000); // Reset the state after 2 seconds
		} catch (err) {
			console.error("Failed to copy text: ", err);
			toast.error(`${ERROR_MSG.notCopied} ${text}`);
			setIsCopied(false);
		}
	};

	return { isCopied, copy };
};
