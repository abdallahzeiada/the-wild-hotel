import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      if (isDemoUser) {
        toast.error("Demo users cannot edit cabins. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return createEditCabin(newCabinData, id);
    },
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
