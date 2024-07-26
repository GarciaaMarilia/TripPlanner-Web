import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/create-trip/trip-details";
import { LoginPage } from "./pages/login";

const router = createBrowserRouter([
 {
  path: "/",
  element: <LoginPage />,
 },
 {
  path: "/createTrip",
  element: <CreateTripPage />,
 },
 {
  path: "/trips/:tripId",
  element: <TripDetailsPage />,
 },
]);

export function App() {
 return <RouterProvider router={router} />;
}
