import { IS_PROD } from "@/constants/config";

export function parseObject(str: string) {
	try {
		return JSON.parse(str || "{}");
	} catch (error) {
		if (!IS_PROD) console.warn("Failed to parse JSON string:", error);
		return {};
	}
}
