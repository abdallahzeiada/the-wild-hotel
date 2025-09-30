import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (userData) => {
      if (isDemoUser) {
        toast.error("Demo users cannot update account information. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return updateCurrentUser(userData);
    },
    onSuccess: () => {
      toast.success("User account updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return {updateUser, isUpdating}
}
