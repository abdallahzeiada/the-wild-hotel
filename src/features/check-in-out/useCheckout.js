import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      if (isDemoUser) {
        toast.error("Demo users cannot check out guests. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error while checking out :( "),
  });
  return { checkout, isCheckingOut };
}
