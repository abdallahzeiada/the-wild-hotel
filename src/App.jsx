import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Cabins from "./pages/Cabins.jsx";
import Bookings from "./pages/Bookings.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import GlobalStyles from "./ui/GlobalStyles.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{ margin: "10px"}}
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            fontWeight:"500",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-500)",
            boxShadow: "0 0 20px 2px  var(--color-grey-200)"
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
