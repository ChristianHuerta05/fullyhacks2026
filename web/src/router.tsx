import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/Landing/LandingPage";
import { PortalPage } from "./pages/Portal/PortalPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { ApplyPage } from "./pages/Apply/ApplyPage";
import { ApplicationPage } from "./pages/Application/ApplicationPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/profile", element: <PortalPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/apply", element: <ApplyPage /> },
  { path: "/application", element: <ApplicationPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
