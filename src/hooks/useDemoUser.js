import { useUser } from "../features/authentication/useUser";

export function useDemoUser() {
  const { user } = useUser();
  
  const isDemoUser = user?.email === import.meta.env.VITE_DEMO_EMAIL;
  
  return { isDemoUser };
}