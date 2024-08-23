import { createContext, useContext } from "react";
import { User } from "./User";

export interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error("Context not found");
  }
  return userContext;
}