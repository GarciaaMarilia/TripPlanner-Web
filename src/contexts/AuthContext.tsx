import {
 createContext,
 ReactNode,
 useContext,
 useEffect,
 useState,
} from "react";

interface AuthContextType {
 isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
 children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
  return !!localStorage.getItem("token");
 });

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
   setIsAuthenticated(true);
  }
 }, []);

 return (
  <AuthContext.Provider value={{ isAuthenticated }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = (): AuthContextType => {
 const context = useContext(AuthContext);

 if (context === undefined) {
  throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
};
