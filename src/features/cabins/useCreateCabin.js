import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (data) => {
      if (isDemoUser) {
        toast.error("Demo users cannot create cabins. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return createEditCabin(data);
    },
    onSuccess: () => {
      toast.success("New Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
