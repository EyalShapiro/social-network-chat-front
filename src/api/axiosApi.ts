import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const apiClient = axios.create({
	baseURL: SERVER_URL,
	headers: { "Content-Type": "application/json" },
	timeout: 10 * 1000, //10 seconds
});

const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			throw new Error(`Error: ${error.response.status} - ${error.response.data?.message || "An error occurred"}`);
		} else if (error.request) {
			throw new Error("Error: No response received from server.");
		}
	}
	throw new Error("Unexpected error occurred.");
};

apiClient.interceptors.response.use(
	(response) => {
		if (response.status < 200 || response.status >= 300) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}
		return response;
	},
	(error: AxiosError) => {
		console.error(error);

		throw handleApiError(error);
	}
);

export const getItems = async <T = unknown>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
	try {
		const response = await apiClient.get<T>(`/${endpoint}`, config);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const getItemById = async <T = unknown>(
	endpoint: string,
	id: number,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		const sizeApi = `/${endpoint}/${id}`;
		const response = await apiClient.get<T>(sizeApi, config);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const createItem = async <T = unknown>(
	endpoint: string,
	newItem: Omit<T, "id" | "created_at">,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		const response = await apiClient.post<T>(`/${endpoint}`, newItem, config);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const updateItem = async <T = unknown>(
	endpoint: string,
	id: number,
	updatedItem: Omit<T, "id" | "created_at">,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		const response = await apiClient.put<T>(`/${endpoint}/${id}`, updatedItem, config);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const deleteItem = async (endpoint: string, id: number): AxiosPromise => {
	try {
		const response = await apiClient.delete(`/${endpoint}/${id}`);
		return response;
	} catch (error) {
		throw handleApiError(error);
	}
};
export const getItemsWithPagination = async <T = unknown>(
	endpoint: string,
	page: number,
	limit: number = 100,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		const configApi = {
			...config,
			params: { page, limit, ...(config?.params || {}) },
		};
		const response = await apiClient.get<T>(`/${endpoint}`, configApi);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
