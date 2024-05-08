'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type childrenType ={
    children : ReactNode
}
const ReactQueryProvider = ({children}:childrenType) => {
  const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
                {children}
        </QueryClientProvider>
    )
};

export default ReactQueryProvider;