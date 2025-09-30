import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => {
      if (isDemoUser) {
        toast.error("Demo users cannot delete cabins. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return deleteCabinApi(id);
    },
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
