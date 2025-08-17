import { USER_NAME_KEY } from "@/constants/localStorageKey";

export const getUserName = () => {
	const userName = localStorage.getItem(USER_NAME_KEY) || null;
	return userName;
};
export const updateUserName = (name: string) => {
	localStorage.setItem(USER_NAME_KEY, name);
};
export const removeUserName = () => {
	localStorage.removeItem(USER_NAME_KEY);
};

export const clearLocalStorage = () => {
	localStorage.clear();
};
export const getAllLocalStorage = () => {
	const localStorageData: Record<string, string> = {};
	Object.keys(localStorage).forEach((key) => {
		localStorageData[key] = localStorage.getItem(key) || "";
	});
	return localStorageData;
};
export const fetchItem = (key: string) => {
	try {
		localStorage.getItem(key);
	} catch {
		return "";
	}
};
