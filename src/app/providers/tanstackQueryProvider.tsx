import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const tanstackQueryProvider = (component: () => React.ReactNode) => () => (
    <QueryClientProvider client={new QueryClient()}>
        {component()}
    </QueryClientProvider>
)