import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useSignup() {
  const { isDemoUser } = useDemoUser();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (userData) => {
      if (isDemoUser) {
        toast.error("Demo users cannot create new accounts. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return signupApi(userData);
    },
    onSuccess: () => {
      toast.success(
        "Account created successfully, verify it from the user's email address"
      );
    },
  });
  return {signup, isLoading}
}
