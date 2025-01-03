import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FunctionComponent, useState } from "react";
type ReactQueryProviderProps = {
  children: React.ReactNode;
};

const ReactQueryProvider:FunctionComponent<ReactQueryProviderProps> = ({children}) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
