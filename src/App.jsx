import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./components/AppLayout.jsx";
import Loader from "./components/ui/Loader.jsx";

const ListPage = lazy(() => import("./pages/ListPage.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const ListingDetails = lazy(() => import("./pages/ListingDetails.jsx"));
const AddListing = lazy(() => import("./pages/AddListing.jsx"));

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
                path="/real-estate/create"
                index
                element={<AddListing />}
              />
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
