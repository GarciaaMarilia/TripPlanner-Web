import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { CreateTripPage } from "./pages/create-trip";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { TripDetailsPage } from "./pages/create-trip/trip-details";
import { ListTripsPage } from "./pages/create-trip/list-trips/list-trips";

const router = createBrowserRouter(
 [
  {
   path: "/",
   element: <LoginPage />,
  },
  {
   path: "/createTrip",
   element: <ProtectedRoute element={<CreateTripPage />} />,
  },
  {
   path: "/trips/:tripId",
   element: <ProtectedRoute element={<TripDetailsPage />} />,
  },
  {
   path: "/listTrips/:userId",
   element: <ProtectedRoute element={<ListTripsPage />} />,
  },
  {
   path: "*",
   element: <h1>404: Page Not Found</h1>,
  },
 ],
 { basename: "/TripPlanner-Web" }
);

export function App() {
 return (
  <AuthProvider>
   <RouterProvider router={router} />
  </AuthProvider>
 );
}
