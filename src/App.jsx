import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import ListPage from "./pages/ListPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Loader from "./ui/Loader.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <GlobalStyles />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" index element={<ListPage />} />
              <Route
                path="/real-estates/:realEstateId"
                index
                element={<ListingDetails />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
