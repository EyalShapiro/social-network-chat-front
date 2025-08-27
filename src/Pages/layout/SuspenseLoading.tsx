import { Suspense } from "react";

import { Loading } from "@/components/Loadings";

export default function SuspenseLoading({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
