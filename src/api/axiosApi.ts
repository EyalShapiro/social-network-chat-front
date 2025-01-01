import axios, { AxiosError, AxiosPromise } from "axios";

// הגדרת Axios
export const apiClient = axios.create({
	baseURL: "http://localhost:3000", // עדכן לכתובת ה-API שלך
	headers: {
		"Content-Type": "application/json",
	},
});

// טיפוס לתגובה גנרית
export type ApiResponse<T> = {
	data: T;
};

// פונקציה גלובלית לטיפול בשגיאות
const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			// שגיאה מהשרת
			throw new Error(`Error: ${error.response.status} - ${error.response.data?.message || "An error occurred"}`);
		} else if (error.request) {
			// בקשה לא קיבלה תגובה
			throw new Error("Error: No response received from server.");
		}
	}
	// שגיאה כללית
	throw new Error("Unexpected error occurred.");
};

// Interceptor לטיפול בתגובות שגיאה
apiClient.interceptors.response.use(
	(response) => {
		// אם הסטטוס לא בטווח התקין, זרוק שגיאה
		if (response.status < 200 || response.status >= 300) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}
		return response;
	},
	(error: AxiosError) => {
		console.error(error);

		// טיפול בשגיאות HTTP
		throw handleApiError(error);
	}
);

// פונקציות API גנריות

// 1. שליפת כל ההודעות (גנרי)
export const getAllItems = async <T = unknown>(endpoint: string): Promise<T> => {
	try {
		const response = await apiClient.get<ApiResponse<T>>(`/${endpoint}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

// 2. שליפת הודעה לפי מזהה (גנרי)
export const getItemById = async <T = unknown>(endpoint: string, id: number): Promise<T> => {
	try {
		const response = await apiClient.get<ApiResponse<T>>(`/${endpoint}/${id}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

// 3. יצירת פריט חדש (גנרי)
export const createItem = async <T = unknown>(
	endpoint: string,
	newItem: Omit<T, "id" | "created_at"> // נניח שאין שדות "id" או "created_at" בנתונים
): Promise<T> => {
	try {
		const response = await apiClient.post<ApiResponse<T>>(`/${endpoint}`, newItem);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

// 4. עדכון פריט (גנרי)
export const updateItem = async <T = unknown>(
	endpoint: string,
	id: number,
	updatedItem: Omit<T, "id" | "created_at">
): Promise<T> => {
	try {
		const response = await apiClient.put<ApiResponse<T>>(`/${endpoint}/${id}`, updatedItem);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

// 5. מחיקת פריט (גנרי)
export const deleteItem = async (endpoint: string, id: number): AxiosPromise => {
	try {
		const response = await apiClient.delete(`/${endpoint}/${id}`);
		return response;
	} catch (error) {
		throw handleApiError(error);
	}
};
