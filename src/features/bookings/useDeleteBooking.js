import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => {
      if (isDemoUser) {
        toast.error("Demo users cannot delete bookings. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return deleteBookingApi(bookingId);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("error while deleting the booking"),
  });
  return { deleteBooking, isDeleting };
}
