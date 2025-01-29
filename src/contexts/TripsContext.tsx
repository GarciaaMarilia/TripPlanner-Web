import {
 createContext,
 ReactNode,
 useContext,
 useEffect,
 useState,
} from "react";

import { Trip } from "../models/models";
import { getTrips } from "../services/get-trips-service";

interface TripsContextType {
 pastTrips: Trip[];
 nextTrips: Trip[];
 fetchTrips: () => void;
 isLoading: boolean;
 error: string | null;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

interface TripsProviderProps {
 children: ReactNode;
}

export const TripsProvider: React.FC<TripsProviderProps> = ({ children }) => {
 const [pastTrips, setPastTrips] = useState<Trip[]>([]);
 const [nextTrips, setNextTrips] = useState<Trip[]>([]);
 const [error, setError] = useState<string | null>("");
 const [isLoading, setIsLoading] = useState<boolean>(true);

 const userId = localStorage.getItem("userId");

 const fetchTrips = async () => {
  if (userId) {
   try {
    const tripsData = await getTrips(userId);
    if (!tripsData) {
     throw new Error("Error to find trips.");
    }

    const now = new Date();

    const past = tripsData.filter(
     (trip: Trip) => new Date(trip.starts_at) < now
    );
    const next = tripsData.filter(
     (trip: Trip) => new Date(trip.starts_at) >= now
    );

    setPastTrips(past);
    setNextTrips(next);
   } catch (error) {
    setError("Context error.");
   } finally {
    setIsLoading(false);
   }
  }
 };

 useEffect(() => {
  fetchTrips();
 }, []);

 return (
  <TripsContext.Provider
   value={{ pastTrips, nextTrips, fetchTrips, isLoading, error }}
  >
   {children}
  </TripsContext.Provider>
 );
};

export const useTrips = (): TripsContextType => {
 const context = useContext(TripsContext);

 if (!context) {
  throw new Error("useTrips must be used within an AuthProvider");
 }
 return context;
};
