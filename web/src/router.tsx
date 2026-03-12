import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/Landing/LandingPage";
import { PortalPage } from "./pages/Portal/PortalPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { ApplyPage } from "./pages/Apply/ApplyPage";
import { ApplicationPage } from "./pages/Application/ApplicationPage";
import { ErrorPage } from "./pages/Error/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "/profile", element: <PortalPage />, errorElement: <ErrorPage /> },
  { path: "/admin", element: <AdminPage />, errorElement: <ErrorPage /> },
  { path: "/apply", element: <ApplyPage />, errorElement: <ErrorPage /> },
  { path: "/application", element: <ApplicationPage />, errorElement: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
