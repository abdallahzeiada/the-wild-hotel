import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }) => createUpdateCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCabin };
}
