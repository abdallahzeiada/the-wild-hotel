import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useCheckin() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      if (isDemoUser) {
        toast.error("Demo users cannot check in guests. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error while checking in :( "),
  });
  return { checkin, isCheckingIn };
}
